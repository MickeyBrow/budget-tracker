import './../componentStyles/addDataModal.css'

const AddDataModal = ({ isOpen, onClose, onSubmit, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modalOverlay">
      <div className="modal">
        <button className="closeButton" onClick={onClose}>
          X
        </button>
        <div className="modalContent">{children}</div>
        <button className="submitButton" onClick={onSubmit}>
          Sumbit
        </button>
      </div>
    </div>
  );
};

export default AddDataModal;
