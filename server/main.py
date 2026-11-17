from app import create_app 

app=create_app()

@app.route('/welcome')
def index():

    return {"message":"Welcome to ChatMe API"},200