from dotenv import load_dotenv
import os

load_dotenv()

mongo_db = {
    'db_name': 'api_news',
    'colection': 'news_content',
    'uri': os.getenv("Uri"),
    'search_word_document_id': '6670d8dcde7b4b99e1bd8c05'
}

api_news = {
    'api_key': os.getenv('News_api_key'),
    'endpoint': 'https://newsapi.org/v2/everything'
}
