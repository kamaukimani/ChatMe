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