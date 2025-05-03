import React, { useState } from 'react';
import './Sidebar.css'; // برای استایل‌های سایدبار

const menuItems = [
  {
    title: 'داشبورد',
    path: '/dashboard',
    subMenu: [],
  },
  {
    title: 'اشخاص',
    subMenu: [
      { title: 'شخص جدید', path: '/persons/new' },
      { title: 'اشخاص', path: '/persons' },
      { title: 'لیست دریافت‌ها', path: '/persons/receives' },
      { title: 'لیست پرداخت‌ها', path: '/persons/payments' },
      { title: 'سهامداران', path: '/persons/shareholders' },
      { title: 'فروشندگان', path: '/persons/sellers' },
    ],
  },
  {
    title: 'کالاها و خدمات',
    subMenu: [
      { title: 'کالای جدید', path: '/products/new' },
      { title: 'خدمات جدید', path: '/services/new' },
      { title: 'کالاها و خدمات', path: '/products-services' },
      { title: 'به روز رسانی لیست قیمت', path: '/products/update-prices' },
      { title: 'چاپ بارکد', path: '/products/barcode' },
      { title: 'چاپ بارکد تعدادی', path: '/products/multiple-barcodes' },
      { title: 'صفحه لیست قیمت کالا', path: '/products/price-list' },
    ],
  },
  // سایر منوها به همین ترتیب اضافه شوند
];

function Sidebar({ isOpen, toggleSidebar }) {
  const [activeMenu, setActiveMenu] = useState(null);

  const handleMenuClick = (index) => {
    setActiveMenu(activeMenu === index ? null : index);
  };

  return (
    <div
      className={`sidebar ${isOpen ? 'open' : ''}`}
      style={{ width: isOpen ? '250px' : '60px' }}
    >
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? '<' : '>'}
      </button>
      <ul className="menu">
        {menuItems.map((item, index) => (
          <li key={index}>
            <div
              className="menu-item"
              onClick={() => handleMenuClick(index)}
              style={{
                background: activeMenu === index ? '#1976d2' : 'transparent',
              }}
            >
              {item.title}
            </div>
            {activeMenu === index && item.subMenu.length > 0 && (
              <ul className="sub-menu">
                {item.subMenu.map((subItem, subIndex) => (
                  <li
                    key={subIndex}
                    className="sub-menu-item"
                    style={{
                      color: '#fff',
                      background:
                        window.location.pathname === subItem.path
                          ? '#0066cc'
                          : 'transparent',
                    }}
                  >
                    {subItem.title}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;