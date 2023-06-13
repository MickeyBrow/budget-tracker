"use client";

import 'chart.js/auto';
import './page.css'
import React, { useEffect } from 'react';
import {Doughnut} from 'react-chartjs-2';

export default function Janurary() {
  const getMonthDataLink = `http://127.0.0.1:5000/data?uid=3&table=${firstPageChoice}`
  
  useEffect(() => {
    fetch(getMonthDataLink)
  },[])
  const data = {
    labels: ["Groceries", "Entertainment", "Bills", "Eating Out"],
    datasets: [{
      data: [300, 50, 100, 20],
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
          </div>

          <div className="table">
            <div className="title" style={{backgroundColor: "rgb(255, 0, 0)"}}>Expenses</div>
            <div className="header">
              <div className="table-cell">Amount</div>
              <div className="table-cell">Category</div>
            </div>
          </div>

          <div className="table">
            <div className="title" style={{backgroundColor: "rgb(106, 220, 220)"}}>Bills</div>
            <div className="header">
              <div className="table-cell">Amount</div>
              <div className="table-cell">Category</div>
            </div>
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
