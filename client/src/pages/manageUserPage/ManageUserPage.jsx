import React from 'react'
import ManagerNavbar from '../../components/managerNavbar/ManagerNavbar'
import ManagerSidebar from '../../components/managerSidebar/ManagerSidebar'
import ManageItem from '../../components/ManageItem/ManageItem'
import './manageUserPage.css'

export const userColumns = [
  { field: '_id', headerName: 'ID', width: 100 },
  {
    field: 'username',
    headerName: 'User',
    width: 150,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 230,
    editable: true,
  },

  {
    field: 'password',
    headerName: 'Password',
    width: 200,
    editable: true,
  },
  {
    field: 'position',
    headerName: 'Position',
    width: 150,
    editable: true,
  },
]

export default function ManageUserPage() {
  return (
    <>
      <ManagerNavbar />
      <div className='manageUserPage'>
        <ManagerSidebar />
        <ManageItem columns={userColumns} item='User' />
      </div>
    </>
  )
}
