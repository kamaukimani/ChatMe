from flask import session,request,make_response 
from app.db import db ,bcrypt
from app.models import User 
from flask_restful import Resource 

class Signup(Resource):
    def post(self):
        data=request.get_json()

        required_fields=["username","email","password","password_confirmation"]
        password=data.get("password")
        password_confirmation=data.get("password_confirmation")


        #if "username" in data and "email" in data and "password" in data and "password_confirmation" in data:
        if not all(data.get(field) for field in required_fields):
            return {"error":"Provide all fields"},400

        if password != password_confirmation:
            return {"error":"passwords do not match"},400

        username_exists=User.query.filter(User.username == data["username"]).first()

        if username_exists:
            return {"error":"username already taken"},409
        email_exists=User.query.filter(User.email == data["email"]).first()

        if email_exists:
            return {"error":"email is already registered"},409
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
        
class Login(Resource):
    def post(self):
        data=request.get_json()

        required_fields=["email","password"]

        if not all(data.get(field) for field in required_fields):
            return {"error":"All fields are required"},400
        user=User.query.filter(User.email == data["email"]).first()

        if user is None:
            return {"error":"Invalid password or email"},422
        password=data.get("password")
        password_check=bcrypt.check_password_hash(user.password,password)

        if password_check:
            session["user_id"]=user.id 
            response=user.to_dict(rules=("-password","-received_messages","-sent_messages",))
            

            return make_response(
                response,
                200
            )
        return {"error":"Invalid password or email"},422

class CheckSession(Resource):
    def get(self):
        
        if  not session.get("user_id"):
            return {"message":"Unauthorized"},401
        user=User.query.filter_by(id = session["user_id"]).first()

        response=user.to_dict(rules=("-password","-received_messages","-sent_messages",))

        return make_response(
            response,
            200
        )

class Logout(Resource):
    def delete(self):
        # session["user_id"]=None
        session.clear()

        return {},204

class Profile(Resource):
    def get(self,id):

        user=User.query.filter_by(id=id).first()

        if user is None:
            return {"error":"Ooops!The record does not exist..."},404
        response = user.to_dict(rules=("-password","-messages",))

        return make_response(
            response,
            200
        )




    def patch(self,id):
        user=User.query.filter_by(id=id).first()

        if user is None:
            return {"error":"Unauthorized"},401

        data=request.get_json()
        allowed_fields=["username","password"]

        username=data.get("username")
        password=data.get("password")


        for attr in data:
            value = data[attr]
            if not value:
                return {"error":"Field should not be empty"},409
            if attr in allowed_fields:
                if attr is password:
                    password_hash=bcrypt.generate_password_hash(value).decode("utf-8")
                    user.password=password_hash
                setattr(user,attr,value)
        db.session.commit()

        response=user.to_dict()

        return make_response(
            response,
            200
        )
class AddUser(Resource):
    def post(self):
        data=request.get_json()
        username=data.get("username")

        user = User.query.filter_by(username = username).first()
        if not user:
            return {"error":"User not found"},404
        response= user.to_dict(rules=("-received_messages","-sent_messages",))
        return make_response(
            response,
            200
        )
    


