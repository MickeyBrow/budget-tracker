import './../componentStyles/addDataModal.css'

const AddDataModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modalOverlay">
      <div className="modal">
        <button className="closeButton" onClick={onClose}>
          Close
        </button>
        <div className="modalContent">{children}</div>
      </div>
    </div>
  );
};

export default AddDataModal;
