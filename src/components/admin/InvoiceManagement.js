import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { getAllInvoices, clearErrors } from '../../actions/invoiceActions'
import Loader from '../layout/Loader'

const InvoiceManagement = () => {
  const alert = useAlert()
  const dispatch = useDispatch()
  const token = Cookies.get('accessToken')
  const [page, setPage] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchText, setSearchText] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  const { loading, invoices, error } = useSelector((state) => state.invoices)

  useEffect(() => {
    dispatch(getAllInvoices(token, currentPage, searchText, fromDate, toDate))
  }, [dispatch])

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
  }, [alert, error])

  useEffect(() => {
    if (JSON.stringify(invoices) !== '{}' && invoices !== undefined) {
      setPage(
        Math.round(
          invoices.total % 9 !== 0
            ? Math.floor(invoices.total / 9) + 1
            : Math.floor(invoices.total / 9)
        )
      )
    }
  }, [invoices])

  useEffect(() => {
    if (fromDate && toDate) {
      setSearchText('')
      dispatch(getAllInvoices(token, 1, searchText, fromDate, toDate))
      setCurrentPage(1)
    }
  }, [dispatch, fromDate, toDate])

  const ChoosePage = (indexPageCurrent) => {
    setCurrentPage(indexPageCurrent)
    dispatch(
      getAllInvoices(token, indexPageCurrent, searchText, fromDate, toDate)
    )
  }
  const NextAndPrevious = (Actions) => {
    if (Actions === 'next') {
      setCurrentPage(currentPage + 1)
      dispatch(
        getAllInvoices(token, currentPage + 1, searchText, fromDate, toDate)
      )
    } else {
      setCurrentPage(currentPage - 1)
      dispatch(
        getAllInvoices(token, currentPage - 1, searchText, fromDate, toDate)
      )
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      Search()
    }
  }
  async function Search() {
    setToDate('')
    setFromDate('')
    dispatch(getAllInvoices(token, 1, searchText, fromDate, toDate))
    setCurrentPage(1)
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
      <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom'>
        <h1 className='h2'>Quản lý Hóa đơn</h1>
      </div>
      <div className='d-flex bd-highlight mb-2 justify-content-end align-items-center'>
        <div class='d-flex me-3'>
          <label for='fromDate' class='col-form-label me-3'>
            Từ ngày:
          </label>
          <input
            type='date'
            id='fromDate'
            name='meeting-time'
            className='form-control'
            style={{ width: '200px' }}
            value={fromDate}
            max={toDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div class='d-flex me-3'>
          <label for='toDate' class='col-form-label me-3'>
            Đến ngày:
          </label>
          <input
            type='date'
            id='toDate'
            name='meeting-time'
            className='form-control'
            style={{ width: '200px' }}
            value={toDate}
            min={fromDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
        <div className='input-group' style={{ width: '20%' }}>
          <input
            type='text'
            className='form-control'
            placeholder='Tìm Kiếm'
            aria-label='Tìm kiếm'
            aria-describedby='button-addon2'
            onKeyDown={handleKeyPress}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            onClick={() => {
              Search()
            }}
            className='btn btn-outline-secondary'
            type='button'
            id='button-addon2'
          >
            <FontAwesomeIcon className='me-1 ' icon={faMagnifyingGlass} />
          </button>
        </div>
      </div>
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
                  <th style={{ whiteSpace: 'nowrap' }}>Mã người dùng</th>
                  <th style={{ whiteSpace: 'nowrap' }}>Mã tin đăng</th>
                  <th style={{ whiteSpace: 'nowrap' }}>Mã gói tin</th>
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
                    <td colSpan='7'>Không có hóa đơn nào</td>
                  </tr>
                ) : (
                  invoices.invoices?.map((invoice, index) => (
                    <tr key={invoice._id}>
                      <td>{index + 1 + 9 * (currentPage - 1)}</td>
                      <td>{invoice._id}</td>
                      <td>{invoice.userId}</td>
                      <td>{invoice.postId}</td>
                      <td>{invoice.packId}</td>
                      <td>{invoice.amount}</td>
                      <td>{invoice.period} ngày</td>
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
                          // onClick={() => setCateId(invoice._id)}
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

export default InvoiceManagement
