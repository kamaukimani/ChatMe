from flask import Flask 
from .db import db,migrate,bcrypt
from .config import Config
from .models import *
from .routes import * 
from flask_restful import Api
from flask_cors import CORS

def create_app():

    app=Flask(__name__)
    app.config.from_object(Config)
    CORS(app,origins=["http://localhost:3000","http://127.0.0.1:3000","http://10.85.238.96:3000"],supports_credentials=True)

    db.init_app(app)
    migrate.init_app(app,db)
    bcrypt.init_app(app)
    api=Api(app)

    api.add_resource(Signup,'/signup',endpoint="signup")
    api.add_resource(Login,'/login',endpoint="login")
    api.add_resource(CheckSession,'/check_session',endpoint="check_session")
    api.add_resource(Logout,'/logout',endpoint="logout")
    api.add_resource(Messages,'/messages',endpoint="messages")
    api.add_resource(MessagesByUser,'/messages/user/<int:id>',endpoint="message_by_user")
    api.add_resource(Profile,'/profile/<int:id>',endpoint="profile")
    api.add_resource(MessageById,'/messages/<int:id>',endpoint="message_by_id")

    return app
