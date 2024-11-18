import string
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
    stopwords = {
        "the", "of", "a", "an", "and", "in", "to", "for", "is", "on", "with", "by",
        "it", "this", "that", "from", "are", "at", "be", "as", "was", "or",
        "but", "not", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "more",
        "e", "i", "o", "u", "i", "me", "my", "myself", "we", "our", "ours", "ourselves",
        "you", "your",
        "yours", "yourself", "yourselves", "he", "him", "his", "himself", "she",
        "her", "hers", "herself", "it", "its", "itself", "they", "them", "their",
        "theirs", "themselves", "what", "which", "who", "whom", "this", "that",
        "these", "those", "am", "is", "are", "was", "were", "be", "been", "being",
        "have", "has", "had", "having", "do", "does", "did", "doing", "a", "an",
        "the", "and", "but", "if", "or", "because", "as", "until", "while", "of",
        "at", "by", "for", "with", "about", "against", "between", "into", "through",
        "during", "before", "after", "above", "below", "to", "from", "up", "down",
        "in", "out", "on", "off", "over", "under", "again", "further", "then",
        "once", "here", "there", "when", "where", "why", "how", "all", "any", "both",
        "each", "few", "more", "most", "other", "some", "such", "no", "nor", "not",
        "only", "own", "same", "so", "than", "too", "very", "s", "t", "can", "will",
        "just", "don", "should", "now", "d", "ll", "m", "o", "re", "ve", "y", "ain",
        "aren", "couldn", "didn", "doesn", "hadn", "hasn", "haven", "isn", "ma",
        "mightn", "mustn", "needn", "shan", "shouldn", "wasn", "weren", "won",
        "wouldn", "...", ".", "-", ""
    }

    word_cloud = []
    for item in docs:
        for key in ["title", "content", "description"]:
            # print(key, item.get(key))
            words = item.get(key, "").split() if item.get(key, "") is not None else []
            word_cloud.extend(
                [
                    word.lower().strip(string.punctuation)
                    for word in words 
                    if word.lower() not in stopwords 
                    and len(word) > 1

                ]
            )

    return word_cloud
