import React from 'react';

const SummaryFinances = ({ totalIncome, totalExpense, remainingAmount }) => {
  return (
    <div>
      <h2>Summary</h2>
      <p>Total Income : R{totalIncome}</p>
      <p>Total Expense: R{totalExpense}</p>
      <p>Remaining Amount: R{remainingAmount}</p>
    </div>
  );
};

export default SummaryFinances;