import React from "react";

const IncomeTable = ({ income }) => {
  return (
    <div className="pb-6">
      <h2 className='text-4xl font-bold'>Income</h2>
      <table className="">
        <thead>
          <tr>
            <th className='text-3xl font-bold text-blue-700 pr-20'>Description:</th>
            <th className='text-3xl font-bold  text-blue-700'>Amount in Rand:</th>
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