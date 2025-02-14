import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import TransactionTable from './components/TransactionTable';
import Summary from './components/Summary';
import Chart from './components/Chart';
import Filters from './components/Filters';
import './App.css';
import Navbar from './components/Navbar';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    netBalance: 0,
  });
  const [chartData, setChartData] = useState({ labels: [], values: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [filters, setFilters] = useState({ type: '', category: '' });

  // Fetch data from the server
  const fetchData = async () => {
    setLoading(true);
    try {
      const transactionsResponse = await axios.get('http://localhost:3001/transactions');
      const summaryResponse = await axios.get('http://localhost:3001/summary');
      setTransactions(transactionsResponse.data);
      setFilteredTransactions(transactionsResponse.data);
      updateSummary(transactionsResponse.data);
      updateChartData(transactionsResponse.data);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch data. Please check if the mock server is running.');
    } finally {
      setLoading(false);
    }
  };

  // Update summary based on transactions
  const updateSummary = (transactions) => {
    const totalIncome = transactions
      .filter((t) => t.type === 'Income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter((t) => t.type === 'Expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const netBalance = totalIncome - totalExpenses;

    setSummary({
      totalIncome,
      totalExpenses,
      netBalance,
    });
  };

  // Update chart data based on transactions
  const updateChartData = (transactions) => {
    const income = transactions
      .filter((t) => t.type === 'Income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
      .filter((t) => t.type === 'Expense')
      .reduce((sum, t) => sum + t.amount, 0);

    setChartData({
      labels: ['Income', 'Expenses'],
      values: [income, expenses],
    });
  };

  // Handle file upload
  const handleFileUpload = (file) => {
    console.log('Uploaded file:', file);
    fetchData(); // Fetch data after upload
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  // Apply filters to transactions
  const applyFilters = (filters) => {
    let filtered = transactions;

    // Filter by type
    if (filters.type) {
      filtered = filtered.filter((t) => t.type === filters.type);
    }

    // Filter by category
    if (filters.category) {
      filtered = filtered.filter((t) => t.category === filters.category);
    }

    setFilteredTransactions(filtered);
    updateSummary(filtered);
    updateChartData(filtered);
  };

  // Reset filters
  const handleResetFilters = () => {
    setFilters({ type: '', category: '' });
    setFilteredTransactions(transactions);
    updateSummary(transactions);
    updateChartData(transactions);
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <Navbar/>
    <br></br>    <br></br> <br></br>
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
   
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <FileUpload onFileUpload={handleFileUpload} />
      <Filters
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
      />
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      <TransactionTable transactions={filteredTransactions} />
      <Summary {...summary} />
      <Chart data={chartData} />
    </div>
    </>
  );
};

export default App;