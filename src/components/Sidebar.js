import React, { useState, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUserFriends,
  FaBoxOpen,
  FaMoneyBillWave,
  FaShoppingCart,
  FaWarehouse,
  FaFileInvoice,
  FaCog,
  FaChartBar,
  FaChevronDown,
  FaChevronUp,
  FaRegPlusSquare,
  FaListUl,
  FaHandHoldingUsd,
  FaUserTie,
  FaStore,
  FaSyncAlt,
  FaBarcode,
  FaDonate,
  FaFolderOpen,
  FaSms,
  FaQuestionCircle,
  FaExchangeAlt,
  FaBalanceScale,
  FaUserCheck,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";
import "./Sidebar.css";

const submenuIcons = {
  "شخص جدید": <FaRegPlusSquare />,
  "اشخاص": <FaListUl />,
  "دریافت": <FaHandHoldingUsd />,
  "پرداخت": <FaDonate />,
  "سهامداران": <FaUserTie />,
  "فروشندگان": <FaStore />,
  "کالای جدید": <FaRegPlusSquare />,
  "خدمات جدید": <FaRegPlusSquare />,
  "کالاها و خدمات": <FaListUl />,
  "به روز رسانی لیست قیمت": <FaSyncAlt />,
  "چاپ بارکد": <FaBarcode />,
  "چاپ بارکد تعدادی": <FaBarcode />,
  "صفحه لیست قیمت کالا": <FaListUl />,
  "بانک ها": <FaMoneyBillWave />,
  "صندوق ها": <FaMoneyBillWave />,
  "تنخواه گردان ها": <FaMoneyBillWave />,
  "انتقال": <FaExchangeAlt />,
  "لیست انتقال ها": <FaListUl />,
  "لیست چک های دریافتی": <FaListUl />,
  "لیست چک های پرداختی": <FaListUl />,
  "فروش جدید": <FaRegPlusSquare />,
  "فاکتور سریع": <FaFileInvoice />,
  "برگشت از فروش": <FaSyncAlt />,
  "فاکتورهای فروش": <FaListUl />,
  "فاکتورهای برگشت از فروش": <FaListUl />,
  "درآمد": <FaHandHoldingUsd />,
  "لیست درآمدها": <FaListUl />,
  "قرارداد فروش اقساطی": <FaFileInvoice />,
  "لیست فروش اقساطی": <FaListUl />,
  "اقلام تخفیف دار": <FaListUl />,
  "خرید جدید": <FaRegPlusSquare />,
  "برگشت از خرید": <FaSyncAlt />,
  "فاکتورهای خرید": <FaListUl />,
  "فاکتورهای برگشت از خرید": <FaListUl />,
  "هزینه": <FaDonate />,
  "لیست هزینه ها": <FaListUl />,
  "ضایعات": <FaDonate />,
  "لیست ضایعات": <FaListUl />,
  "انبارها": <FaWarehouse />,
  "حواله جدید": <FaRegPlusSquare />,
  "رسید و حواله های انبار": <FaListUl />,
  "موجودی کالا": <FaBoxOpen />,
  "موجودی تمامی انبارها": <FaBoxOpen />,
  "انبار گردانی": <FaWarehouse />,
  "سند جدید": <FaRegPlusSquare />,
  "لیست اسناد": <FaListUl />,
  "تراز افتتاحیه": <FaBalanceScale />,
  "بستن سال مالی": <FaSyncAlt />,
  "جدول حساب ها": <FaListUl />,
  "تجمیع اسناد": <FaListUl />,
  "آرشیو": <FaFolderOpen />,
  "پنل پیامک": <FaSms />,
  "استعلام": <FaQuestionCircle />,
  "دریافت سایر": <FaHandHoldingUsd />,
  "پرداخت سایر": <FaDonate />,
  "سند تسعیر ارز": <FaExchangeAlt />,
  "سند توازن اشخاص": <FaBalanceScale />,
  "سند توازن کالاها": <FaBalanceScale />,
  "سند حقوق": <FaUserCheck />,
};

const menuData = [
  {
    title: "داشبورد",
    icon: <FaTachometerAlt />,
    path: "/dashboard",
  },
  {
    title: "اشخاص",
    icon: <FaUserFriends />,
    children: [
      { title: "شخص جدید", path: "/customers/new-customer" },
      { title: "اشخاص", path: "/customers/customer-list" },
      { title: "دریافت", path: "/customers/receipts" },
      { title: "پرداخت", path: "/customers/payments" },
      { title: "سهامداران", path: "/customers/shareholders" },
      { title: "فروشندگان", path: "/customers/vendors" },
    ],
  },
  {
    title: "کالاها و خدمات",
    icon: <FaBoxOpen />,
    children: [
      { title: "کالای جدید", path: "/products/new-product" },
      { title: "خدمات جدید", path: "/products/new-service" },
      { title: "کالاها و خدمات", path: "/products/product-list" },
      { title: "به روز رسانی لیست قیمت", path: "/products/price-update" },
      { title: "چاپ بارکد", path: "/products/barcode-print" },
      { title: "چاپ بارکد تعدادی", path: "/products/bulk-barcode-print" },
      { title: "صفحه لیست قیمت کالا", path: "/products/price-list" },
    ],
  },
  {
    title: "بانکداری",
    icon: <FaMoneyBillWave />,
    children: [
      { title: "بانک ها", path: "/banking/banks" },
      { title: "صندوق ها", path: "/banking/funds" },
      { title: "تنخواه گردان ها", path: "/banking/petty-cash" },
      { title: "انتقال", path: "/banking/transfers" },
      { title: "لیست انتقال ها", path: "/banking/transfer-list" },
      { title: "لیست چک های دریافتی", path: "/banking/received-cheques" },
      { title: "لیست چک های پرداختی", path: "/banking/paid-cheques" },
    ],
  },
  {
    title: "فروش و درآمد",
    icon: <FaShoppingCart />,
    children: [
      { title: "فروش جدید", path: "/sales/new-sale" },
      { title: "فاکتور سریع", path: "/sales/quick-invoice" },
      { title: "برگشت از فروش", path: "/sales/sale-returns" },
      { title: "فاکتورهای فروش", path: "/sales/sales-invoices" },
      { title: "فاکتورهای برگشت از فروش", path: "/sales/return-invoices" },
      { title: "درآمد", path: "/sales/income" },
      { title: "لیست درآمدها", path: "/sales/income-list" },
      { title: "قرارداد فروش اقساطی", path: "/sales/installment-contracts" },
      { title: "لیست فروش اقساطی", path: "/sales/installment-sales" },
      { title: "اقلام تخفیف دار", path: "/sales/discount-items" },
    ],
  },
  {
    title: "خرید و هزینه",
    icon: <FaShoppingCart />,
    children: [
      { title: "خرید جدید", path: "/purchases/new-purchase" },
      { title: "برگشت از خرید", path: "/purchases/purchase-returns" },
      { title: "فاکتورهای خرید", path: "/purchases/purchase-invoices" },
      { title: "فاکتورهای برگشت از خرید", path: "/purchases/return-purchase-invoices" },
      { title: "هزینه", path: "/purchases/expenses" },
      { title: "لیست هزینه ها", path: "/purchases/expense-list" },
      { title: "ضایعات", path: "/purchases/waste" },
      { title: "لیست ضایعات", path: "/purchases/waste-list" },
    ],
  },
  {
    title: "انبارداری",
    icon: <FaWarehouse />,
    children: [
      { title: "انبارها", path: "/inventory/warehouses" },
      { title: "حواله جدید", path: "/inventory/new-transfer" },
      { title: "رسید و حواله های انبار", path: "/inventory/inventory-receipts" },
      { title: "موجودی کالا", path: "/inventory/stock" },
      { title: "موجودی تمامی انبارها", path: "/inventory/all-warehouses" },
      { title: "انبار گردانی", path: "/inventory/inventory-audit" },
    ],
  },
  {
    title: "حسابداری",
    icon: <FaFileInvoice />,
    children: [
      { title: "سند جدید", path: "/accounting/new-document" },
      { title: "لیست اسناد", path: "/accounting/document-list" },
      { title: "تراز افتتاحیه", path: "/accounting/opening-balance" },
      { title: "بستن سال مالی", path: "/accounting/close-fiscal-year" },
      { title: "جدول حساب ها", path: "/accounting/account-table" },
      { title: "تجمیع اسناد", path: "/accounting/consolidated-documents" },
    ],
  },
  {
    title: "سایر",
    icon: <FaCog />,
    children: [
      { title: "آرشیو", path: "/others/archive" },
      { title: "پنل پیامک", path: "/others/sms-panel" },
      { title: "استعلام", path: "/others/inquiry" },
      { title: "دریافت سایر", path: "/others/miscellaneous-receipts" },
      { title: "پرداخت سایر", path: "/others/miscellaneous-payments" },
      { title: "سند تسعیر ارز", path: "/others/currency-adjustment" },
      { title: "سند توازن اشخاص", path: "/others/person-balance" },
      { title: "سند توازن کالاها", path: "/others/product-balance" },
      { title: "سند حقوق", path: "/others/payroll" },
    ],
  },
  {
    title: "گزارش‌ها",
    icon: <FaChartBar />,
    path: "/reports",
  },
  {
    title: "تنظیمات",
    icon: <FaCog />,
    path: "/settings",
  },
];

function Sidebar({ collapsed, setCollapsed }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const location = useLocation();

  // اگر سایدبار بسته است و روی منوی اصلی کلیک شد، زیرمنو به صورت پاپ‌آپ باز شود
  const handleMenuClick = (index) => {
    if (collapsed) {
      setHoveredMenu(prev => (prev === index ? null : index));
    } else {
      setOpenIndex(prev => (prev === index ? null : index));
    }
  };

  return (
    <aside className={`sidebar${collapsed ? " collapsed" : ""}`}>
      <div className="sidebar-header">
        <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <FaAngleDoubleLeft /> : <FaAngleDoubleRight />}
        </button>
        {!collapsed && <span className="brand">برنامه حسابداری</span>}
      </div>
      <ul className="sidebar-menu">
        {menuData.map((item, i) => (
          <li
            key={i}
            className={`menu-item${item.children ? " has-children" : ""}`}
            onMouseLeave={() => collapsed && setHoveredMenu(null)}
          >
            {item.children ? (
              <>
                <div
                  className={`menu-link${openIndex === i ? " open" : ""}`}
                  onClick={() => handleMenuClick(i)}
                  tabIndex="0"
                  role="button"
                  aria-expanded={openIndex === i}
                  title={collapsed ? item.title : undefined}
                  onMouseEnter={() => collapsed && setHoveredMenu(i)}
                >
                  <span className="icon">{item.icon}</span>
                  {!collapsed && <span className="title">{item.title}</span>}
                  {!collapsed && (openIndex === i ? <FaChevronUp /> : <FaChevronDown />)}
                </div>
                {/* سایدبار باز: زیرمنو به صورت معمولی */}
                {!collapsed && (
                  <ul className={`submenu${openIndex === i ? " open" : ""}`}>
                    {item.children.map((sub, idx) => (
                      <li key={idx} className="submenu-item">
                        <NavLink
                          to={sub.path}
                          className={({ isActive }) => `submenu-link${isActive ? " active" : ""}`}
                          title={sub.title}
                        >
                          <span className="icon">{submenuIcons[sub.title] || <FaRegPlusSquare />}</span>
                          <span className="subtitle">{sub.title}</span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
                {/* سایدبار بسته: زیرمنو به صورت پاپ‌آپ کنار آیکون */}
                {collapsed && hoveredMenu === i && (
                  <ul className="submenu-popup">
                    {item.children.map((sub, idx) => (
                      <li key={idx} className="submenu-item">
                        <NavLink
                          to={sub.path}
                          className={({ isActive }) => `submenu-link${isActive ? " active" : ""}`}
                          title={sub.title}
                        >
                          <span className="icon">{submenuIcons[sub.title] || <FaRegPlusSquare />}</span>
                          <span className="subtitle">{sub.title}</span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <NavLink
                to={item.path}
                className={({ isActive }) => `menu-link${isActive ? " active" : ""}`}
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