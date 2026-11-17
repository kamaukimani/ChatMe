from dotenv import load_dotenv 
import os 
load_dotenv()

class Config:
    SQLALCHEMY_DATABASE_URI=os.gentenv("DATABASE_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS=False
    SECRET_KEY=os.getenv("SECRET_KEY")