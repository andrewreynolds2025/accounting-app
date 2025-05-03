import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  MdDashboard, MdPeople, MdOutlineShoppingCart, MdPointOfSale, MdSettings,
  MdInventory, MdAccountBalance, MdReport, MdExpandLess, MdExpandMore, MdMenu, MdAdd, MdList, MdPayment, MdAttachMoney, MdPerson, MdStore, MdRedo, MdReceipt, MdSms, MdArchive, MdInquiry, MdCurrencyExchange, MdBalance, MdWork
} from 'react-icons/md';
import './Sidebar.css';

// آیکون‌های زیرمنوها
const submenuIcons = {
  "شخص جدید": <MdAdd />,
  "اشخاص": <MdList />,
  "دریافت": <MdAttachMoney />,
  "پرداخت": <MdPayment />,
  "سهامداران": <MdPerson />,
  "فروشندگان": <MdStore />,

  "کالای جدید": <MdAdd />,
  "خدمات جدید": <MdAdd />,
  "کالاها و خدمات": <MdList />,
  "به روز رسانی لیست قیمت": <MdRedo />,
  "چاپ بارکد": <MdReceipt />,
  "چاپ بارکد تعدادی": <MdReceipt />,
  "صفحه لیست قیمت کالا": <MdList />,

  "بانک ها": <MdAccountBalance />,
  "صندوق ها": <MdAccountBalance />,
  "تنخواه گردان ها": <MdAccountBalance />,
  "انتقال": <MdPayment />,
  "لیست انتقال ها": <MdList />,
  "لیست چک های دریافتی": <MdList />,
  "لیست چک های پرداختی": <MdList />,

  "فروش جدید": <MdAdd />,
  "فاکتور سریع": <MdReceipt />,
  "برگشت از فروش": <MdRedo />,
  "فاکتورهای فروش": <MdList />,
  "فاکتورهای برگشت از فروش": <MdList />,
  "درآمد": <MdAttachMoney />,
  "لیست درآمدها": <MdList />,
  "قرارداد فروش اقساطی": <MdList />,
  "لیست فروش اقساطی": <MdList />,
  "اقلام تخفیف دار": <MdList />,

  "خرید جدید": <MdAdd />,
  "برگشت از خرید": <MdRedo />,
  "فاکتورهای خرید": <MdList />,
  "فاکتورهای برگشت از خرید": <MdList />,
  "هزینه": <MdPayment />,
  "لیست هزینه ها": <MdList />,
  "ضایعات": <MdPayment />,
  "لیست ضایعات": <MdList />,

  "انبارها": <MdStore />,
  "حواله جدید": <MdAdd />,
  "رسید و حواله های انبار": <MdList />,
  "موجودی کالا": <MdInventory />,
  "موجودی تمامی انبارها": <MdInventory />,
  "انبار گردانی": <MdInventory />,

  "سند جدید": <MdAdd />,
  "لیست اسناد": <MdList />,
  "تراز افتتاحیه": <MdBalance />,
  "بستن سال مالی": <MdRedo />,
  "جدول حساب ها": <MdList />,
  "تجمیع اسناد": <MdList />,

  "آرشیو": <MdArchive />,
  "پنل پیامک": <MdSms />,
  "استعلام": <MdInquiry />,
  "دریافت سایر": <MdAttachMoney />,
  "پرداخت سایر": <MdPayment />,
  "سند تسعیر ارز": <MdCurrencyExchange />,
  "سند توازن اشخاص": <MdBalance />,
  "سند توازن کالاها": <MdBalance />,
  "سند حقوق": <MdWork />,
};

