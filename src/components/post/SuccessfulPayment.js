import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

const SuccessfulPayment = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const transactionStatus = searchParams.get('vnp_TransactionStatus')

  console.log(transactionStatus)
  return (
    <div
      className='text-center align-content-center'
      style={{ marginTop: '100px' }}
    >
      <div className='w-100 d-flex justify-content-center'>
        <div
          className='rounded-circle'
          style={{
            backgroundColor: transactionStatus === '00' ? '#82ce34' : '#e03131',
            width: '95px',
            height: '95px',
          }}
        >
          <div className='d-flex justify-content-center align-items-center h-100'>
            <FontAwesomeIcon
              icon={transactionStatus === '00' ? faCheck : faXmark}
              className='text-white'
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
        <h4>
          {transactionStatus === '00'
            ? 'Awesome!'
            : 'Woops! Something went wrong :('}
        </h4>
      </div>
      <div className='mb-3' style={{ color: '#636363' }}>
        {transactionStatus === '00'
          ? 'Gói tin của bạn đã được thanh toán thành công.'
          : 'Gói tin của bạn đã thanh toán thất bại'}
      </div>
      <Link
        className='btn btn-success btn-block mb-3 border border-0 fw-medium align-content-center'
        to='/user/post-management'
        style={{
          backgroundColor: transactionStatus === '00' ? '#82ce34' : '#8b98a9',
          minHeight: '40px',
          width: '50%',
        }}
      >
        OK
      </Link>
    </div>
  )
}

export default SuccessfulPayment
