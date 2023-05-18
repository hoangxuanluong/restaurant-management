import React, { useEffect, useState } from 'react'
import './manageOrderPage.css'
import ManagerNavbar from '../../components/managerNavbar/ManagerNavbar'
import ManagerSidebar from '../../components/managerSidebar/ManagerSidebar'
import ManageItemHeader from '../../components/manageItemHeader/ManageItemHeader'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom'

const columns = [
  { field: '_id', headerName: 'ID', width: 100 },
  {
    field: 'idTable',
    headerName: 'Table',
    valueGetter: (params) => {
      return params.row.tableId[0]?.id
    },
    width: 100,
  },
  {
    field: 'name',
    valueGetter: (params) => {
      return params.row.customerId?.name
    },
    headerName: 'Customer name',
    width: 150,
  },
  {
    field: 'tel',
    valueGetter: (params) => {
      return params.row.customerId?.tel
    },
    headerName: 'Tel',
    width: 150,
  },
  {
    field: 'time',
    valueGetter: (params) => {
      return moment(params.row?.createdAt).format('LLL')
    },
    headerName: 'Time',
    width: 250,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 100,
  },
]

const ManageOrderPage = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/orders?all=true')
        setData(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [])

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/orders/${id}`)
      setData(data.filter((item) => item._id !== id))
    } catch (err) {
      console.log(err)
    }
  }

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => {
        return (
          <div className='cellAction'>
            <Link
              to={`/orders/${params.row._id}`}
              style={{ textDecoration: 'none' }}
            >
              <div className='viewButton'>View</div>
            </Link>
            <div
              className='deleteButton'
              onClick={() => handleDelete(params.id)}
            >
              Delete
            </div>
            {/* <div className='div' onClick={() => console.log(params)}>
              Click
            </div> */}
          </div>
        )
      },
    },
  ]

  return (
    <>
      <ManagerNavbar />
      <div className='manageOrderPage'>
        <ManagerSidebar />
        <div className='manageOrderWrapper'>
          <ManageItemHeader item={'Order'} />
          <div className='datatable' style={{ width: '100%' }}>
            <div className='datatableTitle'>Orders</div>
            <DataGrid
              className='datagrid'
              rows={data}
              columns={columns.concat(actionColumn)}
              pageSize={9}
              rowsPerPageOptions={[9]}
              checkboxSelection
              getRowId={(row) => row._id}
              editMode='row'
              onRowSelectionModelChange={(newRowSelectionModel) => {
                console.log(data)
              }}
              disableRowSelectionOnClick
              // rowSelectionModel={rowSelectionModel}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageOrderPage
