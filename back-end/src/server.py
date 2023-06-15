import firebase_admin
import uuid

from helpers import *
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
  uid, table = request.args.get('uid'), request.args.get('table')
  data = request.json

  temp_ref = db.collection(uid).document('Dashboard').collection(data['month']).document(table)

  current = temp_ref.get()
  if current.exists:
    current = current.to_dict()
  else:
    current = {}

  id = str(uuid.uuid4())
  current["amount/category/" + id] = data['amount'] + "/" + data['category']
  temp_ref.set(current)

  temp_ref.update({'total': firestore.Increment(float(data['amount'][1:]))})

  return {}

@app.route('/data', methods=['GET'])
def getData():
  # This will be where we get the data for a specific month. Need a param here in the url so I can see what months data needs to be grabbed
  uid, month = request.args.get('uid'), request.args.get('month')

  data = {}

  temp_ref = db.collection(uid).document('Dashboard').collection(month)
  docs = temp_ref.stream()
  for doc in docs:
    data[doc.id] = doc.to_dict()
  
  data = formatMonthData(data)
  ExpenseTotals = totalPerExpenseCategory(data)
  data = formatDataResponse(data, ExpenseTotals)

  return data

@app.route('/dashboard', methods=['GET'])
def getDashboardData():
  # This will be where we get the data for a specific month. Need a param here in the url so I can see what months data needs to be grabbed
  uid = request.args.get('uid')
  
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  data = {}
  response = {}

  for month in months:
    temp_ref = db.collection(uid).document('Dashboard').collection(month)

    docs = temp_ref.stream()
    for doc in docs:
      data[doc.id] = doc.to_dict()
    
    data = formatSummaryData(data)
    response[month] = data

  return response