import React from 'react'
import './managerHomePage.css'
import ManagerDashboard from '../../components/managerDashboard/ManagerDashboard'
import ManagerNavbar from '../../components/managerNavbar/ManagerNavbar'
import ManagerSidebar from '../../components/managerSidebar/ManagerSidebar'

export default function ManagerHomePage() {
  return (
    <>
      <ManagerNavbar />
      <div className='managerHomePage'>
        <ManagerSidebar />
        <ManagerDashboard />
      </div>
    </>
  )
}
