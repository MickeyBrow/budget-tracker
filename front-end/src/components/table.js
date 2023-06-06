import '../componentStyles/table.css'; // Import CSS file for styling

const TableLayout = () => {
  return (
    <div className="table-container">
      <div className="table-row">
        <div className="table-cell">Cell 1</div>
        <div className="table-cell">Cell 2</div>
        <div className="table-cell">Cell 3</div>
      </div>
      <div className="table-row">
        <div className="table-cell">Cell 4</div>
        <div className="table-cell">Cell 5</div>
        <div className="table-cell">Cell 6</div>
      </div>
    </div>
  );
};

export default TableLayout;
