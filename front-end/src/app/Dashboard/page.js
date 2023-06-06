"use client";

import 'chart.js/auto';
import './page.css'
import React from 'react';
import {Doughnut} from 'react-chartjs-2';

export default function Dashboard() {
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
      <h4>Summary:</h4>
      <div className="head">
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
      <div className="border"></div>
      <div className="container">
        <div className="topbar">
          <a>+</a>
        </div>
      </div>
    </>
  )
}
