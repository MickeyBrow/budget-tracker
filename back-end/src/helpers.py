def formatMonthData(data):
  def helper(pair):
    return pair.split('/')

  for table in data:
    del data[table]['total']
    data[table] = list(map(helper, data[table].values()))
  
  return data

def formatDataResponse(data):
  response = {
    'Income_amount': [],
    'Income_category': [],
    'Expense_amount': [],
    'Expense_category': [],
    'Bill_amount': [],
    'Bill_category': [],
  }

  for table in data:
    for pair in data[table]:
      response[f'{table}_amount'].append(pair[0])
      response[f'{table}_category'].append(pair[1])
  
  return response
