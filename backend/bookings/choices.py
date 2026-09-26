from pages.content import SITE_CONTENT

# "Who is the session for?" options, kept in step with the services on the site.
SERVICE_CHOICES = [
    *((service['slug'], service['audience']) for service in SITE_CONTENT['services']),
    ('unsure', 'Not sure yet'),
]

SERVICE_LABELS = dict(SERVICE_CHOICES)
