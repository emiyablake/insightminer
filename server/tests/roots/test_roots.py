from fastapi.testclient import TestClient
from unittest.mock import patch
from server.app import app
from server.tests.mocks.roots_news_mocks import get_words_cloud_mock, get_words_update_mock



client = TestClient(app)


def test_get_news_test():
    response = client.get("/api/news/test")
    assert response.status_code == 200
    assert response.json() == {
        "server status - news": "ok"
        }

def test_post_words_update():
    body = {
        "search_word": "azure",
        "test": True
    }

    with patch("server.modules.mocks.api_news_mocks", side_effect=get_words_update_mock):
        response = client.post("/api/news/words/update", json=body)
    
    response = client.post("/api/news/words/update", json=body)
    assmbled_response = response.json()
    assmbled_response.pop('execution_time')
    assmbled_response['db_response'].pop('inserted_ids')

    expected_response = get_words_update_mock()

    assert response.status_code == 200
    assert assmbled_response == expected_response

def test_words_cloud():
    body = {
        "search_word": "python"
    }

    with patch("server.modules.mocks.api_news_mocks", side_effect=get_words_update_mock):
        response = client.post("/api/news/words/cloud", json=body)
    

    expected_response = get_words_cloud_mock()

    assert response.status_code == 200
    assert response.json()['status'] == expected_response['status']
