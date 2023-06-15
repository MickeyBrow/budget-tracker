def formatMonthData(data):
  def helper(pair):
    return pair.split('/')

  for table in data:
    del data[table]['total']
    data[table] = list(map(helper, data[table].values()))
  
  return data

def totalPerExpenseCategory(data):
  response = {
    'Groceries': 0,
    'Entertainment': 0,
    'Eating Out': 0,
  }

  for pair in data['Expense']:
    response[pair[1]] += float(pair[0][1:]) 
  
  return response

def formatDataResponse(data, ExpenseTotals):
  response = {
    'Income_amount': [],
    'Income_category': [],
    'Expense_amount': [],
    'Expense_category': [],
    'Bill_amount': [],
    'Bill_category': [],
    'Expense_totals': ExpenseTotals,
  }

  for table in data:
    for pair in data[table]:
      response[f'{table}_amount'].append(pair[0])
      response[f'{table}_category'].append(pair[1])
  
  return response

def formatSummaryData(data):
  for table in data:
    data[table] = data[table]['total']
  
  return data