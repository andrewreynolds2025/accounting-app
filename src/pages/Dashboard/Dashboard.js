import React from "react";
import { Bar, Line, Doughnut, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const months = [
  "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
  "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
];

function randomArray(len, min, max) {
  return Array.from({ length: len }, () => Math.floor(Math.random() * (max - min) + min));
}

const salesData = randomArray(12, 20, 120);
const purchaseData = randomArray(12, 10, 100);
const income = 12000000;
const expense = 9000000;
const invoiceCount = 58;
const purchaseInvoiceCount = 44;
const inventoryCount = 1230;
const personBalance = -2400000;

const chartConfigs = [
  {
    title: "فروش ماهانه",
    chart: (
      <Bar
        data={{
          labels: months,
          datasets: [
            {
              label: "فروش (میلیون تومان)",
              data: salesData,
              backgroundColor: "#1976d2"
            }
          ]
        }}
        options={{
          plugins: { legend: { display: false } }
        }}
      />
    )
  },
  {
    title: "خرید ماهانه",
    chart: (
      <Bar
        data={{
          labels: months,
          datasets: [
            {
              label: "خرید (میلیون تومان)",
              data: purchaseData,
              backgroundColor: "#388e3c"
            }
          ]
        }}
        options={{
          plugins: { legend: { display: false } }
        }}
      />
    )
  },
  {
    title: "درآمد کل",
    chart: (
      <Doughnut
        data={{
          labels: ["درآمد"],
          datasets: [
            {
              data: [income, 20000000 - income],
              backgroundColor: ["#1976d2", "#e0e0e0"]
            }
          ]
        }}
        options={{
          plugins: { legend: { display: false } }
        }}
      />
    )
  },
  {
    title: "هزینه کل",
    chart: (
      <Doughnut
        data={{
          labels: ["هزینه"],
          datasets: [
            {
              data: [expense, 20000000 - expense],
              backgroundColor: ["#d32f2f", "#e0e0e0"]
            }
          ]
        }}
        options={{
          plugins: { legend: { display: false } }
        }}
      />
    )
  },
  {
    title: "تعداد فاکتورهای فروش",
    chart: (
      <Pie
        data={{
          labels: ["فاکتور فروش", "سایر"],
          datasets: [
            {
              data: [invoiceCount, 100 - invoiceCount],
              backgroundColor: ["#1976d2", "#e0e0e0"]
            }
          ]
        }}
        options={{
          plugins: { legend: { display: false } }
        }}
      />
    )
  },
  {
    title: "تعداد فاکتورهای خرید",
    chart: (
      <Pie
        data={{
          labels: ["فاکتور خرید", "سایر"],
          datasets: [
            {
              data: [purchaseInvoiceCount, 100 - purchaseInvoiceCount],
              backgroundColor: ["#388e3c", "#e0e0e0"]
            }
          ]
        }}
        options={{
          plugins: { legend: { display: false } }
        }}
      />
    )
  },
  {
    title: "موجودی انبارها",
    chart: (
      <Bar
        data={{
          labels: ["انبار ۱", "انبار ۲", "انبار ۳", "انبار ۴"],
          datasets: [
            {
              label: "موجودی",
              data: [350, 480, 210, 190],
              backgroundColor: "#ffa000"
            }
          ]
        }}
        options={{
          plugins: { legend: { display: false } }
        }}
      />
    )
  },
  {
    title: "مانده حساب اشخاص",
    chart: (
      <Line
        data={{
          labels: months,
          datasets: [
            {
              label: "مانده حساب (هزار تومان)",
              data: randomArray(12, -500, 800),
              borderColor: "#d32f2f",
              backgroundColor: "rgba(211,47,47,0.2)",
              tension: 0.4
            }
          ]
        }}
        options={{
          plugins: { legend: { display: false } }
        }}
      />
    )
  }
];

function Dashboard() {
  return (
    <div style={{
      fontFamily: "AnjomanMax, sans-serif",
      padding: "2rem",
      background: "#f7fafd",
      minHeight: "100vh"
    }}>
      <h2 style={{ marginBottom: "2rem", textAlign: "center" }}>داشبورد حسابداری</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
          gap: "2rem"
        }}
      >
        {chartConfigs.map((cfg, i) => (
          <div
            key={i}
            style={{
              background: "#fff",
              borderRadius: 20,
              boxShadow: "0 3px 12px #1976d212",
              padding: "1.2rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <div style={{ width: "100%", height: 260 }}>{cfg.chart}</div>
            <div style={{ marginTop: 20, fontWeight: "bold", color: "#1976d2" }}>
              {cfg.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;