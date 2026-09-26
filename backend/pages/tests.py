from django.test import TestCase
from django.urls import reverse


class SiteContentApiTests(TestCase):
    def test_returns_site_content(self):
        response = self.client.get(reverse('site-content'))

        self.assertEqual(response.status_code, 200)
        data = response.json()
        for key in (
            'practice',
            'hero',
            'page_titles',
            'about',
            'values',
            'services',
            'who_we_serve',
            'approach',
            'commitment',
            'contact',
        ):
            self.assertIn(key, data)

    def test_has_a_title_for_every_page(self):
        titles = self.client.get(reverse('site-content')).json()['page_titles']

        self.assertEqual(
            set(titles), {'about', 'services', 'approach', 'contact', 'book'}
        )

    def test_service_slugs_are_unique(self):
        services = self.client.get(reverse('site-content')).json()['services']
        slugs = [service['slug'] for service in services]

        self.assertEqual(len(slugs), len(set(slugs)))

    def test_rejects_post(self):
        response = self.client.post(reverse('site-content'))

        self.assertEqual(response.status_code, 405)
