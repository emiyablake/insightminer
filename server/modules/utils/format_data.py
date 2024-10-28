from bson import ObjectId

from fastapi import APIRouter, HTTPException


def convert_object_id(document: dict) -> dict:
    """
    Converte todos os ObjectId de um documento para strings.
    """
    if isinstance(document, dict):
        for key, value in document.items():
            if isinstance(value, ObjectId):
                document[key] = str(value)

    return document


def get_error_message_bad_request(query):
    request_detail = {
            "example_request_body": {
                "url": "string",
                "title": "string",
                "search_word": "string",
                "content": "string",
                "description": "string"
            }
        }
    return {
        "result": HTTPException(status_code=422, detail=request_detail),
        "query": query,
        "status": "Bad request"
    }
