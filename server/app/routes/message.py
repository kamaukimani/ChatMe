from flask import session,request,make_response 
from app.db import db ,bcrypt
from app.models import Message 
from flask_restful import Resource 

class Messages(Resource):
    def get(self):
        messages=[message.to_dict(rules=("-user",)) for message in Message.query.all()]

        return make_response(messages,200)

class MessagesByUser(Resource):
    def get(self,id):
        messages = [message.to_dict(rules=("-user",)) 
        for message in Message.query.filter_by(user_id = id).order_by(Message.updated_at.desc()).all()
        ]

        return make_response(messages,200)

class MessageById(Resource):
    def get(self,id):
        message=Message.query.filter(Message.id == id).first()
        if message is None:
            return {"error":"Message not found"},404
        response=message.to_dict(rules=("-user","-contact.password",))

        return make_response(
            response,
            200
        )