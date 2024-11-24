from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from server.roots import root_news

# from roots import root_news # docker


app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=['*']
)

app.include_router(root_news.router, prefix="/api")
