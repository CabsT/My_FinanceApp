import React from 'react';

const IncomeTable = ({ income }) => {
  return (
    <div>
      <h2>Income</h2>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount in Rand</th>
          </tr>
        </thead>
        <tbody>
          {income.map((incomeItem) => (
            <tr key={incomeItem.id}>
              <td>{incomeItem.description}</td>
              <td>{incomeItem.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IncomeTable;