const menuData = [
  {
    title: 'داشبورد',
    icon: <MdDashboard />,
    path: '/dashboard'
  },
  {
    title: 'اشخاص',
    icon: <MdPeople />,
    children: [
      { title: 'شخص جدید', path: '/customers/new-customer' },
      { title: 'اشخاص', path: '/customers/customer-list' },
      { title: 'دریافت', path: '/customers/receipts' },
      { title: 'پرداخت', path: '/customers/payments' },
      { title: 'سهامداران', path: '/customers/shareholders' },
      { title: 'فروشندگان', path: '/customers/vendors' }
    ]
  },
  {
    title: 'کالاها و خدمات',
    icon: <MdOutlineShoppingCart />,
    children: [
      { title: 'کالای جدید', path: '/products/new-product' },
      { title: 'خدمات جدید', path: '/products/new-service' },
      { title: 'کالاها و خدمات', path: '/products/product-list' },
      { title: 'به روز رسانی لیست قیمت', path: '/products/price-update' },
      { title: 'چاپ بارکد', path: '/products/barcode-print' },
      { title: 'چاپ بارکد تعدادی', path: '/products/bulk-barcode-print' },
      { title: 'صفحه لیست قیمت کالا', path: '/products/price-list' }
    ]
  },
  {
    title: 'بانکداری',
    icon: <MdAccountBalance />,
    children: [
      { title: 'بانک ها', path: '/banking/banks' },
      { title: 'صندوق ها', path: '/banking/funds' },
      { title: 'تنخواه گردان ها', path: '/banking/petty-cash' },
      { title: 'انتقال', path: '/banking/transfers' },
      { title: 'لیست انتقال ها', path: '/banking/transfer-list' },
      { title: 'لیست چک های دریافتی', path: '/banking/received-cheques' },
      { title: 'لیست چک های پرداختی', path: '/banking/paid-cheques' }
    ]
  },
  {
    title: 'فروش و درآمد',
    icon: <MdPointOfSale />,
    children: [
      { title: 'فروش جدید', path: '/sales/new-sale' },
      { title: 'فاکتور سریع', path: '/sales/quick-invoice' },
      { title: 'برگشت از فروش', path: '/sales/sale-returns' },
      { title: 'فاکتورهای فروش', path: '/sales/sales-invoices' },
      { title: 'فاکتورهای برگشت از فروش', path: '/sales/return-invoices' },
      { title: 'درآمد', path: '/sales/income' },
      { title: 'لیست درآمدها', path: '/sales/income-list' },
      { title: 'قرارداد فروش اقساطی', path: '/sales/installment-contracts' },
      { title: 'لیست فروش اقساطی', path: '/sales/installment-sales' },
      { title: 'اقلام تخفیف دار', path: '/sales/discount-items' }
    ]
  },
  {
    title: 'خرید و هزینه',
    icon: <MdPointOfSale />,
    children: [
      { title: 'خرید جدید', path: '/purchases/new-purchase' },
      { title: 'برگشت از خرید', path: '/purchases/purchase-returns' },
      { title: 'فاکتورهای خرید', path: '/purchases/purchase-invoices' },
      { title: 'فاکتورهای برگشت از خرید', path: '/purchases/return-purchase-invoices' },
      { title: 'هزینه', path: '/purchases/expenses' },
      { title: 'لیست هزینه ها', path: '/purchases/expense-list' },
      { title: 'ضایعات', path: '/purchases/waste' },
      { title: 'لیست ضایعات', path: '/purchases/waste-list' }
    ]
  },
  {
    title: 'انبارداری',
    icon: <MdInventory />,
    children: [
      { title: 'انبارها', path: '/inventory/warehouses' },
      { title: 'حواله جدید', path: '/inventory/new-transfer' },
      { title: 'رسید و حواله های انبار', path: '/inventory/inventory-receipts' },
      { title: 'موجودی کالا', path: '/inventory/stock' },
      { title: 'موجودی تمامی انبارها', path: '/inventory/all-warehouses' },
      { title: 'انبار گردانی', path: '/inventory/inventory-audit' }
    ]
  },
  {
    title: 'حسابداری',
    icon: <MdSettings />,
    children: [
      { title: 'سند جدید', path: '/accounting/new-document' },
      { title: 'لیست اسناد', path: '/accounting/document-list' },
      { title: 'تراز افتتاحیه', path: '/accounting/opening-balance' },
      { title: 'بستن سال مالی', path: '/accounting/close-fiscal-year' },
      { title: 'جدول حساب ها', path: '/accounting/account-table' },
      { title: 'تجمیع اسناد', path: '/accounting/consolidated-documents' }
    ]
  },
  {
    title: 'سایر',
    icon: <MdSettings />,
    children: [
      { title: 'آرشیو', path: '/others/archive' },
      { title: 'پنل پیامک', path: '/others/sms-panel' },
      { title: 'استعلام', path: '/others/inquiry' },
      { title: 'دریافت سایر', path: '/others/miscellaneous-receipts' },
      { title: 'پرداخت سایر', path: '/others/miscellaneous-payments' },
      { title: 'سند تسعیر ارز', path: '/others/currency-adjustment' },
      { title: 'سند توازن اشخاص', path: '/others/person-balance' },
      { title: 'سند توازن کالاها', path: '/others/product-balance' },
      { title: 'سند حقوق', path: '/others/payroll' }
    ]
  },
  {
    title: 'گزارش‌ها',
    icon: <MdReport />,
    path: '/reports'
  },
  {
    title: 'تنظیمات',
    icon: <MdSettings />,
    path: '/settings'
  }
];

