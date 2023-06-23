"use client";

import 'chart.js/auto';
import './page.css'
import { firebase_app, api_links } from '@/config';
import React, { useEffect, useState } from 'react';
import {Doughnut} from 'react-chartjs-2';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'next/navigation'

export default function January() {
  const [incomeData, setIncomeData] = useState()

  let router = useRouter();

  useEffect(() => {
    const apiCall = (uid) => {
      fetch(api_links.data + `?uid=${uid}&month=January`)
      .then((response) => response.json())
      .then((data) => {setIncomeData(data)})
    }
    const fetchTableData = () => {
      const auth = getAuth(firebase_app)
      onAuthStateChanged(auth, (user) => {
        if (user) {
          apiCall(user.uid)
        }
        else{
          router.push('/')
        }
      })
    }

    fetchTableData()
  },[])

  if (!incomeData) return <p>Loading...</p>

  const income_amount_array = incomeData.Income_amount
  const income_category_array = incomeData.Income_category
  const income_date_array = incomeData.Income_date
  const expense_amount_array = incomeData.Expense_amount
  const expense_category_array = incomeData.Expense_category
  const expense_date_array = incomeData.Expense_date
  const bill_amount_array = incomeData.Bill_amount
  const bill_category_array = incomeData.Bill_category
  const bill_date_array = incomeData.Bill_date
  const ExpenseTotals = incomeData.Expense_totals

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
              <div className="table-cell">Date</div>
            </div>
            {income_amount_array && income_amount_array.map((item, i) => {return (
              <>
                <div className='table-row'>
                  <div className="table-cell">{item}</div>
                  <div className="table-cell">{income_category_array[i]}</div>
                  <div className="table-cell">{income_date_array[i]}</div>
                </div>
              </>
            )})}
          </div>
          <div className="table">
            <div className="title" style={{backgroundColor: "rgb(255, 0, 0)"}}>Expenses</div>
            <div className="header">
              <div className="table-cell">Amount</div>
              <div className="table-cell">Category</div>
              <div className="table-cell">Date</div>
            </div>
            {expense_amount_array && expense_amount_array.map((item, i) => {return (
              <>
                <div className='table-row'>
                  <div className="table-cell">{item}</div>
                  <div className="table-cell">{expense_category_array[i]}</div>
                  <div className="table-cell">{expense_date_array[i]}</div>
                </div>
              </>
            )})}
          </div>

          <div className="table">
            <div className="title" style={{backgroundColor: "rgb(106, 220, 220)"}}>Bills</div>
            <div className="header">
              <div className="table-cell">Amount</div>
              <div className="table-cell">Category</div>
              <div className="table-cell">Date</div>
            </div>
            {bill_amount_array && bill_amount_array.map((item, i) => {return (
              <>
                <div className='table-row'>
                  <div className="table-cell">{item}</div>
                  <div className="table-cell">{bill_category_array[i]}</div>
                  <div className="table-cell">{bill_date_array[i]}</div>
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
