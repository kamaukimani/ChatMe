from app.db import db 
from app.models import User,Message,Contact
from faker import Faker 
from app import create_app
from flask_bcrypt import Bcrypt 

from random import choice as rc


app=create_app()
bcrypt=Bcrypt(app)


# with app.app_context():
#     try:
#         print("Deleting tables")
#         Message.query.delete()
#         User.query.delete()


#         fake=Faker()

#         print("Adding users")
        
#         users=[]

#         for i in range(20):

#             user=User(
#                 username=fake.unique.name(),
#                 email=fake.unique.email()
#             )
#             password=fake.password()
#             password_hash=bcrypt.generate_password_hash(password).decode("utf-8")
#             user.password=password_hash
            
#             users.append(user)
#         db.session.add_all(users)
#         db.session.flush()

#         print("Adding messages")
#         messages=[]
#         for i in range(100):

#             message=Message(
#                 body=fake.paragraph(nb_sentences=8),
#                 user=rc(users)
#             )
#             messages.append(message)

#         db.session.add_all(messages)

#         db.session.commit()

#         print("Seeding complete")
    

#     except Exception as e:
#         db.session.rollback()
#         print(f"Seeding failed: {e}")

fake = Faker()

def create_users():
    users=[]
    for _ in range(20):
        user=User(
            username=fake.unique.first_name(),
            email=fake.unique.email(),
        )
        password=fake.password()
        password_hash=bcrypt.generate_password_hash(password).decode("utf-8")
        user.password=password_hash
            
        users.append(user)
    return users

def create_contacts():
    contacts=[]
    for _ in range(10):
        contact=Contact(
            username=fake.unique.first_name(),
            email=fake.unique.email(),
        )
        password=fake.password()
        password_hash=bcrypt.generate_password_hash(password).decode("utf-8")
        contact.password=password_hash
            
        contacts.append(contact)
    return contacts

def create_messages(users,contacts):
    messages=[]
    for _ in range(100):
        message=Message(
            body=fake.paragraph(nb_sentences=8),
            user=rc(users),
            contact=rc(contacts),
        )
        messages.append(message)
    return messages

if __name__ == "__main__":

    with app.app_context():
        try:
            print("Deleting tables")
            Message.query.delete()
            User.query.delete()
            Contact.query.delete()


            print("Adding users...")
            users=create_users()
            db.session.add_all(users)
            db.session.flush()


            print("Adding contacts...")
            contacts=create_contacts()
            db.session.add_all(contacts)
            db.session.flush()


            print("Adding messages...")
            messages=create_messages(users,contacts)
            db.session.add_all(messages)

            db.session.commit()


            print("Seeding completed...")

        except Exception as e:
            db.session.rollback()
            print(f"Seeding failed: {e}")
