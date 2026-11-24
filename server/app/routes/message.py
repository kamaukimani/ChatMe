from flask import session,request,make_response 
from app.db import db ,bcrypt
from app.models import Message 
from flask_restful import Resource 

class Messages(Resource):
    def get(self):
        messages=[message.to_dict(rules=("-user",)) for message in Message.query.all()]

        return make_response(messages,200)

   

class MessagesByUser(Resource):
    def get(self):
        current_user= session["user_id"]
        messages = [message.to_dict(rules=("-user",)) 
        for message in Message.query.filter_by(sender_id = current_user).order_by(Message.updated_at.asc()).all()
        ]

        return make_response(messages,200)

    def post(self):
        current_user= session["user_id"]
        data=request.get_json()
        body=data.get("body")
        #sender_id=data.get("sender_id")
        recipient_id=data.get("recipient_id")

        if not (body and current_user and recipient_id):
            return {"error":"Provide all fields"},400

        new_message=Message(
            body=body,
            sender_id=current_user,
            recipient_id=recipient_id,
        )
        db.session.add(new_message)
        db.session.commit()

        response=new_message.to_dict(rules=("-recipient.email","-recipient.id","-sender",))

        return make_response(
            response,
            200
        )

class MessageById(Resource):
    def get(self,id):
        message=Message.query.filter(Message.id == id).first()
        if message is None:
            return {"error":"Message not found"},404
        response=message.to_dict(rules=("-recipient.email","-recipient.id","-sender",))

        return make_response(
            response,
            200
        )