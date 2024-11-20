from fastapi import FastAPI

from roots import root_news

app = FastAPI()
app.include_router(root_news.router, prefix="/api")
