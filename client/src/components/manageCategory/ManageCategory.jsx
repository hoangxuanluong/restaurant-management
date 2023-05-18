import React from 'react'
import '../ManageItem/manageItem.css'
import ManageItemHeader from '../manageItemHeader/ManageItemHeader'
import Table from '../table/Table'

const list = [
  {
    id: 1,
    name: 'Chocolate Frosted Doughnut',
    description: 'yummy',
  },
  {
    id: 2,
    name: 'Chocolate Frosted Doughnutt',
    description: 'yummyyyy',
  },
  {
    id: 3,
    name: 'Chocolate Doughnuttt',
    description: 'hi!!!',
  },
  {
    id: 4,
    name: 'Chocolate Frosted Doughnut',
    description: 'yummy',
  },
  {
    id: 5,
    name: 'Chocolate Frosted Doughnutt',
    description: 'yummyyyy',
  },
  {
    id: 6,
    name: 'Chocolate Doughnuttt',
    description: 'hi!!!',
  },
]

const colNames = ['ID', 'Name', 'Description']

export default function ManageItem() {
  return (
    <div className='manageItem'>
      <ManageItemHeader item='Category' />
      <Table list={list} colNames={colNames} />
    </div>
  )
}
