from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from api_utils.api_utils import RequestApi
from db.database import session, User

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserCreate(BaseModel): #criando classe do objeto Usuário
    name: str
    email: str

@app.post("/users/")
async def create_user(user: UserCreate):
    new_user = User(name=user.name, email=user.email)
    session.add(new_user)
    session.commit()
    return {"message": "User created"}

@app.get("/users/")
async def read_users():
    users = session.query(User).all()
    return [{"id": user.id, "name": user.name, "email": user.email} for user in users]

@app.put("/users/{id}")
async def update_user(id: int, user: UserCreate):
    user_to_update = session.query(User).get(id)
    user_to_update.name = user.name
    user_to_update.email = user.email
    session.commit()
    return {"message": "User updated"}

@app.delete("/users/{id}")
async def delete_user(id: int):
    user_to_delete = session.query(User).get(id)
    session.delete(user_to_delete)
    session.commit()
    return {"message": "User deleted"}


##Busca artistas

@app.get('/artista/{name}')
def get_artist(name: str):
    result = ''

    artista = RequestApi.get_artista_nome(name)
    
    id = artista['id']

    full_artist = RequestApi.get_artista(id)

    return full_artist
    
@app.get('/artista{profile_path}')
def get_artist_photo(path: str):
    
    if(path != ''):
        
        photo = RequestApi.get_artista_photo(path)
        return photo