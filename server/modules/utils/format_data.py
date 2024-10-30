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

def extract_words_from_mongo(docs: list) -> list:
    stopwords = {"the", "of", "a", "an", "and", "in", "to", "for", "is", "on", "with", "by",
                 "it", "this", "that", "from", "are", "at", "be", "as", "was", "or",
                 "but", "not", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "more",
                 "e", "i", "o", "u"}

    word_cloud = []
    for item in docs:
        for key in ["title", "content", "description"]:
            print(key, item.get(key))
            words = item.get(key, "").split() if item.get(key, "") is not None else []
            word_cloud.extend([word.lower() for word in words if word.lower() not in stopwords])

    return word_cloud