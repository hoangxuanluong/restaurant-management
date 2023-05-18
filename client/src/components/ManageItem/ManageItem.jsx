import React from 'react'
import './manageItem.css'
import ManageItemHeader from '../manageItemHeader/ManageItemHeader'
import Table from '../table/Table'

export default function ManageItem(props) {
  return (
    <div className='manageItem'>
      <ManageItemHeader item={props.item} />
      <Table item={props.item} columns={props.columns} />
    </div>
  )
}
