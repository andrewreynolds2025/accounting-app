import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Customers from './pages/Customers/CustomerList';
import NewCustomer from './pages/Customers/NewCustomer';
import Receipts from './pages/Customers/Receipts';
import Payments from './pages/Customers/Payments';
import Shareholders from './pages/Customers/Shareholders';
import Vendors from './pages/Customers/Vendors';
import Products from './pages/Products/ProductList';
import NewProduct from './pages/Products/NewProduct';
import NewService from './pages/Products/NewService';
import PriceUpdate from './pages/Products/PriceUpdate';
import BarcodePrint from './pages/Products/BarcodePrint';
import BulkBarcodePrint from './pages/Products/BulkBarcodePrint';
import PriceList from './pages/Products/PriceList';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <Router>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div style={{ marginRight: isSidebarOpen ? '250px' : '60px', transition: 'margin-right 0.3s ease' }}>
        <Routes>
          {/* مسیرهای صفحات */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* مسیرهای مشتریان */}
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/new-customer" element={<NewCustomer />} />
          <Route path="/customers/receipts" element={<Receipts />} />
          <Route path="/customers/payments" element={<Payments />} />
          <Route path="/customers/shareholders" element={<Shareholders />} />
          <Route path="/customers/vendors" element={<Vendors />} />
          {/* مسیرهای کالاها و خدمات */}
          <Route path="/products" element={<Products />} />
          <Route path="/products/new-product" element={<NewProduct />} />
          <Route path="/products/new-service" element={<NewService />} />
          <Route path="/products/price-update" element={<PriceUpdate />} />
          <Route path="/products/barcode-print" element={<BarcodePrint />} />
          <Route path="/products/bulk-barcode-print" element={<BulkBarcodePrint />} />
          <Route path="/products/price-list" element={<PriceList />} />
          {/* مسیرهای گزارش‌ها و تنظیمات */}
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;