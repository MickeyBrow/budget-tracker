'use client'

import './page.css'
import { firebase_app, api_links} from '@/config';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'next/navigation'
import { BiTrash } from "react-icons/bi";

export default function Investments() {
  const [stockData, setStockData] = useState();
  const [accountUid, setAccountUid] = useState();
  let router = useRouter();

  useEffect(() => {
    const apiCall = (uid) => {
      fetch(api_links.investment + `?uid=${uid}`)
      .then((response) => response.json())
      .then((data) => {setStockData(data)})
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

  const handleDelete = (table, uid) => {
    const onDeleteApiCall = api_links.investment + `?uid=${accountUid}`
    fetch(onDeleteApiCall, {
      method: 'DELETE',
      body: JSON.stringify({
        table: table,
        deleteUid: uid,
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
      <div className="container">
        <div className="leftSide">
          <h4>Stocks:</h4>
          {stockData && Object.values(stockData).map(stock => {return (
              <>
                <div className="cardHeader">
                  <p>Date</p>
                  <p>Ticker</p>
                  <p>Amount</p>
                  <p>Buy Price</p>
                </div>
                <div className="card">
                  <p>{stock['date']}</p>
                  <p>{stock['ticker']}</p>
                  <p>{stock['amount']}</p>
                  <p>{stock['price']}</p>
                  <button className="deleteStockButton" onClick={() => handleDelete("Stock", stock['uid'])}><BiTrash/></button>
                </div>
              </>
            )})}
        </div>
        <div className="rightSide">
        </div>
      </div>
    </>
  )
}
