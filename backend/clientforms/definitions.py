"""
The practice's forms, as supplied in PDF (see frontend/public/forms/).

Each form is a list of sections. A section can have explanatory text
(`text` paragraphs and `bullets`) and/or `fields`. The frontend renders these
definitions as-is, and `validation.py` checks submissions against them, so a
wording change here is all that's needed to update a form.

Field types:
  text, email, tel, date, textarea  – free entry
  choice  – pick one of `options`
  multi   – tick any of `options`; `other: True` adds an "Other" text box
  scale   – rate each of `statements` on the form's shared `scale`
  agree   – a checkbox that must be ticked

`short` is an optional shorter label used in the WhatsApp/email summary.
Date and signature lines from the PDFs are replaced by the submission time
and the typed name. "For professional use only" sections are left out: the
practice completes those herself.
"""

AGREE_5 = [
    {'value': '1', 'label': 'Strongly disagree'},
    {'value': '2', 'label': 'Disagree'},
    {'value': '3', 'label': 'Neutral'},
    {'value': '4', 'label': 'Agree'},
    {'value': '5', 'label': 'Strongly agree'},
]

YES_NO_UNSURE = ['Yes', 'No', 'Unsure']


def _options(*labels):
    return [{'value': label, 'label': label} for label in labels]


FORMS = [
    {
        'slug': 'consent',
        'title': 'Informed Consent for Counselling',
        'audience': 'For all new clients',
        'summary': (
            'Please read and complete this form before your first counselling '
            'session.'
        ),
        'pdf': '/forms/counselling-consent-form.pdf',
        'name_field': 'full_name',
        'sections': [
            {
                'title': 'Client information',
                'fields': [
                    {'name': 'full_name', 'type': 'text', 'label': 'Full name',
                     'required': True, 'autocomplete': 'name'},
                    {'name': 'date_of_birth', 'type': 'date', 'label': 'Date of birth',
                     'required': True, 'autocomplete': 'bday', 'past': True},
                    {'name': 'phone', 'type': 'tel', 'label': 'Contact number',
                     'required': True, 'autocomplete': 'tel'},
                    {'name': 'email', 'type': 'email', 'label': 'Email address',
                     'required': True, 'autocomplete': 'email'},
                    {'name': 'emergency_name', 'type': 'text',
                     'label': 'Emergency contact name', 'required': True},
                    {'name': 'emergency_phone', 'type': 'tel',
                     'label': 'Emergency contact number', 'required': True},
                ],
            },
            {
                'title': 'Purpose of counselling',
                'text': [
                    'Counselling is a professional service aimed at assisting '
                    'individuals to address emotional, psychological, behavioural, '
                    'social, personal and work-related challenges.',
                    'The counselling process may include psychosocial assessments, '
                    'therapeutic interventions, emotional support, psychoeducation, '
                    'coping strategies and referrals to relevant professionals where '
                    'necessary.',
                ],
            },
            {
                'title': 'Voluntary participation',
                'text': ['I understand that:'],
                'bullets': [
                    'My participation in counselling is voluntary.',
                    'I have the right to ask questions regarding the counselling process.',
                    'I may decline to discuss matters that I am uncomfortable sharing.',
                    'I may withdraw from counselling at any time.',
                    'Counselling outcomes cannot be guaranteed.',
                ],
            },
            {
                'title': 'Confidentiality and limitations',
                'text': [
                    'Information disclosed during counselling will be treated as '
                    'confidential in accordance with applicable legislation and '
                    'professional ethical standards. However, confidentiality may be '
                    'limited in circumstances where:',
                ],
                'bullets': [
                    'There is a serious risk of harm to myself or another person.',
                    'There is suspected abuse, neglect or exploitation that must '
                    'legally be reported.',
                    'Disclosure is required by law or a valid court order.',
                    'I provide informed consent for specific information to be shared.',
                ],
                'after': [
                    'Where possible, the social worker will discuss necessary '
                    'disclosures with me beforehand.',
                ],
            },
            {
                'title': 'Employee wellness and employer referrals',
                'text': [
                    'Where counselling is provided through an Employee Wellness '
                    'Programme or employer referral, the content of counselling '
                    'sessions will remain confidential, subject to the limitations '
                    'stated above.',
                    'Any feedback provided to an employer will be limited to necessary '
                    'and appropriately authorised information, unless disclosure is '
                    'legally required. Personal counselling information will not '
                    'automatically be disclosed to my employer.',
                ],
            },
            {
                'title': 'Benefits and potential risks',
                'text': ['I understand that counselling may assist me in:'],
                'bullets': [
                    'Improving emotional wellbeing.',
                    'Developing effective coping strategies.',
                    'Managing stress and personal challenges.',
                    'Improving interpersonal relationships.',
                    'Strengthening resilience and problem-solving skills.',
                ],
                'after': [
                    'I acknowledge that discussing difficult experiences may '
                    'temporarily cause emotional discomfort.',
                ],
            },
            {
                'title': 'Protection of personal information',
                'text': [
                    'I understand that relevant personal information and counselling '
                    'records will be collected, processed and securely maintained in '
                    'accordance with the Protection of Personal Information Act '
                    '(POPIA), Act 4 of 2013, and applicable professional requirements.',
                    'My information will be used for legitimate purposes related to '
                    'assessment, counselling, record keeping, service administration '
                    'and continuity of care.',
                ],
            },
            {
                'title': 'Online counselling services',
                'text': ['Where counselling is conducted online, I understand that:'],
                'bullets': [
                    'I should participate from a private and safe environment.',
                    'Technical interruptions may occur.',
                    'Electronic communication carries certain privacy and security risks.',
                    'Sessions may not be recorded by either party without prior '
                    'informed consent.',
                    'Online counselling is not a substitute for emergency services.',
                ],
            },
            {
                'title': 'Fees and cancellation policy',
                'text': [
                    'Where applicable, counselling fees, payment arrangements and '
                    'cancellation requirements will be communicated and agreed upon '
                    'before services commence.',
                ],
            },
            {
                'title': 'Emergency situations',
                'text': [
                    'I understand that counselling services are not a 24-hour '
                    'emergency or crisis response service. In the event of an '
                    'immediate emergency, I should contact the appropriate emergency '
                    'services or visit the nearest hospital emergency department.',
                ],
            },
            {
                'title': 'Declaration and informed consent',
                'text': ['I hereby confirm that:'],
                'bullets': [
                    'I have read and understood the information contained in this '
                    'consent form.',
                    'I have been given an opportunity to ask questions.',
                    'I understand the nature, purpose, benefits and potential risks of '
                    'counselling.',
                    'I understand the confidentiality policy and its limitations.',
                    'I voluntarily consent to receiving professional counselling '
                    'services.',
                ],
                'fields': [
                    {'name': 'method', 'type': 'choice',
                     'label': 'Preferred counselling method', 'required': True,
                     'options': _options('Face-to-face', 'Online', 'Telephone')},
                    {'name': 'consent', 'type': 'agree', 'required': True,
                     'short': 'Consent given',
                     'label': 'I have read and agree to the declaration above, and I '
                              'voluntarily consent to receiving professional '
                              'counselling services.'},
                    {'name': 'signature', 'type': 'text', 'required': True,
                     'label': 'Type your full name as your signature',
                     'short': 'Signed as'},
                ],
            },
        ],
    },
    {
        'slug': 'stress-questionnaire',
        'title': 'Stress Management Questionnaire',
        'audience': 'Self-assessment',
        'summary': (
            'Fifteen questions about your usual habits under stress. You’ll see '
            'your score when you finish. This questionnaire is for personal '
            'reflection, not a medical diagnosis.'
        ),
        'pdf': '/forms/stress-management-questionnaire.pdf',
        'name_field': 'name',
        'sections': [
            {
                'title': 'About you',
                'fields': [
                    {'name': 'name', 'type': 'text', 'label': 'Name',
                     'required': False, 'autocomplete': 'name'},
                ],
            },
            {
                'title': 'Your habits',
                'text': [
                    'For each statement, choose the response that best reflects your '
                    'usual habits.',
                ],
                'fields': [
                    {
                        'name': 'habits',
                        'type': 'scale',
                        'required': True,
                        'scale': [
                            {'value': '1', 'label': 'Rarely / Not true'},
                            {'value': '2', 'label': 'Sometimes'},
                            {'value': '3', 'label': 'Usually'},
                            {'value': '4', 'label': 'Always'},
                        ],
                        'statements': [
                            'I accept changes while maintaining stability in my daily '
                            'activities.',
                            'I make necessary or beneficial changes when appropriate.',
                            'I know where to find stress-management support through my '
                            'employer or community.',
                            'I use available stress-management support when I need it.',
                            'I prepare for demanding situations by using '
                            'stress-reduction techniques.',
                            'I reflect on stressful experiences to improve how I '
                            'respond in future.',
                            'I seek support from family or friends during difficult '
                            'times.',
                            'I avoid using alcohol or other drugs to cope with stress.',
                            'I avoid aggressive or abusive behaviour when stressed.',
                            'I get enough sleep to support my health and daily coping.',
                            'I avoid excessive sleeping as a way of coping with '
                            'stressful changes.',
                            'I maintain eating habits that support my health and '
                            'stress management.',
                            'I engage in physical activity to help manage stress.',
                            'I practise relaxation skills, such as deep breathing or '
                            'yoga.',
                            'I manage my time effectively.',
                        ],
                    },
                ],
            },
            {
                'title': 'Reflection',
                'fields': [
                    {'name': 'reflection', 'type': 'textarea', 'required': False,
                     'label': 'One stress-management habit I will strengthen this week'},
                ],
            },
        ],
        'score': {
            'field': 'habits',
            'show_client': True,
            'bands': [
                {'min': 15, 'max': 29,
                 'text': 'Your current stress-management habits may need attention. '
                         'Consider reviewing daily stressors and seeking support.'},
                {'min': 30, 'max': 44,
                 'text': 'You use some helpful strategies. Identify lower-rated areas '
                         'where you could strengthen your approach.'},
                {'min': 45, 'max': 60,
                 'text': 'You report many helpful stress-management habits. Continue '
                         'adapting your strategies as circumstances change.'},
            ],
        },
        'footnote': (
            'Adapted from the Stress Management Questionnaire (Activity 4.4), '
            'which attributes its source to Payne & Hahn (2002).'
        ),
    },
    {
        'slug': 'wellness-check-in',
        'title': 'Employee Wellness Check-In',
        'audience': 'For employees',
        'summary': (
            'A confidential check-in on your emotional, mental, physical and work '
            'wellbeing, to see where professional support may help. Participation '
            'is voluntary.'
        ),
        'pdf': '/forms/employee-wellness-check-in.pdf',
        'name_field': 'name',
        'sections': [
            {
                'title': 'About you',
                'text': [
                    'Individual responses are treated confidentially, subject to '
                    'applicable legal and professional obligations.',
                ],
                'fields': [
                    {'name': 'name', 'type': 'text', 'label': 'Name',
                     'required': False, 'autocomplete': 'name'},
                    {'name': 'company', 'type': 'text', 'label': 'Company',
                     'required': True, 'autocomplete': 'organization'},
                    {'name': 'department', 'type': 'text', 'label': 'Department',
                     'required': False},
                ],
            },
            {
                'title': 'Your wellbeing',
                'text': ['How often have you experienced the following over the past '
                         'two weeks?'],
                'fields': [
                    {
                        'name': 'wellbeing',
                        'type': 'scale',
                        'required': True,
                        'scale': [
                            {'value': '1', 'label': 'Never'},
                            {'value': '2', 'label': 'Rarely'},
                            {'value': '3', 'label': 'Sometimes'},
                            {'value': '4', 'label': 'Often'},
                            {'value': '5', 'label': 'Always'},
                        ],
                        'statements': [
                            'I feel emotionally exhausted.',
                            'I feel overwhelmed by my workload.',
                            'I struggle to concentrate at work.',
                            'I experience difficulty sleeping.',
                            'I feel anxious or worried.',
                            'I struggle to stay motivated at work.',
                            'I experience physical tiredness.',
                            'Personal challenges affect my work performance.',
                            'I struggle to maintain a healthy work-life balance.',
                            'I feel unsupported in managing my challenges.',
                        ],
                    },
                ],
            },
            {
                'title': 'Current challenges',
                'fields': [
                    {'name': 'challenges', 'type': 'multi', 'required': False,
                     'other': True,
                     'label': 'Which areas are currently affecting your wellbeing? '
                              'Tick all that apply.',
                     'short': 'Current challenges',
                     'options': _options(
                         'Work-related stress', 'Financial difficulties',
                         'Family or relationship challenges',
                         'Parenting responsibilities', 'Grief and loss',
                         'Workplace conflict', 'Mental and emotional fatigue',
                         'Physical health concerns', 'Substance use concerns',
                         'Lack of motivation',
                     )},
                ],
            },
            {
                'title': 'Emotional wellbeing check-in',
                'fields': [
                    {'name': 'feeling', 'type': 'choice', 'required': True,
                     'label': 'How are you feeling today?', 'short': 'Feeling today',
                     'options': _options('Very good', 'Good', 'Fair', 'Poor',
                                         'Very poor')},
                    {'name': 'concern', 'type': 'textarea', 'required': False,
                     'label': 'What is your greatest concern at the moment?',
                     'short': 'Greatest concern'},
                    {'name': 'coping', 'type': 'textarea', 'required': False,
                     'label': 'How do you currently cope with stress?',
                     'short': 'Coping with stress'},
                ],
            },
            {
                'title': 'Support needs',
                'fields': [
                    {'name': 'support', 'type': 'multi', 'required': False,
                     'label': 'What type of support would you benefit from?',
                     'short': 'Support wanted',
                     'options': _options(
                         'Individual counselling', 'Stress management',
                         'Financial wellness education', 'Family and parenting support',
                         'Conflict management', 'Emotional wellbeing support',
                         'Burnout prevention', 'Work-life balance guidance',
                         'Referral to a specialist',
                         'No additional support required at present',
                     )},
                    {'name': 'follow_up', 'type': 'choice', 'required': True,
                     'label': 'Would you like a confidential follow-up counselling '
                              'session?',
                     'short': 'Follow-up session',
                     'options': _options(*YES_NO_UNSURE)},
                    {'name': 'urgent', 'type': 'choice', 'required': True,
                     'label': 'Do you have any immediate wellbeing or safety concerns '
                              'that require urgent support?',
                     'short': 'Urgent concerns',
                     'options': _options('Yes', 'No', 'Prefer to discuss privately')},
                    {'name': 'phone', 'type': 'tel', 'required': False,
                     'autocomplete': 'tel',
                     'label': 'Contact number, if you would like us to contact you'},
                    {'name': 'comments', 'type': 'textarea', 'required': False,
                     'label': 'Additional comments'},
                ],
            },
        ],
        # Scored for the practice only; the PDF puts it under "For professional use".
        'score': {'field': 'wellbeing', 'show_client': False},
        'footnote': (
            'This is a general check-in tool, not a diagnostic assessment. If you '
            'need urgent help, contact emergency services or your nearest hospital.'
        ),
    },
    {
        'slug': 'programme-evaluation',
        'title': 'Employee Wellness Programme Evaluation',
        'audience': 'After a workshop or programme',
        'summary': (
            'Tell us how a wellness programme or workshop went for you. '
            'Participation is voluntary.'
        ),
        'pdf': '/forms/employee-wellness-programme-evaluation.pdf',
        'sections': [
            {
                'title': 'The programme',
                'fields': [
                    {'name': 'company', 'type': 'text', 'label': 'Company',
                     'required': False, 'autocomplete': 'organization'},
                    {'name': 'topic', 'type': 'text', 'label': 'Programme topic',
                     'required': False},
                    {'name': 'facilitator', 'type': 'text', 'label': 'Facilitator',
                     'required': False},
                ],
            },
            {
                'title': 'Programme evaluation',
                'fields': [
                    {
                        'name': 'evaluation',
                        'type': 'scale',
                        'required': True,
                        'scale': AGREE_5,
                        'statements': [
                            'The programme met my expectations.',
                            'The topic was relevant to my needs.',
                            'The facilitator demonstrated professionalism.',
                            'The information was clear and understandable.',
                            'I felt comfortable participating.',
                            'The programme was engaging and informative.',
                            'I gained practical coping strategies.',
                            'I have a better understanding of my wellbeing.',
                            'I can apply what I learned in my daily life.',
                            'I am satisfied with the overall programme.',
                        ],
                    },
                ],
            },
            {
                'title': 'Programme effectiveness',
                'fields': [
                    {'name': 'rating', 'type': 'choice', 'required': True,
                     'label': 'How would you rate the overall programme?',
                     'short': 'Overall rating',
                     'options': _options('Excellent', 'Very good', 'Good', 'Fair',
                                         'Poor')},
                    {'name': 'most_valuable', 'type': 'textarea', 'required': False,
                     'label': 'What was the most valuable part of the programme?',
                     'short': 'Most valuable'},
                    {'name': 'improvements', 'type': 'textarea', 'required': False,
                     'label': 'What improvements would you recommend?',
                     'short': 'Improvements'},
                ],
            },
            {
                'title': 'Future wellness programmes',
                'fields': [
                    {'name': 'topics', 'type': 'multi', 'required': False,
                     'other': True,
                     'label': 'Which topics would you like us to address in future? '
                              'Tick all that apply.',
                     'short': 'Future topics',
                     'options': _options(
                         'Stress management', 'Burnout and mental fatigue',
                         'Emotional intelligence', 'Financial wellness',
                         'Work-life balance', 'Conflict management',
                         'Parenting and family challenges', 'Grief and loss',
                         'Substance abuse awareness', 'Building resilience',
                         'Workplace relationships',
                     )},
                ],
            },
            {
                'title': 'Additional support',
                'fields': [
                    {'name': 'another_programme', 'type': 'choice', 'required': True,
                     'label': 'Would you be interested in attending another wellness '
                              'programme?',
                     'short': 'Another programme',
                     'options': _options(*YES_NO_UNSURE)},
                    {'name': 'counselling', 'type': 'choice', 'required': True,
                     'label': 'Would you benefit from confidential individual '
                              'counselling?',
                     'short': 'Individual counselling',
                     'options': _options(*YES_NO_UNSURE)},
                    {'name': 'comments', 'type': 'textarea', 'required': False,
                     'label': 'Additional comments'},
                ],
                'after': [
                    'If you would like individual support, please contact the '
                    'practice privately.',
                ],
            },
        ],
    },
    {
        'slug': 'counselling-evaluation',
        'title': 'Client Counselling Evaluation',
        'audience': 'After your sessions',
        'summary': (
            'Tell us about your experience of counselling with us. Your feedback '
            'helps us improve. Participation is voluntary.'
        ),
        'pdf': '/forms/client-counselling-evaluation.pdf',
        'name_field': 'name',
        'sections': [
            {
                'title': 'About you',
                'fields': [
                    {'name': 'name', 'type': 'text', 'label': 'Name',
                     'required': False, 'autocomplete': 'name'},
                    {'name': 'sessions', 'type': 'text', 'required': False,
                     'label': 'Number of sessions attended', 'inputmode': 'numeric'},
                ],
            },
            {
                'title': 'Service satisfaction',
                'fields': [
                    {
                        'name': 'satisfaction',
                        'type': 'scale',
                        'required': True,
                        'scale': AGREE_5,
                        'statements': [
                            'I felt welcomed and comfortable.',
                            'I was treated with dignity and respect.',
                            'The social worker listened attentively.',
                            'I felt safe expressing my feelings.',
                            'My concerns were understood.',
                            'Confidentiality was clearly explained.',
                            'The counselling addressed my needs.',
                            'I gained useful coping strategies.',
                            'I feel better equipped to manage my challenges.',
                            'I am satisfied with the overall service.',
                        ],
                    },
                ],
            },
            {
                'title': 'Counselling outcomes',
                'fields': [
                    {'name': 'wellbeing', 'type': 'choice', 'required': True,
                     'label': 'How would you describe your emotional wellbeing since '
                              'receiving counselling?',
                     'short': 'Wellbeing since counselling',
                     'options': _options('Significantly improved', 'Somewhat improved',
                                         'No change', 'Somewhat worse',
                                         'Significantly worse')},
                    {'name': 'most_helpful', 'type': 'textarea', 'required': False,
                     'label': 'What did you find most helpful during counselling?',
                     'short': 'Most helpful'},
                    {'name': 'improvements', 'type': 'textarea', 'required': False,
                     'label': 'What could we do to improve our services?',
                     'short': 'Improvements'},
                ],
            },
            {
                'title': 'Future support',
                'fields': [
                    {'name': 'more_sessions', 'type': 'choice', 'required': True,
                     'label': 'Would you like to attend additional counselling '
                              'sessions?',
                     'short': 'More sessions',
                     'options': _options(*YES_NO_UNSURE)},
                    {'name': 'recommend', 'type': 'choice', 'required': True,
                     'label': 'Would you recommend our services to others?',
                     'short': 'Would recommend',
                     'options': _options(*YES_NO_UNSURE)},
                    {'name': 'comments', 'type': 'textarea', 'required': False,
                     'label': 'Additional comments'},
                ],
            },
        ],
    },
]

FORMS_BY_SLUG = {form['slug']: form for form in FORMS}
FORM_CHOICES = [(form['slug'], form['title']) for form in FORMS]


def fields(form):
    for section in form['sections']:
        yield from section.get('fields', [])
