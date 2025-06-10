import requests
from django.conf import settings

def check_url_with_safebrowsing(url):
    api_key = settings.GOOGLE_SAFE_BROWSING_API_KEY
    endpoint = "https://safebrowsing.googleapis.com/v4/threatMatches:find"
    payload = {
        "client": {"clientId": "safesurfing", "clientVersion": "1.0"},
        "threatInfo": {
            "threatTypes": ["MALWARE", "SOCIAL_ENGINEERING"],
            "platformTypes": ["ANY_PLATFORM"],
            "threatEntryTypes": ["URL"],
            "threatEntries": [{"url": url}]
        }
    }
    response = requests.post(
        f"{endpoint}?key={api_key}",
        json=payload
    )
    data = response.json()
    is_dangerous = bool(data.get("matches"))
    print("SafeBrowsing 응답:", data)  # 이 줄 추가
    description = "위험 URL" if is_dangerous else "안전 URL"
    return is_dangerous, description
