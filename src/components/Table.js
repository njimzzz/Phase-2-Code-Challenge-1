import React, {useState} from "react";

function Table() {
const [searchQuery , setSearchQuery] = useState("")
const [expenses , setExpenses] = useState([
    {
        date: "2024-12-14",
        description: "Paycheck from Flatiron school",
        category :"Income",
        amount :100000,
    },
    {

        date: "2024-12-18",
        description: "Paycheck of Tax",
        category :"Tax",
        amount :30000,
    
    },
    {
        date: "2024-12-21",
        description: "Payment to Bob's burgers",
        category: "Food",
        amount: 12000,
      },
      {
        date: "2024-12-26",
        description: "Paycheck from Flatiron Construction",
        category: "Income",
        amount: 11000,
      },
      {
        date: "2024-12-28",
        description: "Payment of UberX",
        category: "Transport",
        amount: 19000,
      },
      {
        date: "2024-12-31",
        description: "Payment to Flatiron Decorators",
        category: "Entertainment",
        amount: 75000,
      },
    ]);
  
    const [sortOrder, setSortOrder] = useState(null);
  
    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
    };
  
    let handleSort = ((key) => {
      if (sortOrder === key) {
        setExpenses([...expenses].reverse());
      } else {
        const sortedExpenses = [...expenses].sort((a, b) => {
          if (a[key] < b[key]) return -1;
          if (a[key] > b[key]) return 1;
          return 0;
        });
        setExpenses(sortedExpenses);
      }
  
      setSortOrder(key);
    });
  
    let filteredExpenses = expenses.filter((expense) =>
      expense.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    const addExpense = (newExpense) => {
      setExpenses([...expenses, newExpense]);
    };
  
    return (
      <div>
        <div className="Header">
          <h1>The Royal Bank Of Flatiron</h1>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search expenses by description"
        />
        <AddExpenseForm addExpense={addExpense} />
        <div className="Table">
          <table>
            <thead>
              <tr>
                <th onClick={() => handleSort("date")}>Date</th>
                <th onClick={() => handleSort("description")}>Description</th>
                <th onClick={() => handleSort("category")}>Category</th>
                <th onClick={() => handleSort("amount")}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((expense, index) => (
                <tr key={index}>
                  <td>{expense.date}</td>
                  <td>{expense.description}</td>
                  <td>{expense.category}</td>
                  <td>{expense.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}
  
  function AddExpenseForm({ addExpense }) {
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const newExpense = {
        date,
        description,
        category,
        amount: parseFloat(amount),
      };
      addExpense(newExpense);
      setDate("");
      setDescription("");
      setCategory("");
      setAmount("");
    };
  
    return (
        <div className="table">
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Date"
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          required
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          required
        />
        <button type="submit">Submit New Expense</button>
      </form>
      </div>
    );
  }
  export default Table