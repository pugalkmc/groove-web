import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Chart = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState('3');
  const [chartData, setChartData] = useState({});
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = [{
          id: 51,
          category: 'electronics',
          description: '3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultraslim notebooks. Supports TRIM command Garbage Collection technology RAID and ECC Error Checking  Correction to provide the optimized performance and enhanced reliability.',
          image: 'https://fakestoreapi.com/img/71kWymZ+c+L.AC_SX679.jpg',
          price: 981,
          sold: true,
          title: 'Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 25'
        },
        {
          id: 52,
          category: 'electronics',
          description: 'Expand your PS4 gaming experience Play anywhere Fast and easy setup Sleek design with high capacity 3year manufacturers limited warranty',
          image: 'https://fakestoreapi.com/img/61mtL65D4cL.AC_SX679.jpg',
          price: 1254,
          sold: false,
          title: 'WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive'
        }]
      
        const filteredData = data.filter(transaction => {
          const transactionMonth = new Date(transaction.dateOfSale).getMonth() + 1;
          return transactionMonth === parseInt(selectedMonth);
        });

        setTransactions(data);
        setFilteredTransactions(filteredData);

        prepareChartData(filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedMonth]);

  const prepareChartData = (data) => {
    const priceRanges = [
      { min: 0, max: 100 },
      { min: 101, max: 200 },
      { min: 201, max: 300 },
    ];

    const quantityByPriceRange = new Array(priceRanges.length).fill(0);

    data.forEach(transaction => {
      const price = transaction.price;
      for (let i = 0; i < priceRanges.length; i++) {
        if (price >= priceRanges[i].min && price <= priceRanges[i].max) {
          quantityByPriceRange[i]++;
          break;
        }
      }
    });

    const chartData = {
      labels: priceRanges.map(range => `${range.min}-${range.max}`),
      datasets: [{
        label: 'Quantity Sold',
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
        hoverBorderColor: 'rgba(75, 192, 192, 1)',
        data: quantityByPriceRange
      }]
    };

    setChartData(chartData);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <div className="container">
      <h1>Products Sold by Price Range</h1>
      <div className="filters">
        <label>Select Month:</label>
        <select value={selectedMonth} onChange={handleMonthChange}>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="chart-container">
          <Bar
            data={chartData}
            options={{
              maintainAspectRatio: false,
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Price Range'
                  }
                },
                y: {
                  title: {
                    display: true,
                    text: 'Quantity Sold'
                  },
                  beginAtZero: true
                }
              }
            }}
            ref={chartRef}
          />
        </div>
      )}
    </div>
  );
};

export default Chart;
