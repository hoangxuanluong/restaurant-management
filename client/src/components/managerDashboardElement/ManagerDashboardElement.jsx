import React from 'react'
import './managerDashboardElement.css'

export default function ManagerDashboardElement(props) {
  return (
    <>
      <div className='dashboardElement'>
        <div className='left'>
          <span className='dashboardElementTitle'>{props.title}</span>
          <span className='dashboardElementCount'>{props.numberCount}</span>
          <span className='dashboardElementLink'>View All {props.title}s</span>
        </div>
        <div className='right'>
          <div className='dashboardElementIcon'>icon</div>
        </div>
      </div>
    </>
  )
}
