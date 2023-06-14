def formatMonthData(data):
    def helper(pair):
      return pair.split('/')

    for table in data:
      del data[table]['total']
      data[table] = list(map(helper, data[table].values()))
    
    return data