import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

const SuccessfulPayment = () => {
  return (
    <div
      className='text-center align-content-center'
      style={{ marginTop: '100px' }}
    >
      <div className='w-100 d-flex justify-content-center'>
        <div
          className='rounded-circle'
          style={{
            backgroundColor: '#82ce34',
            width: '95px',
            height: '95px',
          }}
        >
          <div className='d-flex justify-content-center align-items-center h-100'>
            <FontAwesomeIcon
              icon={faCheck}
              className='me-1 text-white'
              style={{
                width: '50px',
                height: '50px',
              }}
            />
          </div>
        </div>
      </div>

      <div
        style={{ marginTop: '30px', marginBottom: '30px', color: '#636363' }}
      >
        <h4>Awesome!</h4>
      </div>
      <div className='mb-3' style={{ color: '#636363' }}>
        Gói tin của bạn đã được thanh toán thành công.
      </div>
      <Link
        className='btn btn-success btn-block mb-3 border border-0 fw-medium align-content-center'
        to='/user/post-management'
        style={{ backgroundColor: '#82ce34', minHeight: '40px', width: '50%' }}
      >
        OK
      </Link>
    </div>
  )
}

export default SuccessfulPayment
