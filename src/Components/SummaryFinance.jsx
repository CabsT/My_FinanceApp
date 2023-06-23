import React from 'react';

const SummaryFinance = ({ totalIncome, totalExpense, remainingAmount }) => {
  return (
    <div>
      <h2>Summary</h2>
      <p>Total Income : R{totalIncome}</p>
      <p>Total Expense: R{totalExpense}</p>
      <p>Remaining Amount: R{remainingAmount}</p>
    </div>
  );
};

export default SummaryFinance;