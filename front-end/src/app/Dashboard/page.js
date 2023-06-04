import './page.css'

export default function Dashboard() {
  return (
    <>
      <div>
        <div class="card">
          <div class="head">
            <h4><b>$400</b></h4>
          </div>
          <div class="container">
            <h4><b>Income</b></h4>
          </div>
        </div>
        <div class="card">
          <div class="head">
            <h4><b>$200</b></h4>
          </div>
          <div class="container">
            <h4><b>Expenses</b></h4>
          </div>
        </div>
      </div>
      <div>All divs below here will be for the month cards</div>
    </>
  )
}
