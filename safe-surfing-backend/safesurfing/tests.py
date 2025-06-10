from django.urls import reverse
from rest_framework.test import APITestCase

class URLInspectTest(APITestCase):
    def test_inspect_url(self):
        url = reverse('inspect-url')
        data = {'url': 'https://www.example.com'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 200)
