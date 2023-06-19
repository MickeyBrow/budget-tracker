"use client";

import 'chart.js/auto';
import './page.css'
import firebase_app from '@/config';
import React, {useState, useEffect } from 'react';
import {Doughnut, Bar, Line} from 'react-chartjs-2';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'next/navigation'
import AddModuleModal from '@/components/addModuleModal';

export default function Dashboard() {
  let router = useRouter();
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
    if (!response){
      const fetchTableData = (uid) => {
        fetch(`http://127.0.0.1:5000/dashboard?uid=${uid}`)
        .then((response) => response.json())
        .then((data) => setResponse(data))
      }
  
      const checkUser = () => {
        const auth = getAuth(firebase_app)
        onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in
            fetchTableData(user.uid)
            // Perform actions for authenticated user
          } else {
            // User is signed out
            router.push('/')
            // Perform actions for non-authenticated user
          }
        })
      }

      checkUser()
    }
  },[])


  if(!response){
    return <p>Loading..</p>
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
