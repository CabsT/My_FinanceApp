import React from 'react';

const ExpenseTable = ({ expense }) => {
  return (
    <div>
      <h2>Expense</h2>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount in Rand</th>
          </tr>
        </thead>
        <tbody>
          {expense.map((expenseItem) => (
            <tr key={expenseItem.id}>
              <td>{expenseItem.description}</td>
              <td>{expenseItem.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;