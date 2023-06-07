import './../componentStyles/bottomNavBar.css'
const BottomNavBar = () => {
  return (
    <div className="bottomnav">
      <a href="/Dashboard" className="active">Summary</a>
      <a href="/Dashboard/Months/Janurary">Janurary</a>
      <a href="/Dashboard/Months/Feburary">Feburary</a>
      <a href="/Dashboard/Months/March">March</a>
      <a href="/Dashboard/Months/April">April</a>
      <a href="/Dashboard/Months/May">May</a>
      <a href="/Dashboard/Months/June">June</a>
      <a href="/Dashboard/Months/July">July</a>
      <a href="/Dashboard/Months/August">August</a>
      <a href="/Dashboard/Months/September">September</a>
      <a href="/Dashboard/Months/October">October</a>
      <a href="/Dashboard/Months/November">November</a>
      <a href="/Dashboard/Months/December">December</a>
    </div>
  );
};

export default BottomNavBar;