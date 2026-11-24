from sqlalchemy_serializer import SerializerMixin 
from sqlalchemy.orm import Mapped,mapped_column,relationship 
from app.db import db 
from datetime import datetime 
from sqlalchemy import func,ForeignKey


# class Message(db.Model,SerializerMixin):
#     __tablename__="messages"

#     serialize_rules=("-user.messages","-contact.messages",)

#     id:Mapped[int]=mapped_column(primary_key=True)
#     body:Mapped[str]
#     created_at:Mapped[datetime]=mapped_column(server_default=func.now())
#     updated_at:Mapped[datetime]=mapped_column(server_default=func.now(),onupdate=func.now())

#     user_id:Mapped[int]=mapped_column(ForeignKey("users.id"))
#     contact_id:Mapped[int]=mapped_column(ForeignKey("contacts.id"))

#     user:Mapped["User"]=relationship(back_populates="messages")
#     contact:Mapped["Contact"]=relationship(back_populates="messages")


#     def __repr__(self):

#         return f"<Message {self.id}, {self.body}>"

class Message(db.Model,SerializerMixin):
    __tablename__="messages"

    serialize_rules=("-sender.sent_messages","-recipient.received_messages",)

    id:Mapped[int]=mapped_column(primary_key=True)
    body:Mapped[str]
    created_at:Mapped[datetime]=mapped_column(server_default=func.now())
    updated_at:Mapped[datetime]=mapped_column(server_default=func.now(),onupdate=func.now())

    sender_id:Mapped[int]=mapped_column(ForeignKey("users.id"))
    recipient_id:Mapped[int]=mapped_column(ForeignKey("users.id"))
    

    sender:Mapped["User"]=relationship(
        foreign_keys=[sender_id],
        back_populates="sent_messages")
    recipient:Mapped["User"]=relationship(
        foreign_keys=[recipient_id],
        back_populates="received_messages")


    def __repr__(self):

        return f"<Message {self.id}, {self.body}>"