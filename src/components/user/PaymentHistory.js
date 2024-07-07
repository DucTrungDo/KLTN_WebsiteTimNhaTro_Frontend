import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'

import { getUserInvoices, clearErrors } from '../../actions/invoiceActions'

import Loader from '../layout/Loader'

const PaymentHistory = () => {
  const alert = useAlert()
  const dispatch = useDispatch()
  const token = Cookies.get('accessToken')
  const [page, setPage] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const { loading, invoices, error } = useSelector((state) => state.invoices)

  useEffect(() => {
    dispatch(getUserInvoices(token, currentPage))

    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
  }, [dispatch, alert, error])

  useEffect(() => {
    if (JSON.stringify(invoices) !== '{}' && invoices !== undefined) {
      setPage(
        Math.round(
          invoices.total % 10 !== 0
            ? Math.floor(invoices.total / 10) + 1
            : Math.floor(invoices.total / 10)
        )
      )
    }
  }, [invoices])

  const ChoosePage = (indexPageCurrent) => {
    setCurrentPage(indexPageCurrent)
    dispatch(getUserInvoices(token, indexPageCurrent))
  }

  const NextAndPrevious = (Actions) => {
    if (Actions === 'next') {
      setCurrentPage(currentPage + 1)
      dispatch(getUserInvoices(token, currentPage + 1))
    } else {
      setCurrentPage(currentPage - 1)
      dispatch(getUserInvoices(token, currentPage - 1))
    }
  }

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
                  <th style={{ whiteSpace: 'nowrap' }}>Stt</th>
                  <th style={{ whiteSpace: 'nowrap' }}>Mã hóa đơn</th>
                  <th style={{ whiteSpace: 'nowrap' }}>Tin đăng</th>
                  <th style={{ whiteSpace: 'nowrap' }}>Gói tin</th>
                  <th style={{ whiteSpace: 'nowrap' }}>Phí</th>
                  <th style={{ whiteSpace: 'nowrap' }}>Thời hạn</th>
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
                  invoices.invoices?.map((invoice, index) => (
                    <tr key={invoice._id}>
                      <td>{index + 1 + 10 * (currentPage - 1)}</td>
                      <td>{invoice._id}</td>
                      <td>{invoice.postId?.title}</td>
                      <td>{invoice.packId?.name}</td>
                      <td>{invoice.amount}</td>
                      <td>{invoice.period} ngày</td>
                      <td>{invoice.method}</td>
                      <td>{format(invoice.createdAt, 'HH:mm- dd/MM/yyyy')}</td>
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
            <nav aria-label='...'>
              <ul className='pagination justify-content-end'>
                <li
                  className={
                    currentPage === 1 ? 'page-item disabled' : 'page-item'
                  }
                >
                  <button
                    onClick={() => {
                      NextAndPrevious('previous')
                    }}
                    className='page-link'
                  >
                    Previous
                  </button>
                </li>
                {Array.from({ length: page }, (_, index) => (
                  <li
                    key={index}
                    className={
                      currentPage === index + 1
                        ? 'page-item active '
                        : 'page-item'
                    }
                  >
                    <button
                      onClick={() => {
                        ChoosePage(index + 1)
                      }}
                      className='page-link'
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li
                  className={
                    currentPage === page ? 'page-item disabled' : 'page-item'
                  }
                >
                  <button
                    onClick={() => {
                      NextAndPrevious('next')
                    }}
                    className='page-link'
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  )
}

export default PaymentHistory
