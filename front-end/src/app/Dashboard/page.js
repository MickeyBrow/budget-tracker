import './page.css'

export default function Dashboard() {
  return (
    <>
      <h4>Summary:</h4>
      <div class="App">
        <table>
          <tr>
            <th>Total Income</th>
            <th>Total Expenses</th>
          </tr>
          <tr>
            <td>$400</td>
            <td>$200</td>
          </tr>
        </table>
        <table>
          <tr>
            <th>Expense Breakdown</th>
          </tr>
          <tr>
            <th>Amount</th>
            <th>Category</th>
          </tr>
          <tr>
            <td>$400</td>
            <td>Groceries</td>
          </tr>
          <tr>
            <td>$400</td>
            <td>Entertainment</td>
          </tr>
          <tr>
            <td>$400</td>
            <td>Bills</td>
          </tr>
          <tr>
            <td>$400</td>
            <td>Eating Out</td>
          </tr>
        </table>
      </div>
      <h4>Months below here:</h4>
      <div>All divs below here will be for the month cards</div>
    </>
  )
}
