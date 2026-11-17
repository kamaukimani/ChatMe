from flask import Flask 
from .db import db,migrate,bcrypt
from .config import Config
from .models import *
from .routes import * 
from flask_restful import Api

def create_app():

    app=Flask(__name__)
    app.config.from_object(Config)
    CORS(app,origins=["http://localhost:3000","http://127.0.0.1:3000"],supports_credentials=True)

    db.init_app(app)
    migrate.init_app(app,db)
    bcrypt.init_app(app)
    api=Api(app)

    api.add_resource(Signup,'/signup',endpoint="signup")

    return app