"use client";

import 'chart.js/auto';
import './page.css'
import React, {useState, useEffect } from 'react';
import {Doughnut, Bar, Line} from 'react-chartjs-2';
import AddModuleModal from '@/components/addModuleModal';

export default function Dashboard() {
  const account_uid = "seed"
  const getSummaryDataLink = `http://127.0.0.1:5000/dashboard?uid=${account_uid}`
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  
  const lineData = {
    'Groceries': [],
    'Entertainment': [],
    'Eating Out': []
  }

  var groceries_sum = 0, entertainment_sum = 0, eating_out_sum = 0
  
  const [isOpen, setIsOpen] = useState(false);
  const [response, setResponse] = useState();

  useEffect(() => {
    const fetchTableData = async () => {
      await fetch(getSummaryDataLink)
      .then((response) => {return response.json()})
      .then((data) => {setResponse(data)})
    }

    fetchTableData().catch(console.error)
  },[])


  if(!response){
    return <p>Broken.</p>
  }
  else {
    months.map((month) => {
      lineData['Groceries'].push(response[month]['Groceries'])
      groceries_sum += response[month]['Groceries']

      lineData['Entertainment'].push(response[month]['Entertainment'])
      entertainment_sum += response[month]['Entertainment']

      lineData['Eating Out'].push(response[month]['Eating Out'])
      eating_out_sum += response[month]['Eating Out']
    })
  }  

  const data = {
    labels: ["Groceries", "Entertainment", "Eating Out"],
    datasets: [{
      data: [groceries_sum, entertainment_sum, eating_out_sum],
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

  const line_data = {
    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    datasets: [
      {
      label: 'Groceries',
      data: lineData['Groceries'],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
      },
      {
        label: 'Entertainment',
        data: lineData['Entertainment'],
        fill: false,
        borderColor: 'rgb(20, 100, 192)',
        tension: 0.1
      },
      {
        label: 'Eating Out',
        data: lineData['Eating Out'],
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
                    text: "Expense Breakdown Over Year"
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
                    text: "Expense Breakdown Per Month"
                  }
                }
              }
            }
          />
        </div>
      </div>
      {/* <hr style={{marginTop: "30px"}}/>
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
      </div> */}
    </>
  )
}
