# from fastapi import FastAPI
#
# app = FastAPI()
#
#
# @app.get("/")
# async def root():
#     return {"message": "Hello World"}



from fastapi import FastAPI
from server.roots import root_news
# from roots import root_news
app = FastAPI()


app.include_router(root_news.router, prefix="/api")

# print('ok')