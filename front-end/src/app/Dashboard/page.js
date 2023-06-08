"use client";

import 'chart.js/auto';
import './page.css'
import React, {useState} from 'react';
import {Doughnut, Bar, Line} from 'react-chartjs-2';
import AddModuleModal from '@/components/addModuleModal';

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);

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

  const bar_data = {
    labels: ["Janurary", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    datasets: [{
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

  const line_data = {
    labels: ["Janurary", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    datasets: [
      {
      label: 'Groceries',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
      },
      {
        label: 'Entertainment',
        data: [99, 0, 80, 81, 5, 100, 40],
        fill: false,
        borderColor: 'rgb(20, 100, 192)',
        tension: 0.1
      },
      {
        label: 'Bills',
        data: [17, 0, 5, 81, 53, 17, 90],
        fill: false,
        borderColor: 'rgb(90, 7, 195)',
        tension: 0.1
      },
      {
        label: 'Eating Out',
        data: [90, 10, 85, 41, 53, 7, 90],
        fill: false,
        borderColor: 'rgb(190, 87, 195)',
        tension: 0.1
      }
    ]
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const onSubmitClick = () => {
    console.log("yay");
  };
  
  return (
    <>
      <h4>Overview:</h4>
      <div className="head">
        <div className="leftSide">
          <Doughnut
            data={data}
            width={400}
            height={400}
            options={
              {
                plugins: {
                  title: {
                    display: true,
                    text: "Expense Breakdown"
                  }
                }
              }
            }
          />
        </div>
        <div className="rightSide">
          <Line
            data={line_data}
            width={400}
            height={400}
            options={
              {
                plugins: {
                  title: {
                    display: true,
                    text: "Expense Breakdown"
                  }
                }
              }
            }
          />
        </div>
      </div>
      <hr style={{marginTop: "30px"}}/>
      <div className="topbar">
          <a onClick={openModal}>+</a>
          <AddModuleModal isOpen={isOpen} onClose={closeModal} onSubmit={onSubmitClick}>
            <h2>Add Module:</h2>
            <hr/>
          </AddModuleModal>
        </div>
      <div className="container">
        <h4>Working here</h4>
        <h4>Working here</h4>
        <h4>Working here</h4>
      </div>
    </>
  )
}
