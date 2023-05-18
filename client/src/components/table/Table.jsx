import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

import './table.css'

const QuantityColumn = () => {
  const [quantity, setQuantity] = useState(0)

  const handleQuantity = (type) => {
    if (type === 'dec') {
      quantity > 1 && setQuantity(quantity - 1)
    } else {
      setQuantity(quantity + 1)
    }
  }
  return (
    <div className='quantity'>
      {/* <RemoveIcon className='quantityIcon' onClick={handleQuantity('dec')} />
      <span className='amount'>0</span>
      <AddIcon className='quantityIcon' onClick={handleQuantity('inc')} /> */}
    </div>
  )
}

export default function List({ item, columns, setFoodsSelection }) {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          item === 'Food' ? '/api/foods' : '/api/user'
        )
        setData(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [item])

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        item === 'Food' ? `/api/foods/${id}` : `/api/user/${id}`
      )
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
            {item === 'Food' && (
              <Link to='products/' style={{ textDecoration: 'none' }}>
                <div className='viewButton'>View</div>
              </Link>
            )}
            <Link
              to={`/foods/${params.row._id}/edit`}
              style={{ textDecoration: 'none' }}
            >
              <div className='updateButton'>Update</div>
            </Link>
            <div
              className='deleteButton'
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        )
      },
    },
  ]

  const actionFoodColumn = [
    {
      field: 'quantity',
      headerName: 'Quantity',
      width: 200,
      renderCell: (params) => {
        return <QuantityColumn />
      },
    },
  ]

  const [rowSelectionModel, setRowSelectionModel] = useState([])

  useEffect(() => {
    console.log(rowSelectionModel)
  }, [rowSelectionModel])

  return (
    <div className='datatable'>
      <div className='datatableTitle'>
        {item === 'User' ? 'Users' : 'Foods'}
        <Link to='add' className='link tableAddNewButton'>
          Add New
        </Link>
      </div>
      <DataGrid
        className='datagrid'
        rows={data}
        columns={columns.concat(
          setFoodsSelection ? actionFoodColumn : actionColumn
        )}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
        editMode='row'
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setFoodsSelection && setFoodsSelection(newRowSelectionModel)
        }}
        disableRowSelectionOnClick
        // rowSelectionModel={rowSelectionModel}
      />
    </div>
  )
}
