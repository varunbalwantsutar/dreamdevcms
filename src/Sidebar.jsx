import React, { useState } from 'react'
import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill}
 from 'react-icons/bs'
import Dashboard from './Dashboard';

function Sidebar({openSidebarToggle, OpenSidebar,activePage,setActivePage}) {
    const handleSidebarClick = (page) => {
        setActivePage(page);
      };
    
      // Render content based on the active page

    
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <BsCart3  className='icon_header'/> SHOP
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li
            onClick={() => handleSidebarClick("Dashboard")}
            className='sidebar-list-item'
          >
           <BsGrid1X2Fill className='icon'/> Dashboard
          </li>
          <li
            onClick={() => handleSidebarClick("")}
            className='sidebar-list-item'
          >
                    <BsFillArchiveFill className='icon'/> Products
            </li>
            <li
            onClick={() => handleSidebarClick("")}
            className='sidebar-list-item'
          >
                    <BsFillGrid3X3GapFill className='icon'/> Categories
            </li>
            <li
            onClick={() => handleSidebarClick("")}
            className='sidebar-list-item'
          >
                    <BsPeopleFill className='icon'/> Customers
            </li>
            <li
            onClick={() => handleSidebarClick("")}
            className='sidebar-list-item'
          >
                    <BsListCheck className='icon'/> Inventory
            </li>
            <li
            onClick={() => handleSidebarClick("")}
            className='sidebar-list-item'
          >
                    <BsMenuButtonWideFill className='icon'/> Reports
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar