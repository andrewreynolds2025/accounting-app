import React from 'react';
import Chart from 'react-apexcharts';

function Dashboard() {
  const chartOptions = {
    chart: {
      id: 'basic-bar',
    },
    xaxis: {
      categories: ['دی', 'بهمن', 'اسفند', 'فروردین', 'اردیبهشت', 'خرداد'],
    },
  };

  const chartSeries = [
    {
      name: 'درآمد',
      data: [30, 40, 45, 50, 49, 60],
    },
  ];

  return (
    <div style={{ marginLeft: '250px', padding: '20px' }}>
      <h1>داشبورد</h1>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <div style={{ width: '48%' }}>
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            width="100%"
          />
        </div>
        <div style={{ width: '48%' }}>
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="line"
            width="100%"
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;