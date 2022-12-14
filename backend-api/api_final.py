
from fastapi import FastAPI, Request
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
    "http://localhost:3000"
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

# @app.post('/artista')
# def get_name(artist_name: str):
#         A = RequestApi.get_artista_nome(artist_name)
#         return A

@app.get('/artista/{name}')
def get_artist(name: str):

    if(name != ''):

        artista = RequestApi.get_artista_nome(name)

        id = artista['id']

        full_artist = RequestApi.get_artista(id)

        return full_artist

    



