
from fastapi import FastAPI, Request
from json import JSONEncoder
from pydantic import BaseModel
from fastapi.middleware.cors import (
     CORSMiddleware
)
from enum import Enum
from models.api_utils import (
    RequestApi
)

key = 'e06ec40bdd9e5215b1cd85e2805b9edc'
app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:5173"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Artist(BaseModel):
    name: str

@app.post('/artista')
def get_name(artist_name: str):
        A = RequestApi.get_artista_nome(artist_name)
        return A

@app.get('/artista')
def get_artist(artist: Artist):

    artista = RequestApi.get_artista_nome(artist)

    return artista




