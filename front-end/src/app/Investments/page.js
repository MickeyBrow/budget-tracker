'use client'

import './page.css'
import { firebase_app, api_links} from '@/config';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'next/navigation'
import { BiTrash } from "react-icons/bi";

export default function Investments() {
  const [stockData, setStockData] = useState();
  const [cryptoData, setCryptoData] = useState();
  const [accountUid, setAccountUid] = useState();
  let router = useRouter();

  useEffect(() => {
    const apiCall = (uid) => {
      fetch(api_links.investment + `?uid=${uid}`)
      .then((response) => response.json())
      .then((data) => {
        setStockData(data['stock'])
        setCryptoData(data['crypto'])
      })
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

  const handleWhatIf = (stock) => {
    if (stock['currentPrice'] == "no data"){
      return(
        <>
          <p>N/A</p>
        </>
      )
    }
    const price = stock['price'].replace('$', '')
    const current_have = parseFloat(stock['amount']) * parseFloat(price)
    const whatIfPrice = parseFloat(stock['amount']) * parseFloat(stock['currentPrice'])

    if(current_have > whatIfPrice){
      const value = current_have - whatIfPrice
      return (
        <>
          <p style={{'color': "green"}}>+${value.toString()}</p>
        </>
      )
    }
    else{
      const value = whatIfPrice - current_have
      return (
        <>
          <p style={{'color': "red"}}>-${value.toString()}</p>
        </>
      )
    }
  }

  if (!stockData || !cryptoData) return <p style={{'marginLeft': "160px"}}>Loading...</p>

  return (
    <>
      <div className="container">
        <div className="leftSide">
          <h4>Stocks:</h4>
          {stockData && Object.values(stockData).map(stock => {return (
              <>
                <div className="cardHeader">
                  <p>Date Bought</p>
                  <p>Ticker</p>
                  <p>Amount</p>
                  <p>Buy Price</p>
                  <p>If sold today</p>
                </div>
                <div className="card">
                  <p>{stock['date']}</p>
                  <p>{stock['ticker']}</p>
                  <p>{stock['amount']}</p>
                  <p>{stock['price']}</p>
                  <p>{handleWhatIf(stock)}</p>
                  <button className="deleteStockButton" onClick={() => handleDelete("Stock", stock['uid'])}><BiTrash/></button>
                </div>
              </>
            )})}
        </div>
        <div className="rightSide">
        <h4>Crypto:</h4>
          {cryptoData && Object.values(cryptoData).map(crypto => {return (
              <>
                <div className="cardHeader">
                  <p>Date Bought</p>
                  <p>Ticker</p>
                  <p>Amount</p>
                  <p>Buy Price</p>
                  <p>If sold today</p>
                </div>
                <div className="card">
                  <p>{crypto['date']}</p>
                  <p>{crypto['ticker']}</p>
                  <p>{crypto['amount']}</p>
                  <p>{crypto['price']}</p>
                  <p>{handleWhatIf(crypto)}</p>
                  <button className="deleteStockButton" onClick={() => handleDelete("Crypto", crypto['uid'])}><BiTrash/></button>
                </div>
              </>
            )})}
        </div>
      </div>
    </>
  )
}
