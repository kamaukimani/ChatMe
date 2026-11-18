from sqlalchemy_serializer import SerializerMixin 
from sqlalchemy.orm import Mapped,mapped_column,relationship 
from app.db import db 
from datetime import datetime 
from sqlalchemy import func,ForeignKey


class Message(db.Model,SerializerMixin):
    __tablename__="messages"

    serialize_rules=()

    id:Mapped[int]=mapped_column(primary_key=True)
    body:Mapped[str]
    created_at:Mapped[datetime]=mapped_column(server_default=func.now())
    updated_at:Mapped[datetime]=mapped_column(server_default=func.now(),onupdate=func.now())

    user_id:Mapped[int]=mapped_column(ForeignKey("users.id"))

    user:Mapped["User"]=relationship(back_populates="messages")


    def __repr__(self):

        return f"<Message {self.id}, {self.body}>"