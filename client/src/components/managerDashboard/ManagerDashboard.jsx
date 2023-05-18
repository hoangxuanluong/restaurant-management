import React from 'react'
import './managerDashboard.css'
import ManagerDashboardElement from '../managerDashboardElement/ManagerDashboardElement'

export default function ManagerDashboard() {
  return (
    <>
      <div className='managerDashboard'>
        <div className='dashboardTitle'>Dashboard:</div>
        <div className='dashboardContent'>
          <ManagerDashboardElement title='Category' numberCount='10' />
          <ManagerDashboardElement title='Product' numberCount='20' />
          <ManagerDashboardElement title='Bill' numberCount='100' />
        </div>
      </div>
    </>
  )
}
