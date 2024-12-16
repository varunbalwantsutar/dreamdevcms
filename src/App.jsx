import { useState } from 'react'
import './App.css'
import Header from './Header'
import Sidebar from './Sidebar'
import Dashboard from './Dashboard'

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const [activePage, setActivePage] = useState("Dashboard");


  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
      const renderContent = (currentActivePage) => {
        switch (currentActivePage) {
          case "Dashboard":
            return <Dashboard/>;
          case "":
            return <></>;
          default:
            return <Dashboard />;
        }
      };
  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} activePage={activePage} setActivePage={setActivePage}/>
      <div style={{ maxWidth : "80%"}}>
        {renderContent(activePage)}
      </div>
    </div>
  )
}

export default App
