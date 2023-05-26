from typing import Union
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from parser import main_func

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def index(q: Union[str, None] = None):
    if q is None:
        return []

    try:
        result = main_func(q)
    except Exception as e:
        print(e)
        return []

    return result

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)