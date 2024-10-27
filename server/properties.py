from dotenv import load_dotenv
import os

load_dotenv()

mongo_db = {
    'db_name': 'api_news',
    'colection': 'news_content',
    'uri': os.getenv("Uri")
}

print(mongo_db)



