import React from 'react';

const ExpenseTable = ({ expense }) => {
  return (
    <div className='pb-6'>
      <h2 className='text-4xl font-bold'>Expenses</h2>
      <table>
        <thead>
          <tr>
            <th className='text-3xl font-bold  text-blue-700 pr-20'>Description:</th>
            <th className='text-3xl font-bold  text-blue-700'>Amount in Rand:</th>
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