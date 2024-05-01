import React from 'react'
import noDataimg from '../../../../assets/images/no-data.png'

export default function noData() {
  return (
    <div className='text-center'>
        <img src={noDataimg} alt='' />
      <h3>No Data</h3>
    </div>
  )
}
