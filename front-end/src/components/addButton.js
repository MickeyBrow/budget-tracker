'use client'

import './../componentStyles/addButton.css'
import AddDataModal from './addDataModal';
import { useState } from 'react';

const AddButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('')

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
    <div className="topnav">
      <a onClick={openModal}>Add Data</a>
      <AddDataModal isOpen={isOpen} onClose={closeModal} onSumbit={onSubmitClick}>
        <h2>What Data Would you like to add?</h2>
        <hr/>
        <label>
          Amount: <input defaultValue="$" onChange={(e) => {setAmount(e.target.value)}}></input>
        </label>
        <label style={{paddingLeft: "5px"}}>
          Category: <select onChange={(e) => {setCategory(e.target.value)}}>
            <option>1</option>
          </select>
        </label>
      </AddDataModal>

    </div>
  );
};

export default AddButton;