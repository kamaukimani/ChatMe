from flask import session,request,make_response 
from app.db import db ,bcrypt
from app.models import User 
from flask_restful import Resource 

class Signup(Resource):
    def post(self):
        data=request.get_json()

        allowed_fields=["username","email","password"]
        password=data.get("password")
        password_confirmation=data.get("password_confirmation")


        if "username" in data and "email" in data and "password" in data and "password_confirmation" in data:

            if password != password_confirmation:
                return {"error":"passwords do not match"},401

            username_exists=User.query.filter(User.username == data["username"]).first()

            if username_exists:
                return {"error":"username already taken"},401
            email_exists=User.query.filter(User.email == data["email"]).first()

            if email_exists:
                return {"error":"email is already registered"},401
            password_hash=bcrypt.generate_password_hash(password).decode("utf-8")
            username=data["username"]
            email=data["email"]
            
            new_user=User(
                username=username,
                email=email,
                password=password_hash
            )
            db.session.add(new_user)
            db.session.commit()

            response=new_user.to_dict(rules=("-password",))

            return make_response(
                response,201
            )
        
        return {"error":"Provide all fields"}