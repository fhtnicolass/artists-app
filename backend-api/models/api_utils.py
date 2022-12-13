import requests
# from tmdb.models import TMDBMovie, Genre
from enum import Enum

key = 'e06ec40bdd9e5215b1cd85e2805b9edc'

class RequestApi:
    """se
    
    Esta classe faz request para a API do tmdb,
    de acordo com funções pre-definidas do nosso app

    """
    @staticmethod
    def get_artista(person_id):
        endpoint = f'https://api.themoviedb.org/3/person/{person_id}?api_key={key}'
        r = requests.get(endpoint)
        data = r.json()
        results = data
        return results

    @staticmethod
    def get_artista_nome(person: str):
        endpoint = f'https://api.themoviedb.org/3/search/person?api_key={key}&query={person}'
        r = requests.get(endpoint)
        data = r.json()
        artists = data['results']
        artist_searched = artists[0]
        return artist_searched
        