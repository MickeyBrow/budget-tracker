"use client";

import 'chart.js/auto';
import './page.css'
import { firebase_app, api_links} from '@/config';
import React, {useState, useEffect } from 'react';
import {Doughnut, Bar, Line} from 'react-chartjs-2';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'next/navigation'
import AddModuleModal from '@/components/addModuleModal';
import { Legend } from 'chart.js/auto';

export default function Dashboard() {
  let router = useRouter();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  
  const lineData = {
    'Shopping': [],
    'Groceries': [],
    'Entertainment': [],
    'Eating Out': [],
    'Mortgage': [],
    'Water Bill': [],
    'Gas & Electric Bill': [],
    'HOA': [],
    'Internet': [],
    'Phone': [],
    'Cable': [],
    'Gas': [],
    'Car Insurance': [],
    'Life Insurance': [],
    'Credit Card': []
  }

  var groceries_sum = 0, entertainment_sum = 0, eating_out_sum = 0
  
  const [isOpen, setIsOpen] = useState(false);
  const [response, setResponse] = useState();

  useEffect(() => {
    if (!response){
      const fetchTableData = (uid) => {
        fetch(api_links.dashboard + `?uid=${uid}`)
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
      Object.keys(lineData).forEach(element => {
        lineData[element].push(response[month][element])
      })
    })
  }  

  const data = {
    labels: Object.keys(lineData),
    datasets: [{
      data: Object.keys(lineData).map(key => lineData[key].reduce((partialSum, a) => partialSum + a, 0)),
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
    datasets: Object.keys(lineData).map(key => {
      return (
        {
          label: key,
          data: lineData[key],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }
      )
    })
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
                  },
                  legend: {
                    display: false
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
                  },
                  legend: {
                    display: false
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
