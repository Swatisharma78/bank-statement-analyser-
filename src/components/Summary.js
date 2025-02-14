import React from 'react';

const Summary = ({ totalIncome, totalExpenses, netBalance }) => {
  return (
    <div className="summary">
      <h2>Summary</h2>
      <table className="summary-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Total Income</td>
            <td>${totalIncome}</td>
          </tr>
          <tr>
            <td>Total Expenses</td>
            <td>${totalExpenses}</td>
          </tr>
          <tr>
            <td>Net Balance</td>
            <td>${netBalance}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Summary;