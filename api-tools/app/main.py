from typing import Union
from fastapi import FastAPI # type: ignore - installed via Dockerfile

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

print("started...")