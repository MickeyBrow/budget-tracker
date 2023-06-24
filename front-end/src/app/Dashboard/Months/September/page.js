"use client";

import 'chart.js/auto';
import './page.css'
import { firebase_app, api_links } from '@/config';
import React, { useEffect, useState } from 'react';
import {Doughnut} from 'react-chartjs-2';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'next/navigation'
import { BiTrash } from "react-icons/bi";

export default function September() {
  const [incomeData, setIncomeData] = useState()
  const [accountUid, setAccountUid] = useState()

  let router = useRouter();

  useEffect(() => {
    const apiCall = (uid) => {
      fetch(api_links.data + `?uid=${uid}&month=September`)
      .then((response) => response.json())
      .then((data) => {setIncomeData(data)})
    }
    const fetchTableData = () => {
      const auth = getAuth(firebase_app)
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setAccountUid(user.uid)
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
  const income_uid_array = incomeData.Income_uids
  const expense_amount_array = incomeData.Expense_amount
  const expense_category_array = incomeData.Expense_category
  const expense_date_array = incomeData.Expense_date
  const expense_uid_array = incomeData.Expense_uids
  const bill_amount_array = incomeData.Bill_amount
  const bill_category_array = incomeData.Bill_category
  const bill_date_array = incomeData.Bill_date
  const bill_uid_array = incomeData.Bill_uids
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

  const handleDelete = (table, uid, amount) => {
    const onDeleteApiCall = api_links.data + `?uid=${accountUid}&month=January`
    fetch(onDeleteApiCall, {
      method: 'DELETE',
      body: JSON.stringify({
        table: table,
        deleteUid: uid,
        amount: amount
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(() => {
      window.location.reload()
    })
  }

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
              <div className="table-cell">Delete</div>
            </div>
            {income_amount_array && income_amount_array.map((item, i) => {return (
              <>
                <div className='table-row'>
                  <div className="table-cell">{item}</div>
                  <div className="table-cell">{income_category_array[i]}</div>
                  <div className="table-cell">{income_date_array[i]}</div>
                  <button className="table-cell-delete" onClick={() => handleDelete("Income", income_uid_array[i], item)}><BiTrash/></button>
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
              <div className="table-cell">Delete</div>
            </div>
            {expense_amount_array && expense_amount_array.map((item, i) => {return (
              <>
                <div className='table-row'>
                  <div className="table-cell">{item}</div>
                  <div className="table-cell">{expense_category_array[i]}</div>
                  <div className="table-cell">{expense_date_array[i]}</div>
                  <button className="table-cell-delete" onClick={() => handleDelete("Expense", expense_uid_array[i], item)}><BiTrash/></button>
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
              <div className="table-cell">Delete</div>
            </div>
            {bill_amount_array && bill_amount_array.map((item, i) => {return (
              <>
                <div className='table-row'>
                  <div className="table-cell">{item}</div>
                  <div className="table-cell">{bill_category_array[i]}</div>
                  <div className="table-cell">{bill_date_array[i]}</div>
                  <button className="table-cell-delete" onClick={() => handleDelete("Bill", bill_uid_array[i], item)}><BiTrash/></button>
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
