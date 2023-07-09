'use client'

import './../componentStyles/addInvestmentModal.css'
import { firebase_app, api_links} from '@/config';
import { useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'next/navigation'

const AddInvestmentsModal = ({ isOpen, onClose }) => {
  const [firstPage, setFirstPage] = useState(true);
  const [firstPageChoice, setFirstPageChoice] = useState();
  const [tickerInvalid, setTickerInvalid] = useState("");

  let router = useRouter();
  if (!isOpen) {
    return null;
  }

  var account_uid = ""

  const auth = getAuth(firebase_app)
  onAuthStateChanged(auth, (user) => {
    if (user) {
      account_uid = user.uid
    }
    else{
      router.push('/')
    }
  })

  const closeModal = () => {
    setFirstPage(true);
    onClose();
  };

  const firstPageContinue = () => {
    const choice = document.getElementById('choice');

    if (!choice.value) return;
    setFirstPageChoice(choice.value);
    setFirstPage(false);
  };

  const onSubmit = () => {
    const ticker = document.getElementById('ticker').value;
    const amount = document.getElementById('amount').value;
    const price = document.getElementById('price').value;
    const date = document.getElementById('date').value;

    const onSubmitApiLink = api_links.investment + `?uid=${account_uid}&table=${firstPageChoice}`
    fetch(onSubmitApiLink, {
      method: 'POST',
      body: JSON.stringify({
        ticker: ticker, 
        amount: amount, 
        price: price,
        date: date,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((data) => {
      if(Object.keys(data).length == 0){
        closeModal()
        window.location.reload()
      }
      else{
        setTickerInvalid(true)
      }
    })
  }

  return (
    <div className="modalOverlay">
      <div className="modal">
        <div>
          <button className="closeButton" onClick={closeModal}>
            X
          </button>
          <h4>Add Investment Modal</h4>
          <hr/>
        </div>
        <div className="modalContent">
          {firstPage ?
          <>
            <label>
              What type of input is this? <select id="choice">
                <option value="">---</option>
                <option value="Stock">Stock</option>
                {/* <option value="Crypto">Crypto</option> */}
              </select>
            </label>
          </>
          : 
          <>
            <h4>{firstPageChoice}</h4>
            {tickerInvalid ? 
              <p style={{'color': "red"}}>Invalid Ticker</p>
            :
              null
            }
            <label>
              Ticker: <input id="ticker" onChange={() => setTickerInvalid(false)}/>
            </label>
            <label>
              Amount: <input id="amount"/>
            </label>
            <label>
              Buy Price: <input id="price" defaultValue="$"/>
            </label>
            <label>
              Date: <input id="date" type='date'/>
            </label>
          </>}
        </div>
        <div className="modalTail">
        {firstPage ?
          <button className="submitButton" onClick={firstPageContinue}>Continue</button>
          : 
          <button className="submitButton" onClick={onSubmit} disabled={tickerInvalid}>Submit</button>
        }
        </div>
      </div>
    </div>
  );
};

export default AddInvestmentsModal;
