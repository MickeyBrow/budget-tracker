import firebase_admin
import uuid

from dotenv import load_dotenv
load_dotenv()

import os

from flask import Flask, request
from flask_cors import CORS
from firebase_admin import credentials, firestore

my_creds = {
  "type": os.environ.get("FIREBASE_ACCOUNT_TYPE"),
  "project_id": os.environ.get("FIREBASE_PROJECT_ID"),
  "private_key_id": os.environ.get("FIREBASE_PRIVATE_KEY_ID"),
  "private_key": os.environ.get("FIREBASE_PRIVATE_KEY").replace(r'\n', '\n'),
  "client_email": os.environ.get("FIREBASE_CLIENT_EMAIL"),
  "client_id": os.environ.get("FIREBASE_CLIENT_ID"),
  "auth_uri": os.environ.get("FIREBASE_AUTH_URI"),
  "token_uri": os.environ.get("FIREBASE_TOKEN_URI"),
  "auth_provider_x509_cert_url": os.environ.get("FIREBASE_AUTH_PROVIDER_X509_CERT_URL"),
  "client_x509_cert_url": os.environ.get("FIREBASE_CLIENT_X509_CERT_URL"),
  "universe_domain": os.environ.get("FIREBASE_UNIVERSE_DOMAIN")
}

cred = credentials.Certificate(my_creds)
app = firebase_admin.initialize_app(cred)
db = firestore.client()

##########################################################################
# helper funtions 

def formatMonthData(data):
  def helper(quad):
    return quad.split('/')

  for table in data:
    del data[table]['total']
    data[table] = list(map(helper, data[table].values()))
  
  return data

def totalPerExpenseCategory(data):
  response = {
    'Shopping': 0,
    'Groceries': 0,
    'Entertainment': 0,
    'Eating Out': 0,
    'Mortgage': 0,
    'Water Bill': 0,
    'Gas & Electric Bill': 0,
    'HOA': 0,
    'Internet': 0,
    'Phone': 0,
    'Cable': 0,
    'Gas': 0,
    'Car Insurance': 0,
    'Life Insurance': 0,
    'Credit Card': 0
  }

  for quad in data['Expense']:
    response[quad[1]] += float(quad[0][1:]) 
  
  return response

def formatDataResponse(data, ExpenseTotals):
  response = {
    'Income_amount': [],
    'Income_category': [],
    'Income_date': [],
    'Income_uids': [],
    'Expense_amount': [],
    'Expense_category': [],
    'Expense_date': [],
    'Expense_uids': [],
    'Other_amount': [],
    'Other_category': [],
    'Other_date': [],
    'Other_uids': [],
    'Expense_totals': ExpenseTotals,
  }

  for table in data:
    for quad in data[table]:
      response[f'{table}_amount'].append(quad[0])
      response[f'{table}_category'].append(quad[1])
      response[f'{table}_date'].append(quad[2])
      response[f'{table}_uids'].append(quad[3])
  
  return response

def formatSummaryData(data):
  for table in data:
    data[table] = data[table]['total']
  
  return data
##########################################################################

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
  current["amount/category/date/" + id] = data['amount'] + "/" + data['category'] + "/" + data['date'] + "/" + id
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

@app.route('/data', methods=['DELETE'])
def deleteData():
  uid, month = request.args.get('uid'), request.args.get('month')
  data = request.json

  field = db.field_path('amount/category/date/{}'.format(data['deleteUid']))

  temp_ref = db.collection(uid).document('Dashboard').collection(month).document(data['table'])
  temp_ref.update({
    'total': firestore.Increment(-float(data['amount'][1:])),
    field: firestore.DELETE_FIELD
  })
  
  return {}

@app.route('/dashboard', methods=['GET'])
def getDashboardData():
  uid = request.args.get('uid')
  
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  data = {}
  response = {}

  for month in months:
    temp_ref = db.collection(uid).document('Dashboard').collection(month)

    docs = temp_ref.stream()
    for doc in docs:
      data[doc.id] = doc.to_dict()
    
    data = formatMonthData(data)
    ExpenseTotals = totalPerExpenseCategory(data)
    response[month] = ExpenseTotals

  return response

@app.route('/signUp', methods=['POST'])
def createNewUser():
  data = request.json

  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  table = ['Income', 'Expense', 'Other']
  response = {}

  for month in months:
    temp_ref = db.collection(data['uid']).document('Dashboard').collection(month)

    for section in table:
      temp_ref.document(section).set({'total': 0})

  return response