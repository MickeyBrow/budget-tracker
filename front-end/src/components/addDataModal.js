'use client'

import './../componentStyles/addDataModal.css'
import { firebase_app, api_links} from '@/config';
import { useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'next/navigation'

const AddDataModal = ({ isOpen, onClose }) => {
  const [firstPage, setFirstPage] = useState(true);
  const [firstPageChoice, setFirstPageChoice] = useState();
  const [amountInvalid, setAmountInvalid] = useState(false);
  const [categoryInvalid, setCategoryInvalid] = useState(false);

  let router = useRouter();
  if (!isOpen) {
    return null;
  }

  const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] 
  var account_uid = ""
  let today = new Date()

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

  const secondPageChoiceSwitch = (choice) => {
    switch(choice) {
      case "Income":
        return (
          <>
            <input id="category"/>
          </>
        );
      case "Expense":
        return (
          <>
            <select id="category">
              <option value="">---</option>
              <option>Shopping</option>
              <option>Groceries</option>
              <option>Entertainment</option>
              <option>Eating Out</option>
              <option>Mortgage</option>
              <option>Water Bill</option>
              <option>Gas & Electric Bill</option>
              <option>HOA</option>
              <option>Internet</option>
              <option>Phone</option>
              <option>Cable</option>
              <option>Gas</option>
              <option>Car Insurance</option>
              <option>Life Insurance</option>
              <option>Credit Card</option>
            </select>
          </>
        );
      case "Other":
        return (
          <>
            <input id="category"/>
          </>
        );
    }
  };

  const amountCheck = () => {
    const str = document.getElementById('amount').value;

    if (str[0] != '$' || str.length <= 1 || str[str.length - 3] != '.') {
      setAmountInvalid(true);
      return;
    }
    var numCheck = str.slice(1).replace('.', '');
    numCheck = Number(numCheck);
    if (!Number.isInteger(numCheck)) {
      setAmountInvalid(true);
      return;
    }

    setAmountInvalid(false);
  }

  const firstPageContinue = () => {
    const choice = document.getElementById('choice');

    if (!choice.value) return;
    setFirstPageChoice(choice.value);
    setFirstPage(false);
  };

  const onSubmit = () => {
    const amount_choice = document.getElementById('amount').value;
    const category_choice = document.getElementById('category').value;
    const month_choice = document.getElementById('month').value;

    // Check to make sure amount has a $ at the beginning and only integers after
    if (!category_choice || !month_choice) {
      setCategoryInvalid(true);
      return;
    }
    else setCategoryInvalid(false);

    // Pass the values to firebase to get in the DB
    const onSubmitApiLink = api_links.data + `?uid=${account_uid}&table=${firstPageChoice}`
    fetch(onSubmitApiLink, {
      method: 'POST',
      body: JSON.stringify({
        amount: amount_choice,
        category: category_choice,
        month: month_choice,
        date: `${today.getMonth() + 1}-${today.getDate()}-${today.getFullYear()}`
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(() => {
      closeModal()
      window.location.reload()
    })
  }

  return (
    <div className="modalOverlay">
      <div className="modal">
        <div>
          <button className="closeButton" onClick={closeModal}>
            X
          </button>
          <h4>Add Data Modal</h4>
          <hr/>
        </div>
        <div className="modalContent">
          {firstPage ?
          <>
            <label>
              What type of input is this? <select id="choice">
                <option value="">---</option>
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
                <option value="Other">Other</option>
              </select>
            </label>
          </>
          : 
          <>
            <h4>{firstPageChoice}</h4>
            {amountInvalid ? 
            <p>Amount must have $ followed by digits with cents included. (i.e. $1.00)</p>
            :
            null
            }
            {categoryInvalid ? 
            <p>Select a category</p>
            :
            null
            }
            <label>
              Amount: <input id="amount" defaultValue="$" onChange={amountCheck}/>
            </label>
            <label style={{marginLeft: "10px"}}>
              Category: {secondPageChoiceSwitch(firstPageChoice)}
            </label>
            <label style={{marginLeft: "10px"}}>
              Month: <select id="month">
                <option value="">---</option>
                {monthList.map(function(month){
                  return <option key={month} value={month}>{month}</option>
                })}
              </select>
            </label>
          </>}
        </div>
        <div className="modalTail">
        {firstPage ?
          <button className="submitButton" onClick={firstPageContinue}>Continue</button>
          : 
          <button className="submitButton" onClick={onSubmit} disabled={amountInvalid && categoryInvalid}>Submit</button>
        }
        </div>
      </div>
    </div>
  );
};

export default AddDataModal;
