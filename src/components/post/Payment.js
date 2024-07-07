import React, { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { format } from 'date-fns'
import {
  payMent,
  payMentUpDate,
  CalculatePayMentUpDate,
  getUserPostDetails,
  clearErrors,
} from '../../actions/postActions'
import { getPacks } from '../../actions/packActions'
import Cookies from 'js-cookie'
import { useAlert } from 'react-alert'
import Loader from '../layout/Loader'

const Payment = () => {
  const navigate = useNavigate()
  const token = Cookies.get('accessToken')
  const { slug, type } = useParams()
  const alert = useAlert()
  const dispatch = useDispatch()
  const [calculateForUpdate, setCalculateForUpdate] = useState({})
  const [acceptDataCalculate, setAcceptDataCalculate] = useState(0)
  const [packId, setPackId] = useState('')
  const [packSelected, setPackSelected] = useState({})
  const [period, setPeriod] = useState('')

  const [newPackId, setNewPackId] = useState('')
  const [expandDay, setExpandDay] = useState('')
  const [packSelectedForUpdate, setPackSelectedForUpdate] = useState({})
  const [updatePackSelected, setUpdatePackSelected] = useState({})

  const [accesssLink, setAccesssLink] = useState(0)
  const { link, error } = useSelector((state) => state.payMent)
  const { post, loading } = useSelector((state) => state.postDetails)
  const { packs } = useSelector((state) => state.packs)
  const { result } = useSelector((state) => state.calculatePayment)

  useEffect(() => {
    if (acceptDataCalculate === 1) {
      setCalculateForUpdate(result)
    }
    setAcceptDataCalculate(1)
  }, [result])
  useEffect(() => {
    dispatch(getUserPostDetails(slug, token))
    dispatch(getPacks())
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
  }, [dispatch, navigate, alert, error])
  useEffect(() => {
    dispatch(getUserPostDetails(slug, token))
    dispatch(getPacks())
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
  }, [dispatch, navigate, alert, error])
  useEffect(() => {
    if (type === 'extend') {
      setPackId(post.type?._id)
      if (packs && post.type && packs.packs?.length > 0) {
        packs.packs.forEach((pack, index) => {
          if (pack._id === post.type?._id) {
            setPackSelected(pack)
          }
        })
      }
    }
    if (type === 'update') {
      setPackId(post.type?._id)
    }
    if (packs && post.type && packs.packs?.length > 0) {
      packs.packs.forEach((pack, index) => {
        if (pack._id === post.type?._id) setPackSelectedForUpdate(pack)
      })
    }
  }, [post, packs])

  const submitHandler = (e) => {
    e.preventDefault()
    if (type === 'update') {
      if (newPackId === '') {
        alert.error('Vui lòng chọn gói tin nâng cấp')
        return
      }
      if (expandDay === '') {
        alert.error('Vui lòng chọn thời hạn tin cho tin nâng cấp')
        return
      }
      dispatch(payMentUpDate(token, post._id, newPackId, expandDay))
    } else {
      if (packId === '') {
        alert.error('Vui lòng chọn gói tin đăng')
        return
      }
      if (period === '') {
        alert.error('Vui lòng chọn gói thời hạn tin')
        return
      }
      dispatch(payMent(token, post._id, packId, period, type))
    }
  }
  const getPackSelect = (e) => {
    setPackId(e.target.value)
    packs.packs.forEach((pack, index) => {
      if (pack._id === e.target.value) {
        setPackSelected(pack)
      }
      if (e.target.value === '') {
        setPackSelected({})
      }
    })
  }
  const getPackUpdateSelect = (e) => {
    setNewPackId(e.target.value)
    packs.packs.forEach((pack, index) => {
      if (pack._id === e.target.value) {
        setUpdatePackSelected(pack)
      }
      if (e.target.value === '') {
        setUpdatePackSelected({})
      }
    })
    dispatch(CalculatePayMentUpDate(token, post._id, e.target.value, expandDay))
  }
  const changeExpandDay = (e) => {
    setExpandDay(e.target.value)
    dispatch(CalculatePayMentUpDate(token, post._id, newPackId, e.target.value))
  }
  useEffect(() => {
    if (accesssLink === 1) {
      window.location.href = link.paymentUrl
    }
    setAccesssLink(1)
  }, [link])
  return (
    <>
      <nav aria-label='breadcrumb' className='bg-body-secondary px-3 py-1 mb-3'>
        <ol className='breadcrumb mb-0 py-1'>
          <li className='breadcrumb-item'>
            <Link to='/' className='text-decoration-none'>
              TroTot123
            </Link>
          </li>
          <li className='breadcrumb-item'>
            <Link to='/user/dashboard' className='text-decoration-none'>
              Quản lý
            </Link>
          </li>
          <li className='breadcrumb-item'>
            <Link to='/user/post-management' className='text-decoration-none'>
              Danh sách tin đăng
            </Link>
          </li>
          <li className='breadcrumb-item active' aria-current='page'>
            Thanh toán
          </li>
        </ol>
      </nav>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom'>
            <h1 className='h2'>Thanh toán tin</h1>
            {post.isExpired && (
              <h1 className='h3 text-danger'>
                Tin đã hết hạn vào ngày{' '}
                {post.endedAt && format(post.endedAt, 'dd/MM/yyyy-HH:mm:ss')}
              </h1>
            )}
          </div>
          <div className=' h-100'>
            <div className='row d-flex justify-content-center'>
              <div className='col mb-4 mb-md-0 align-content-center'>
                <h4>{post.title}</h4>
                <div className='rounded d-flex bg-body-tertiary'>
                  <div className='p-2'>
                    <label htmlFor='recipient-name' className='col-form-label '>
                      {type === 'update'
                        ? 'Gói tin hiện tại'
                        : 'Chọn gói tin đăng'}
                    </label>

                    <select
                      className='form-select'
                      aria-label='Default select example'
                      disabled={(type === 'update') === true ? 'readOnly' : ''}
                      value={packId}
                      onChange={(e) => getPackSelect(e)}
                    >
                      <option value=''>Gói tin</option>
                      {packs &&
                        packs.packs?.map((pack) => (
                          <option key={pack._id} value={pack._id}>
                            {pack.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className='p-2'>
                    <label htmlFor='recipient-name' className='col-form-label'>
                      {type === 'update' ? 'Hạn tin hiện tại' : 'Hạn tin đăng'}
                    </label>
                    <select
                      className='form-select'
                      aria-label='Default select example'
                      value={period}
                      disabled={(type === 'update') === true ? 'readOnly' : ''}
                      onChange={(e) => setPeriod(e.target.value)}
                    >
                      <option value=''>Hạn tin</option>
                      <option value='1'>1 Ngày</option>
                      <option value='3'>3 Ngày</option>
                      <option value='5'>5 Ngày</option>
                      <option value='7'>7 Ngày</option>
                      <option value='15'>15 Ngày</option>
                      <option value='30'>30 Ngày</option>
                    </select>
                  </div>
                  {/* /////////////////////// */}
                  {(type === 'update') === true ? (
                    <>
                      <div className='p-2'>
                        <label
                          htmlFor='recipient-name'
                          className='col-form-label'
                        >
                          Gói tin Nâng cấp
                        </label>
                        <select
                          className='form-select'
                          aria-label='Default select example'
                          key={newPackId}
                          onChange={(e) => getPackUpdateSelect(e)}
                        >
                          <option value=''>Gói tin</option>
                          {packs &&
                            packs.packs?.map((pack) =>
                              pack.priority > packSelectedForUpdate.priority ? (
                                <option key={pack._id} value={pack._id}>
                                  {pack.name}
                                </option>
                              ) : null
                            )}
                        </select>
                      </div>
                      <div className='p-2'>
                        <label
                          htmlFor='recipient-name'
                          className='col-form-label'
                        >
                          Hạn tin cho gói nâng cấp
                        </label>
                        <select
                          className='form-select'
                          aria-label='Default select example'
                          value={expandDay}
                          onChange={(e) => changeExpandDay(e)}
                        >
                          <option value=''>Hạn tin</option>
                          <option value='1'>1 Ngày</option>
                          <option value='3'>3 Ngày</option>
                          <option value='5'>5 Ngày</option>
                          <option value='7'>7 Ngày</option>
                          <option value='15'>15 Ngày</option>
                          <option value='30'>30 Ngày</option>
                        </select>
                      </div>
                    </>
                  ) : null}
                </div>
                <hr />
                <div className='pt-2'>
                  <form className='pb-3' onSubmit={submitHandler}>
                    <div className='d-flex flex-row pb-3'>
                      <p>Chọn phương thức thanh toán</p>
                    </div>
                    <div className='d-flex flex-row pb-3'>
                      <div className='d-flex align-items-center pe-2'>
                        <input
                          className='form-check-input'
                          type='radio'
                          name='radioNoLabel'
                          id='radioNoLabel1'
                          value=''
                          aria-label='...'
                          checked
                        />
                      </div>
                      <div className='rounded border d-flex w-100 p-3 justify-content-left'>
                        <img
                          src='https://cdn.haitrieu.com/wp-content/uploads/2022/10/Icon-VNPAY-QR.png'
                          style={{ width: '50px' }}
                          className='img-thumbnail'
                          alt=''
                        />
                        <p className='m-0 ms-2 align-content-center'>
                          Thanh toán bằng VNPay
                        </p>
                      </div>
                    </div>

                    {/* <div>{result}</div> */}
                    <div className='d-flex mt-3'>
                      <Link
                        to='/user/post-management'
                        className='btn btn-secondary d-grid w-50 me-3'
                      >
                        Quay lại
                      </Link>
                      <button
                        className='btn btn-success d-grid w-50'
                        type='submit'
                      >
                        Xác nhận thanh toán
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              {type === 'update' ? (
                <div style={{ fontSize: '20px' }} className='col-md-4 border'>
                  <span class='fw-bold'>Thông tin thanh toán</span>
                  <div class='d-flex justify-content-between mt-2'>
                    <span>Gói tin Hiện tại</span>{' '}
                    <span>{packSelectedForUpdate.name}</span>
                  </div>
                  <div class='d-flex justify-content-between mt-2'>
                    <span>Ngày tin còn lại</span>{' '}
                    <span>{calculateForUpdate.restDay}</span>
                  </div>
                  <div class='d-flex justify-content-between mt-2'>
                    <span>Giá tiền tin cũ</span>{' '}
                    <span>
                      {' '}
                      {packSelectedForUpdate.fee &&
                        parseInt(packSelectedForUpdate.fee).toLocaleString(
                          'vi-VN'
                        ) + 'đ'}
                    </span>
                  </div>
                  <div class='d-flex justify-content-between mt-2'>
                    <span>Gói tin nâng cấp</span>{' '}
                    <span>{updatePackSelected.name}</span>
                  </div>
                  <div class='d-flex justify-content-between mt-2'>
                    <span>Giá tiên tin mới</span>{' '}
                    <span>
                      {updatePackSelected.fee &&
                        parseInt(updatePackSelected.fee).toLocaleString(
                          'vi-VN'
                        ) + 'đ'}
                    </span>
                  </div>
                  <div class='d-flex justify-content-between mt-2'>
                    <span>Số ngày mua thêm</span> <span>{expandDay}</span>
                  </div>
                  <hr />
                  <div class='d-flex justify-content-between mt-2'>
                    <span>Total </span>{' '}
                    <span class='text-success'>
                      {calculateForUpdate.amount &&
                        parseInt(calculateForUpdate.amount).toLocaleString(
                          'vi-VN'
                        ) + 'đ'}
                    </span>
                  </div>
                </div>
              ) : (
                <div style={{ fontSize: '20px' }} className='col-md-4 border'>
                  <span class='fw-bold'>Thông tin thanh toán</span>
                  <div class='d-flex justify-content-between mt-2'>
                    <span>Gói tin bạn chọn</span>{' '}
                    <span>{packSelected.name && packSelected.name}</span>
                  </div>
                  <div class='d-flex justify-content-between mt-2'>
                    <span>Giá gói tin</span>{' '}
                    <span>
                      {' '}
                      {packSelected.fee &&
                        parseInt(packSelected.fee).toLocaleString('vi-VN') +
                          'đ'}
                    </span>
                  </div>
                  <div class='d-flex justify-content-between mt-2'>
                    <span>Gia hạn tin</span> <span>{period}</span>
                  </div>
                  <hr />
                  <div class='d-flex justify-content-between mt-2'>
                    <span>Total </span>{' '}
                    <span class='text-success'>
                      {packSelected.fee &&
                        parseInt(+period * packSelected.fee).toLocaleString(
                          'vi-VN'
                        ) + 'đ'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}
export default Payment
