import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { format } from 'date-fns'

import { getUserInvoices, clearErrors } from '../../actions/invoiceActions'

import Loader from '../layout/Loader'

const PaymentHistory = () => {
  const alert = useAlert()
  const dispatch = useDispatch()
  const token = Cookies.get('accessToken')

  const { loading, invoices, error } = useSelector((state) => state.invoices)

  useEffect(() => {
    dispatch(getUserInvoices(token))

    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
  }, [dispatch, alert])

  return (
    <div>
      <nav aria-label='breadcrumb' className='bg-body-secondary px-3 py-1 mb-3'>
        <ol className='breadcrumb mb-0 py-1'>
          <li className='breadcrumb-item'>
            <Link to='/' className='text-decoration-none'>
              TroTot123
            </Link>
          </li>
          <li className='breadcrumb-item'>
            <Link to='/admin/dashboard' className='text-decoration-none'>
              Quản lý
            </Link>
          </li>
          <li className='breadcrumb-item active' aria-current='page'>
            Quản lý hóa đơn
          </li>
        </ol>
      </nav>
      {loading || !invoices ? (
        <Loader />
      ) : (
        <div className='d-md-block'>
          <div className='table-responsive'>
            <table className='table table_post_listing table-bordered _table-hover'>
              <thead>
                <tr>
                  <th style={{ whiteSpace: 'nowrap' }}>Mã hóa đơn</th>
                  <th style={{ whiteSpace: 'nowrap' }}>Mã tin đăng</th>
                  <th style={{ whiteSpace: 'nowrap' }}>Mã gói tin</th>
                  <th style={{ whiteSpace: 'nowrap' }}>Phí</th>
                  <th style={{ whiteSpace: 'nowrap' }}>Phương thức</th>
                  <th style={{ whiteSpace: 'nowrap' }}>Ngày thanh toán</th>
                  {/* <th
                    style={{
                      textAlign: 'center',
                      width: '150px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Hoạt động
                  </th> */}
                </tr>
              </thead>
              <tbody>
                {invoices.count === 0 || !invoices.invoices ? (
                  <tr>
                    <td colSpan='6'>Không có hóa đơn nào</td>
                  </tr>
                ) : (
                  invoices.invoices?.map((invoice) => (
                    <tr key={invoice._id}>
                      <td>{invoice._id}</td>
                      <td>{invoice.postId}</td>
                      <td>{invoice.packId}</td>
                      <td>{invoice.amount}</td>
                      <td>{invoice.method}</td>
                      <td>
                        {format(invoice.createdAt, 'HH:mm:ss - dd/MM/yyyy')}
                      </td>
                      {/* <td className='d-block'>
                        <button
                          className='btn btn-danger btn-sm text-center w-100'
                          type='button'
                          // data-bs-toggle='modal'
                          // data-bs-target='#deleteModal'
                          // onClick={() => setCateId(cate._id)}
                        >
                          <FontAwesomeIcon
                            className='me-1 '
                            icon={faTrashCan}
                          />
                          Xoá
                        </button>
                      </td> */}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default PaymentHistory
