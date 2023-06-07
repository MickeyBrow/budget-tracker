"use client";

import 'chart.js/auto';
import './page.css'
import React from 'react';
import {Doughnut, Bar} from 'react-chartjs-2';

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

  const bar_data = {
    labels: ["Janurary", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    datasets: [{
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }]
  };
  
  return (
    <>
      <h4>Overview:</h4>
      <div className="head">
        <Doughnut
          data={data}
          width={400}
          height={400}
        />
        <Bar
          data={bar_data}
          width={400}
          height={400}
        />
      </div>
      <div className="border"></div>
      <div className="topbar">
          <a>+</a>
        </div>
      <div className="container">
        <h4>Working here</h4>
        <h4>Working here</h4>
        <h4>Working here</h4>
      </div>
    </>
  )
}
