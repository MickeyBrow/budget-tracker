import './../componentStyles/addDataModal.css'
import { useState } from 'react';

const AddDataModal = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  const [firstPage, setFirstPage] = useState(true);
  const [firstPageChoice, setFirstPageChoice] = useState();
  const [amountInvalid, setAmountInvalid] = useState(false);
  const [categoryInvalid, setCategoryInvalid] = useState(false);

  const closeModal = () => {
    setFirstPage(true);
    onClose();
  };

  const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] 
  const account_uid = "seed"

  const secondPageChoiceSwitch = (choice) => {
    switch(choice) {
      case "Income":
        return (
          <>
            <option value="">---</option>
            <option>Paycheck</option>
          </>
        );
      case "Expense":
        return (
          <>
            <option value="">---</option>
            <option>Groceries</option>
            <option>Entertainment</option>
            <option>Eating Out</option>
          </>
        );
      case "Bill":
        return (
          <>
            <option value="">---</option>
            <option>Mortgage</option>
            <option>Water & Gas</option>
            <option>Electric</option>
            <option>HOA</option>
            <option>Internet</option>
            <option>Phone</option>
            <option>Cable</option>
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
    var numCheck = str.slice(1);
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
    const onSubmitApiLink = `http://127.0.0.1:5000/data?uid=${account_uid}&table=${firstPageChoice}`
    fetch(onSubmitApiLink, {
      method: 'POST',
      body: JSON.stringify({
        amount: amount_choice,
        category: category_choice,
        month: month_choice
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    closeModal();
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
                <option value="Bill">Bill</option>
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
              Category: <select id="category">
                {secondPageChoiceSwitch(firstPageChoice)}
              </select>
            </label>
            <label style={{marginLeft: "10px"}}>
              Month: <select id="month">
                <option value="">---</option>
                {monthList.map(function(month){
                  return <option value={month}>{month}</option>
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
