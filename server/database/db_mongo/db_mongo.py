from dataclasses import dataclass
from typing import List, Dict

from pymongo import MongoClient
from bson.objectid import ObjectId
from server import properties


class MongoDB:
    _db_name: str = properties.mongo_db.get('db_name', '')
    _uri: str = properties.mongo_db.get('uri', '')
    _client = MongoClient(_uri)
    _db = _client[_db_name]

    @classmethod
    def read_all_documents(cls, db_collection_name: str) -> List[dict]:
        db_collection = cls._db[db_collection_name]
        documents = db_collection.find()

        return list(documents)

    @classmethod
    def read_document(
            cls, db_collection_name: str, object_id: ObjectId
    ) -> List[dict]:
        db_collection = cls._db[db_collection_name]
        document = db_collection.find_one(ObjectId(object_id))  # '665e4d6f0e9a907afa51c60e'))

        return document

    @classmethod
    def search_documents_by_query(cls, db_collection_name: str, query: dict) -> List[dict]:
        db_collection = cls._db[db_collection_name]
        documents = db_collection.find(query)

        return list(documents)

    @classmethod
    def insert_document(
            cls,
            db_collection_name: str,
            document: dict
    ) -> dict:
        db_collection = cls._db[db_collection_name]
        response = db_collection.insert_one(document)
        response_di = {}

        if response.acknowledged:
            response_di = {
                # "acknowledged": response.acknowledged,
                "inserted_id": str(response.inserted_id)
            }

        return response_di

    @classmethod
    def delete_document(
            cls,
            db_collection_name: str,
            query: dict
    ) -> dict:
        db_collection = cls._db[db_collection_name]
        response = db_collection.delete_one(query)
        response_di = {}

        if response.acknowledged:
            response_di = {
                "acknowledged": response.acknowledged,
                "deleted_count": response.deleted_count
            }

        return response_di

    @classmethod
    def delete_documents(
            cls,
            db_collection_name: str,
            query: dict
    ) -> dict:
        db_collection = cls._db[db_collection_name]
        response = db_collection.delete_many(query)
        response_di = {}

        if response.acknowledged:
            response_di = {
                "acknowledged": response.acknowledged,
                "deleted_count": response.deleted_count
            }

        return response_di



MongoDB.insert_document(db_collection_name='news_content', document={
    "teste": '123',
    "sabugo": 'new sabugancias',
    "dt": '8/7'
})
# query = {
#     "search_word" : "python"
# }
# MongoDB.search_documents_by_query('news_content', query)


#
# def update_document(self,
#                     db_collection_name: str,
#                     query_filter: dict,  # query para obter o documento a ser atualizado
#                     update_operation: Dict[str, str]):  # valores que serão alterados
#
#     db_collection = self.db[db_collection_name]
#     update_operation = {
#         '$set': update_operation
#     }
#
#     response = db_collection.update_one(query_filter, update_operation)
#
#     if response.modified_count > 1:
#         return True
#     else:
#         return False
#
# def delete_document(self,
#                     db_collection_name: str,
#                     query_filter: dict):
#
#     db_collection = self.db[db_collection_name]
#     response = db_collection.delete_one(query_filter)
#
#     if response.deleted_count == 1:
#         return True
#     else:
#         return False

#
