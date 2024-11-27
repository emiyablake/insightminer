

from typing import List

from fastapi import HTTPException
import requests

import properties




class ApiNewsService:
    _api_key: str = properties.api_news.get('api_key', '')
    _endpoint: str = properties.api_news.get('endpoint', '')


    @classmethod
    def request_news(self, search_word):
        return self._request(self._endpoint, search_word)
    
    @classmethod
    def _request(self, url, search_word):
        response = requests.get(
            url=url,
            params={
                'q': search_word,
                'apiKey': self._api_key
            }
        )

        if response.status_code == 200:
            return response.json()
        else:
            return {
                "error": "Erro na API externa",
                "details": response.json(),
                "status": "error",
                "response_code": response.status_code
            }
            

                    
            
                
                



def extract_info_news(news_data: dict, query: dict) -> List[dict]:
    """Get api news response and extract only useful information to update database"""
    keys_to_delete = ['source', 'urlToImage', 'author', 'publishedAt']
    news = [
        {
            key: value 
            for key, value in news.items()
            if key not in keys_to_delete
        } | {'search_word': query.get('search_word')}
        for news in news_data['articles']
    ]

    return news






