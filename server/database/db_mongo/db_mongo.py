from dataclasses import dataclass
from typing import List, Dict

from pymongo import MongoClient
from bson.objectid import ObjectId

from server import properties

# from server import properties
# import properties # docker



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
    def insert_many_documents(
            cls,
            documents: List[dict],
            db_collection_name: str
    ) -> dict:
        db_collection = cls._db[db_collection_name]
        response = db_collection.insert_many(documents)
        response_di = {}

        if response.acknowledged:
            response_di = {
                "acknowledged": response.acknowledged,
                "inserted_ids": [str(obj_id) for obj_id in response.inserted_ids],
                "documents_inserted": len(response.inserted_ids)
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

    @classmethod
    def update_document(
            cls,
            db_collection_name: str,
            document_id: ObjectId,
            query_update: dict
    ) -> dict:

        db_collection = cls._db[db_collection_name]

        query_update = {
            '$set': query_update
        }
        query = {
            "_id": document_id
        }

        response = db_collection.update_one(query, query_update)

        response_di = {
            "acknowledged": response.acknowledged,
            "matched_count": response.matched_count,
            "modified_count": response.modified_count
        }

        return response_di


