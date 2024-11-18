

from typing import List


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





