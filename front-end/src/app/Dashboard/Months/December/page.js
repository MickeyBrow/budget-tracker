"use client";

import 'chart.js/auto';
import './page.css'
import React, { useEffect, useState } from 'react';
import {Doughnut} from 'react-chartjs-2';

export default function December() {
  const account_uid = "seed"
  const getMonthDataLink = `http://127.0.0.1:5000/data?uid=${account_uid}&month=December`

  const [incomeData, setIncomeData] = useState()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchTableData = async () => {
      await fetch(getMonthDataLink)
      .then((response) => {return response.json()})
      .then((data) => {setIncomeData(data)})
    }

    setIsLoading(true)
    fetchTableData().catch(console.error)
    setIsLoading(false)
  },[])

  if (isLoading) return <p>Loading...</p>
  if (!incomeData) return <p>No Data for this Month Yet!</p>

  const income_amount_array = incomeData.Income_amount
  const income_category_array = incomeData.Income_category
  const expense_amount_array = incomeData.Expense_amount
  const expense_category_array = incomeData.Expense_category
  const bill_amount_array = incomeData.Bill_amount
  const bill_category_array = incomeData.Bill_category
  const ExpenseTotals = incomeData.Expense_totals

  console.log(ExpenseTotals)
  console.log(Object.keys(ExpenseTotals))
  console.log(Object.values(ExpenseTotals))
  const data = {
    labels: Object.keys(ExpenseTotals),
    datasets: [{
      data: Object.values(ExpenseTotals),
      backgroundColor: [
      'rgb(0,0,255)',
      'rgb(255,0,0)',
      'rgb(0,255,0)',
      'rgb(0,255,255)'
      ],
      hoverBackgroundColor: [
      'rgb(0,0,255)',
      'rgb(255,0,0)',
      'rgb(0,255,0)',
      'rgb(0,255,255)'
      ]
    }]
  };

  return (
    <>
      <h4>Overview:</h4>
      <div className="container">
        <div className="leftSide">
          <div className="table">
            <div className="title" style={{backgroundColor: "rgb(0, 128, 0)"}}>Income</div>
            <div className="header">
              <div className="table-cell">Amount</div>
              <div className="table-cell">Category</div>
            </div>
            {income_amount_array && income_amount_array.map((item, i) => {return (
              <>
                <div className='table-row'>
                  <div className="table-cell">{item}</div>
                  <div className="table-cell">{income_category_array[i]}</div>
                </div>
              </>
            )})}
          </div>
          <div className="table">
            <div className="title" style={{backgroundColor: "rgb(255, 0, 0)"}}>Expenses</div>
            <div className="header">
              <div className="table-cell">Amount</div>
              <div className="table-cell">Category</div>
            </div>
            {expense_amount_array && expense_amount_array.map((item, i) => {return (
              <>
                <div className='table-row'>
                  <div className="table-cell">{item}</div>
                  <div className="table-cell">{expense_category_array[i]}</div>
                </div>
              </>
            )})}
          </div>

          <div className="table">
            <div className="title" style={{backgroundColor: "rgb(106, 220, 220)"}}>Bills</div>
            <div className="header">
              <div className="table-cell">Amount</div>
              <div className="table-cell">Category</div>
            </div>
            {bill_amount_array && bill_amount_array.map((item, i) => {return (
              <>
                <div className='table-row'>
                  <div className="table-cell">{item}</div>
                  <div className="table-cell">{bill_category_array[i]}</div>
                </div>
              </>
            )})}
          </div>
        </div>
        <div className="rightSide">
          <Doughnut
          data={data}
          width={400}
          height={400}
          options={
            {
              plugins: {
                title: {
                  display: true,
                  text: "Expense Breakdown Over Month"
                }
              }
            }
          }
          />
        </div>
      </div>
    </>
  )
}
