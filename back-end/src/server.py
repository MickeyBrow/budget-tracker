import firebase_admin
import uuid
from flask import Flask, request
from flask_cors import CORS
from firebase_admin import credentials, firestore

cred = credentials.Certificate("../secrets/serviceAccountKey.json")
app = firebase_admin.initialize_app(cred)
db = firestore.client()



app = Flask(__name__)
CORS(app)

@app.route('/')
def server():
  return {"data": "Hello, World"}

@app.route('/data', methods=['POST'])
def addData():
  # Need to add the data that is being passed here. 
  uid, table = request.args.get('uid'), request.args.get('table')
  data = request.json
  print(data)
  temp_ref = db.collection(uid).document('Dashboard').collection(data['month']).document(table)

  current = temp_ref.get()
  if current.exists:
    current = current.to_dict()
  else:
    current = {}

  id = str(uuid.uuid4())
  current["amount/category/" + id] = data['amount'] + "/" + data['category']
  temp_ref.set(current)

  return {}

@app.route('/data', methods=['GET'])
def getData():
  # This will be where we get the data for a specific month. Need a param here in the url so I can see what months data needs to be grabbed
  return 'Hello, World!'