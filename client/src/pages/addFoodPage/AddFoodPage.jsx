import React from 'react'
import AddFoodItem from '../../components/addFoodItem/AddFoodItem'
import ManagerNavbar from '../../components/managerNavbar/ManagerNavbar'
import ManagerSidebar from '../../components/managerSidebar/ManagerSidebar'
import './addFoodPage.css'

export default function AddFoodPage() {
  return (
    <>
      <ManagerNavbar />
      <div className='addFoodPage'>
        <ManagerSidebar />
        <AddFoodItem />
      </div>
    </>
  )
}
