import React from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard'
import LocalDiningIcon from '@mui/icons-material/LocalDining'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import CallToActionIcon from '@mui/icons-material/CallToAction'
import InventoryIcon from '@mui/icons-material/Inventory'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import LogoutIcon from '@mui/icons-material/Logout'
import './managerSidebar.css'
import { Link } from 'react-router-dom'

export default function ManagerSidebar() {
  return (
    <div className='managerSidebar'>
      <div className='managerSidebarTop'>
        <Link className='link' to='/users/id'>
          <div className='managerSidebarElement'>
            <DashboardIcon className='elementIcon' />
            <span className='sidebarElementTitle'>Dashboard</span>
          </div>
        </Link>
        <Link className='link' to='/users'>
          <div className='managerSidebarElement'>
            <SupervisorAccountIcon className='elementIcon' />
            <span className='sidebarElementTitle'>Manage Users</span>
          </div>
        </Link>
        <Link className='link' to='/foods'>
          <div className='managerSidebarElement'>
            <LocalDiningIcon className='elementIcon' />
            <span className='sidebarElementTitle'>Manage Foods</span>
          </div>
        </Link>
        <Link className='link' to='/addOrder'>
          <div className='managerSidebarElement'>
            <InventoryIcon className='elementIcon' />
            <span className='sidebarElementTitle'>Create Order</span>
          </div>
        </Link>
        <Link className='link' to='/manageOrder'>
          <div className='managerSidebarElement'>
            <CallToActionIcon className='elementIcon' />
            <span className='sidebarElementTitle'>Manage Order</span>
          </div>
        </Link>
        <Link className='link' to='/viewReport'>
          <div className='managerSidebarElement'>
            <ShowChartIcon className='elementIcon' />
            <span className='sidebarElementTitle'>View report</span>
          </div>
        </Link>
      </div>
      <div className='managerSidebarBottom'>
        <div className='managerSidebarElement'>
          <AccountCircleIcon className='elementIcon' />
          <span className='sidebarElementTitle'>Account Settings</span>
        </div>
        <div className='managerSidebarElement'>
          <LogoutIcon className='elementIcon' />
          <span className='sidebarElementTitle'>Logout</span>
        </div>
      </div>
    </div>
  )
}
