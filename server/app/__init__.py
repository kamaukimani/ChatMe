from flask import Flask 
from .db import db,migrate

def create_app():

    app=Flask(__name__)

    db.init_app(app)
    migrate.init_app(app,db)

    return app