"use client";

import 'chart.js/auto';
import './page.css'
import React from 'react';
import {Doughnut} from 'react-chartjs-2';

export default function September() {
  const data = {
    labels: [
      'Red',
      'Green',
      'Yellow'
    ],
    datasets: [{
      data: [300, 50, 100],
      backgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
      ],
      hoverBackgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
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
          />
          <Doughnut
            data={data}
            width={400}
            height={400}
          />
        </div>
      </div>
    </>
  )
}
