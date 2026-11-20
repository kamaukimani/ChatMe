from sqlalchemy_serializer import SerializerMixin 
from sqlalchemy.orm import Mapped,mapped_column,relationship 
from app.db import db 
from typing import List
from sqlalchemy.ext.associationproxy import association_proxy

class User(db.Model,SerializerMixin):
    __tablename__="users"

    serialize_rules=("-messages.user",)

    id:Mapped[int]=mapped_column(primary_key=True)
    username:Mapped[str]=mapped_column(unique=True)
    email:Mapped[str]=mapped_column(unique=True)
    password:Mapped[str]

    messages:Mapped[List["Message"]]=relationship(back_populates="user",cascade="all,delete-orphan")

    contacts=association_proxy("messages","contact",creator=lambda contact_obj:Message(contact=contact_obj))

    def __repr__(self):

        return f"<User {self.id}, {self.username}>"