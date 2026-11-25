from flask import session,request,make_response 
from app.db import db ,bcrypt
from app.models import Message,User
from flask_restful import Resource 
from sqlalchemy import or_,and_,case,select,func

class Messages(Resource):
    # def get(self):
    #     messages=[message.to_dict(rules=("-user",)) for message in Message.query.all()]

    #     return make_response(messages,200)
    def get(self,recipient_id):
        current_user= session["user_id"]
        messages=Message.query.filter(
            or_(
                and_(Message.sender_id == current_user,Message.recipient_id == recipient_id),
                and_(Message.sender_id == recipient_id,Message.recipient_id == current_user)
            )
        ).order_by(Message.updated_at.asc()).all()

        return [msg.to_dict() for msg in messages],200

   

class MessagesByUser(Resource):
    def get(self):
        current_user= session["user_id"]
        messages = [message.to_dict(rules=("-user",)) 
        for message in Message.query.filter_by(sender_id = current_user).order_by(Message.updated_at.asc()).all()
        ]

        return make_response(messages,200)
    # def get(self,recipient_id):
    #     current_user= session["user_id"]
    #     messages=Message.query.filter(
    #         or_(
    #             and_(Message.sender_id == current_user,Message.recipient_id == recipient_id),
    #             and_(Message.sender_id == recipient_id,Message.recipient_id == current_user)
    #         )
    #     ).order_by(Message.updated_at.asc()).all()

    #     return [msg.to_dict() for msg in messages],200

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
    
    def delete(self,id):
        message=Message.query.filter_by(id = id).first()
        if message is None:
            return {"error":"Ooops!...the record does not exist"},404
        db.session.delete(message)
        db.session.commit()

        return {},204

# class MessageUser(Resource):
#     def get(sef):
#         current_user = session["user_id"]
#         messages= Message.query.filter(
#             or_(
#                 Message.sender_id == current_user,
#                 Message.recipient_id == current_user
#             )
#         ).order_by(Message.created_at.asc()).all()

#         users= set()

#         for msg in messages:
#             if msg.sender_id == current_user:
#                 users.add(msg.recipient_id)
#             else: 
#                 users.add(msg.sender_id)

#         return {"user_id": user_id for user_id in users}
# 

class MessageUser(Resource):
    def get(self):
        current_user = session["user_id"]

        other_user = case(
            (Message.sender_id == current_user, Message.recipient_id),
            else_=Message.sender_id
        )

        stmt = (
            select(
                User.id,
                User.username,
                func.max(Message.created_at).label("last_message")
            )
            .join(Message, User.id == other_user)
            .where(
                or_(
                    Message.sender_id == current_user,
                    Message.recipient_id == current_user
                )
            )
            .group_by(User.id, User.username)
            .order_by(func.max(Message.created_at).desc())
        )

        users = db.session.execute(stmt).all()

        return [
            {
                "id": user.id,
                "username": user.username,
                # "last_message": user.last_message.isoformat()
                # if user.last_message else None
            }
            for user in users
        ]