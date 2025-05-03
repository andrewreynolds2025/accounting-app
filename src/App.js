import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import "./fonts/fonts.css";

// Dashboard
import Dashboard from './pages/Dashboard/Dashboard';

// Auth
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// Customers
import NewCustomer from './pages/Customers/NewCustomer';
import CustomerList from './pages/Customers/CustomerList';
import Receipts from './pages/Customers/Receipts';
import Payments from './pages/Customers/Payments';
import Shareholders from './pages/Customers/Shareholders';
import Vendors from './pages/Customers/Vendors';

// Products
import NewProduct from './pages/Products/NewProduct';
import NewService from './pages/Products/NewService';
import ProductList from './pages/Products/ProductList';
import PriceUpdate from './pages/Products/PriceUpdate';
import BarcodePrint from './pages/Products/BarcodePrint';
import BulkBarcodePrint from './pages/Products/BulkBarcodePrint';
import PriceList from './pages/Products/PriceList';

// Banking
import Banks from './pages/Banking/Banks';
import Funds from './pages/Banking/Funds';
import PettyCash from './pages/Banking/PettyCash';
import Transfers from './pages/Banking/Transfers';
import TransferList from './pages/Banking/TransferList';
import ReceivedCheques from './pages/Banking/ReceivedCheques';
import PaidCheques from './pages/Banking/PaidCheques';

// Sales
import NewSale from './pages/Sales/NewSale';
import QuickInvoice from './pages/Sales/QuickInvoice';
import SaleReturns from './pages/Sales/SaleReturns';
import SalesInvoices from './pages/Sales/SalesInvoices';
import ReturnInvoices from './pages/Sales/ReturnInvoices';
import Income from './pages/Sales/Income';
import IncomeList from './pages/Sales/IncomeList';
import InstallmentContracts from './pages/Sales/InstallmentContracts';
import InstallmentSales from './pages/Sales/InstallmentSales';
import DiscountItems from './pages/Sales/DiscountItems';

// Purchases
import NewPurchase from './pages/Purchases/NewPurchase';
import PurchaseReturns from './pages/Purchases/PurchaseReturns';
import PurchaseInvoices from './pages/Purchases/PurchaseInvoices';
import ReturnPurchaseInvoices from './pages/Purchases/ReturnPurchaseInvoices';
import Expenses from './pages/Purchases/Expenses';
import ExpenseList from './pages/Purchases/ExpenseList';
import Waste from './pages/Purchases/Waste';
import WasteList from './pages/Purchases/WasteList';

// Inventory
import Warehouses from './pages/Inventory/Warehouses';
import NewTransfer from './pages/Inventory/NewTransfer';
import InventoryReceipts from './pages/Inventory/InventoryReceipts';
import Stock from './pages/Inventory/Stock';
import AllWarehouses from './pages/Inventory/AllWarehouses';
import InventoryAudit from './pages/Inventory/InventoryAudit';

// Accounting
import NewDocument from './pages/Accounting/NewDocument';
import DocumentList from './pages/Accounting/DocumentList';
import OpeningBalance from './pages/Accounting/OpeningBalance';
import CloseFiscalYear from './pages/Accounting/CloseFiscalYear';
import AccountTable from './pages/Accounting/AccountTable';
import ConsolidatedDocuments from './pages/Accounting/ConsolidatedDocuments';

// Others
import Archive from './pages/Others/Archive';
import SMSPanel from './pages/Others/SMSPanel';
import Inquiry from './pages/Others/Inquiry';
import MiscellaneousReceipts from './pages/Others/MiscellaneousReceipts';
import MiscellaneousPayments from './pages/Others/MiscellaneousPayments';
import CurrencyAdjustment from './pages/Others/CurrencyAdjustment';
import PersonBalance from './pages/Others/PersonBalance';
import ProductBalance from './pages/Others/ProductBalance';
import Payroll from './pages/Others/Payroll';

