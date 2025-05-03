import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ isOpen, toggleSidebar }) {
  const menuItems = [
    {
      title: 'داشبورد',
      path: '/dashboard',
    },
    {
      title: 'اشخاص',
      subItems: [
        { title: 'شخص جدید', path: '/customers/new-customer' },
        { title: 'اشخاص', path: '/customers/customer-list' },
        { title: 'دریافت', path: '/customers/receipts' },
        { title: 'پرداخت', path: '/customers/payments' },
        { title: 'سهامداران', path: '/customers/shareholders' },
        { title: 'فروشندگان', path: '/customers/vendors' },
      ],
    },
    {
      title: 'کالاها و خدمات',
      subItems: [
        { title: 'کالای جدید', path: '/products/new-product' },
        { title: 'خدمات جدید', path: '/products/new-service' },
        { title: 'کالاها و خدمات', path: '/products/product-list' },
        { title: 'به روز رسانی لیست قیمت', path: '/products/price-update' },
        { title: 'چاپ بارکد', path: '/products/barcode-print' },
        { title: 'چاپ بارکد تعدادی', path: '/products/bulk-barcode-print' },
        { title: 'صفحه لیست قیمت کالا', path: '/products/price-list' },
      ],
    },
    {
      title: 'گزارش‌ها',
      path: '/reports',
    },
    {
      title: 'تنظیمات',
      path: '/settings',
    },
  ];

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>
      <ul className="menu">
        {menuItems.map((item, index) => (
          <li key={index}>
            {item.subItems ? (
              <>
                <span className="menu-title">{item.title}</span>
                <ul className="submenu">
                  {item.subItems.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <NavLink to={subItem.path} className="menu-item" activeClassName="active">
                        {subItem.title}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <NavLink to={item.path} className="menu-item" activeClassName="active">
                {item.title}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;