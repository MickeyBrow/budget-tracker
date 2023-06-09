'use client'

import './../componentStyles/addButton.css'
import AddDataModal from './addDataModal';
import { useState } from 'react';

const AddButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="topnav">
      <a onClick={openModal}>Add Data</a>
      <AddDataModal isOpen={isOpen} onClose={closeModal}/>
    </div>
  );
};

export default AddButton;