// Reports & Settings
import Reports from './pages/Reports/Reports';
import Settings from './pages/Settings/Settings';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <Router>
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <div
        className="main-content"
        style={{
          marginRight: sidebarCollapsed ? 70 : 260,
          transition: 'margin-right 0.25s',
          minHeight: '100vh',
          background: '#f7fafd',
        }}
      >
        <Routes>
          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Customers */}
          <Route path="/customers/new-customer" element={<NewCustomer />} />
          <Route path="/customers/customer-list" element={<CustomerList />} />
          <Route path="/customers/receipts" element={<Receipts />} />
          <Route path="/customers/payments" element={<Payments />} />
          <Route path="/customers/shareholders" element={<Shareholders />} />
          <Route path="/customers/vendors" element={<Vendors />} />

          {/* Products */}
          <Route path="/products/new-product" element={<NewProduct />} />
          <Route path="/products/new-service" element={<NewService />} />
          <Route path="/products/product-list" element={<ProductList />} />
          <Route path="/products/price-update" element={<PriceUpdate />} />
          <Route path="/products/barcode-print" element={<BarcodePrint />} />
          <Route path="/products/bulk-barcode-print" element={<BulkBarcodePrint />} />
          <Route path="/products/price-list" element={<PriceList />} />

          {/* Banking */}
          <Route path="/banking/banks" element={<Banks />} />
          <Route path="/banking/funds" element={<Funds />} />
          <Route path="/banking/petty-cash" element={<PettyCash />} />
          <Route path="/banking/transfers" element={<Transfers />} />
          <Route path="/banking/transfer-list" element={<TransferList />} />
          <Route path="/banking/received-cheques" element={<ReceivedCheques />} />
          <Route path="/banking/paid-cheques" element={<PaidCheques />} />

          {/* Sales */}
          <Route path="/sales/new-sale" element={<NewSale />} />
          <Route path="/sales/quick-invoice" element={<QuickInvoice />} />
          <Route path="/sales/sale-returns" element={<SaleReturns />} />
          <Route path="/sales/sales-invoices" element={<SalesInvoices />} />
          <Route path="/sales/return-invoices" element={<ReturnInvoices />} />
          <Route path="/sales/income" element={<Income />} />
          <Route path="/sales/income-list" element={<IncomeList />} />
          <Route path="/sales/installment-contracts" element={<InstallmentContracts />} />
          <Route path="/sales/installment-sales" element={<InstallmentSales />} />
          <Route path="/sales/discount-items" element={<DiscountItems />} />

          {/* Purchases */}
          <Route path="/purchases/new-purchase" element={<NewPurchase />} />
          <Route path="/purchases/purchase-returns" element={<PurchaseReturns />} />
          <Route path="/purchases/purchase-invoices" element={<PurchaseInvoices />} />
          <Route path="/purchases/return-purchase-invoices" element={<ReturnPurchaseInvoices />} />
          <Route path="/purchases/expenses" element={<Expenses />} />
          <Route path="/purchases/expense-list" element={<ExpenseList />} />
          <Route path="/purchases/waste" element={<Waste />} />
          <Route path="/purchases/waste-list" element={<WasteList />} />

          {/* Inventory */}
          <Route path="/inventory/warehouses" element={<Warehouses />} />
          <Route path="/inventory/new-transfer" element={<NewTransfer />} />
          <Route path="/inventory/inventory-receipts" element={<InventoryReceipts />} />
          <Route path="/inventory/stock" element={<Stock />} />
          <Route path="/inventory/all-warehouses" element={<AllWarehouses />} />
          <Route path="/inventory/inventory-audit" element={<InventoryAudit />} />

          {/* Accounting */}
          <Route path="/accounting/new-document" element={<NewDocument />} />
          <Route path="/accounting/document-list" element={<DocumentList />} />
          <Route path="/accounting/opening-balance" element={<OpeningBalance />} />
          <Route path="/accounting/close-fiscal-year" element={<CloseFiscalYear />} />
          <Route path="/accounting/account-table" element={<AccountTable />} />
          <Route path="/accounting/consolidated-documents" element={<ConsolidatedDocuments />} />

          {/* Others */}
          <Route path="/others/archive" element={<Archive />} />
          <Route path="/others/sms-panel" element={<SMSPanel />} />
          <Route path="/others/inquiry" element={<Inquiry />} />
          <Route path="/others/miscellaneous-receipts" element={<MiscellaneousReceipts />} />
          <Route path="/others/miscellaneous-payments" element={<MiscellaneousPayments />} />
          <Route path="/others/currency-adjustment" element={<CurrencyAdjustment />} />
          <Route path="/others/person-balance" element={<PersonBalance />} />
          <Route path="/others/product-balance" element={<ProductBalance />} />
          <Route path="/others/payroll" element={<Payroll />} />

          {/* Reports & Settings */}
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />

          {/* Default redirects */}
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="*" element={<div style={{ padding: 40, textAlign: 'center' }}>صفحه پیدا نشد</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;