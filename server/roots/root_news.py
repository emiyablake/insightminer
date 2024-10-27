import datetime

from typing import List, Optional

from bson import ObjectId
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
# from database.db_mongo.db_mongo import MongoDB

from server.database.db_mongo.db_mongo import MongoDB
from server.modules.utils.format_data import convert_object_id, get_error_message_bad_request
#from ..modules.utils.format_data import convert_object_id, get_error_message_bad_request
#from ..database.db_mongo.db_mongo import MongoDB

router = APIRouter()


class Query(BaseModel):
    url: str = None
    title: str = None
    search_word: str = None
    content: str = None
    description: str = None

    def set_query_to_dict(self) -> dict:
        return {
            key: value
            for key, value in self.model_dump().items()
            if value is not None
        }


class QuerySearchWord(Query):
    search_word: str


@router.get("/news/test")
def read_root():
    return {"server status - news": "ok"}


# ler todas noticias
@router.get("/news")
def read_all_news():
    print('Listando todas as noticias')
    documents = MongoDB.read_all_documents(db_collection_name='news_content')
    documents = [convert_object_id(document) for document in documents]

    return {
        'result': documents[:10]
    }


# ler noticia por id
@router.post("/news")
def read_news_by_id(body: dict):
    object_id = body.get('object_id', None)
    document = MongoDB.read_document(
        db_collection_name='news_content',
        object_id=ObjectId(object_id)
    )
    convert_object_id(document)
    return {
        'result': document
    }


@router.post("/news/search")
async def read_news_by_query(body: Query):

    dt_start = datetime.datetime.now()
    query = body.set_query_to_dict()

    if not query:
        return get_error_message_bad_request(query)
    else:
        documents = MongoDB.search_documents_by_query(
            db_collection_name='news_content',
            query=query
        )
        documents = [convert_object_id(document) for document in documents]

        return {
            "total_results": len(documents),
            "execution_time": datetime.datetime.now() - dt_start,
            "query": query,
            "result": documents
        }


@router.post("/news/create")
def create_news(body: Query):

    query = body.set_query_to_dict()

    if not query:
        return get_error_message_bad_request(query)

    else:
        response = MongoDB.insert_document(
            db_collection_name='news_content',
            document=query
        )

        query = convert_object_id(query)

        return {
            "result": response,
            "document": query
        }


@router.delete("/news/delete/one")
def delete_news(body: Query):
    query = body.set_query_to_dict()

    if not query:
        return get_error_message_bad_request(query)

    else:
        response = MongoDB.delete_document(
            db_collection_name='news_content',
            query=query
        )

        query = convert_object_id(query)

        return {
            "result": response,
            "query": query
        }


@router.delete("/news/delete/many")
def delete_news(body: Query):
    query = body.set_query_to_dict()

    if not query:
        return get_error_message_bad_request(query)

    else:
        response = MongoDB.delete_documents(
            db_collection_name='news_content',
            query=query
        )

        query = convert_object_id(query)

        return {
            "result": response,
            "query": query
        }


@router.put("/news/update")
def update_news(body: QuerySearchWord):
    pass

