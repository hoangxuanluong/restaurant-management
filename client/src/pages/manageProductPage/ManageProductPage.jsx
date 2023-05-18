import React from 'react'
import './manageProductPage.css'
import ManagerNavbar from '../../components/managerNavbar/ManagerNavbar'
import ManagerSidebar from '../../components/managerSidebar/ManagerSidebar'
import ManageItem from '../../components/ManageItem/ManageItem'

export const productColumns = [
  { field: '_id', headerName: 'ID', width: 200 },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 100,
  },

  {
    field: 'desc',
    headerName: 'Description',
    width: 400,
  },
]

export default function ManageProductPage() {
  return (
    <>
      <ManagerNavbar />
      <div className='manageProductPage'>
        <ManagerSidebar />
        <ManageItem columns={productColumns} item='Food' />
      </div>
    </>
  )
}
