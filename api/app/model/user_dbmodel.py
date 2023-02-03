from ..db.database import Base
from sqlalchemy import Column, String, Integer


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String)