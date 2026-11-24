# from sqlalchemy_serializer import SerializerMixin 
# from sqlalchemy.orm import Mapped,mapped_column,relationship 
# from app.db import db 
# from typing import List
# from sqlalchemy.ext.associationproxy import association_proxy

# class Contact(db.Model,SerializerMixin):
#     __tablename__="contacts"

#     serialize_rules=("-messages.contact",)

#     id:Mapped[int]=mapped_column(primary_key=True)
#     username:Mapped[str]=mapped_column(unique=True)
#     email:Mapped[str]=mapped_column(unique=True)
#     password:Mapped[str]

#     messages:Mapped[List["Message"]]=relationship(back_populates="contact",cascade="all,delete-orphan")

#     users=association_proxy("messages","user",creator=lambda user_obj:Message(user=user_obj))

#     def __repr__(self):

#         return f"<Contact {self.id}, {self.username}>"