function Sidebar({ collapsed, setCollapsed }) {
  const [openIndex, setOpenIndex] = useState(null);
  const location = useLocation();

  const handleMenuClick = (index) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <aside className={`sidebar${collapsed ? ' collapsed' : ''}`}>
      <div className="sidebar-header">
        <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
          <MdMenu />
        </button>
        {!collapsed && <span className="brand">برنامه حسابداری</span>}
      </div>
      <ul className="sidebar-menu">
        {menuData.map((item, i) => (
          <li key={i} className={`menu-item${item.children ? ' has-children' : ''}`}>
            {item.children ? (
              <>
                <div
                  className={`menu-link${openIndex === i ? ' open' : ''}`}
                  onClick={() => handleMenuClick(i)}
                  tabIndex="0"
                  role="button"
                  aria-expanded={openIndex === i}
                  title={collapsed ? item.title : undefined}
                >
                  <span className="icon">{item.icon}</span>
                  {!collapsed && <span className="title">{item.title}</span>}
                  {!collapsed && (openIndex === i ? <MdExpandLess /> : <MdExpandMore />)}
                </div>
                <ul className={`submenu${openIndex === i && !collapsed ? ' open' : ''}`}>
                  {!collapsed &&
                    item.children.map((sub, idx) => (
                      <li key={idx} className="submenu-item">
                        <NavLink
                          to={sub.path}
                          className={({ isActive }) => `submenu-link${isActive ? ' active' : ''}`}
                          title={sub.title}
                        >
                          <span className="icon">{submenuIcons[sub.title]}</span>
                          <span className="subtitle">{sub.title}</span>
                        </NavLink>
                      </li>
                    ))}
                  {collapsed &&
                    item.children.map((sub, idx) => (
                      <li key={idx} className="submenu-item-collapsed">
                        <NavLink
                          to={sub.path}
                          className={({ isActive }) => `submenu-link-collapsed${isActive ? ' active' : ''}`}
                          title={sub.title}
                        >
                          <span className="icon">{submenuIcons[sub.title]}</span>
                        </NavLink>
                      </li>
                    ))}
                </ul>
              </>
            ) : (
              <NavLink
                to={item.path}
                className={({ isActive }) => `menu-link${isActive ? ' active' : ''}`}
                title={collapsed ? item.title : undefined}
              >
                <span className="icon">{item.icon}</span>
                {!collapsed && <span className="title">{item.title}</span>}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;