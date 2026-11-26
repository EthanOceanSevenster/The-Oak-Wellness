"""Checks a submission against its form definition and summarises it."""

import datetime
import re

from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.utils import timezone

from .definitions import fields

MAX_LENGTH = {'textarea': 2000}
DEFAULT_MAX_LENGTH = 200


def _one(raw, key):
    values = raw.get(key) or ['']
    value = values[0] if isinstance(values, list) else values
    return str(value).strip()


def _many(raw, key):
    values = raw.get(key) or []
    if not isinstance(values, list):
        values = [values]
    return [str(value).strip() for value in values if str(value).strip()]


def _clean_field(field, raw):
    """Returns the cleaned answer for one field, or raises ValidationError."""
    name, kind, required = field['name'], field['type'], field.get('required')

    if kind == 'scale':
        allowed = {option['value'] for option in field['scale']}
        answers = []
        for i in range(len(field['statements'])):
            value = _one(raw, f'{name}.{i}')
            if value and value not in allowed:
                raise ValidationError('Please choose one of the options.')
            answers.append(value)
        if required and not all(answers):
            raise ValidationError('Please answer every statement.')
        return answers

    if kind == 'multi':
        allowed = {option['value'] for option in field['options']}
        chosen = _many(raw, name)
        if any(value not in allowed for value in chosen):
            raise ValidationError('Please choose from the options listed.')
        other = _one(raw, f'{name}.other')[:DEFAULT_MAX_LENGTH] if field.get('other') else ''
        if required and not (chosen or other):
            raise ValidationError('Please tick at least one option.')
        return {'chosen': chosen, 'other': other}

    if kind == 'agree':
        if required and _one(raw, name) != 'on':
            raise ValidationError('Please tick this box to continue.')
        return _one(raw, name) == 'on'

    value = _one(raw, name)
    if not value:
        if required:
            raise ValidationError('Please fill in this field.')
        return ''

    if kind == 'choice':
        if value not in {option['value'] for option in field['options']}:
            raise ValidationError('Please choose one of the options.')
        return value

    if len(value) > MAX_LENGTH.get(kind, DEFAULT_MAX_LENGTH):
        raise ValidationError('This answer is too long.')

    if kind == 'email':
        validate_email(value)
    elif kind == 'tel':
        if not 9 <= len(re.sub(r'\D', '', value)) <= 15:
            raise ValidationError('Please enter a valid phone number.')
    elif kind == 'date':
        try:
            date = datetime.date.fromisoformat(value)
        except ValueError:
            raise ValidationError('Please enter a valid date.')
        if field.get('past') and date >= timezone.localdate():
            raise ValidationError('Please enter a date in the past.')
    return value


def clean(form, raw):
    """Returns (answers, errors) for the raw {field: [values]} submission."""
    answers, errors = {}, {}
    for field in fields(form):
        try:
            answers[field['name']] = _clean_field(field, raw)
        except ValidationError as error:
            errors[field['name']] = list(error.messages)
    return answers, errors


def score(form, answers):
    """Returns {'total', 'max', 'band'} for scored forms, otherwise None."""
    config = form.get('score')
    if not config:
        return None
    field = next(f for f in fields(form) if f['name'] == config['field'])
    total = sum(int(value) for value in answers[config['field']])
    top = max(int(option['value']) for option in field['scale'])
    band = next(
        (b['text'] for b in config.get('bands', []) if b['min'] <= total <= b['max']),
        '',
    )
    return {'total': total, 'max': top * len(field['statements']), 'band': band}


def summary_lines(form, answers):
    """The answers as plain lines, for WhatsApp, email and the admin."""
    lines = []
    for field in fields(form):
        label = field.get('short', field.get('label', ''))
        answer = answers.get(field['name'])
        kind = field['type']
        if kind == 'scale':
            scale = {option['value']: option['label'] for option in field['scale']}
            for i, (statement, value) in enumerate(zip(field['statements'], answer), 1):
                lines.append(f'{i}. {statement} – {value} {scale.get(value, "")}'.rstrip())
        elif kind == 'multi':
            chosen = list(answer['chosen'])
            if answer['other']:
                chosen.append(f'Other: {answer["other"]}')
            lines.append(f'{label}: {", ".join(chosen) or "–"}')
        elif kind == 'agree':
            lines.append(f'{label}: {"Yes" if answer else "No"}')
        elif answer:
            if kind == 'date':
                answer = datetime.date.fromisoformat(answer).strftime('%d %B %Y')
            lines.append(f'{label}: {answer}')
    return lines
