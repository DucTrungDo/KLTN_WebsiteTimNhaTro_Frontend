import React, { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { format } from 'date-fns'
import {
  payMent,
  getUserPostDetails,
  clearErrors,
} from '../../actions/postActions'
import { getPacks } from '../../actions/packActions'
import Cookies from 'js-cookie'
import { useAlert } from 'react-alert'
const Payment = () => {
  const navigate = useNavigate()
  const token = Cookies.get('accessToken')
  const { slug, type } = useParams()
  const alert = useAlert()
  const dispatch = useDispatch()
  const [packId, setPackId] = useState('')
  const [period, setPeriod] = useState('')
  const [accesssLink, setAccesssLink] = useState(0)
  const { link, error } = useSelector((state) => state.payMent)
  const { post } = useSelector((state) => state.postDetails)
  const { packs } = useSelector((state) => state.packs)
  useEffect(() => {
    dispatch(getUserPostDetails(slug, token))
    dispatch(getPacks())
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
  }, [dispatch, navigate, alert, error])
  useEffect(() => {}, [post])
  useEffect(() => {
    if (type === 'extend') {
      setPackId('6683fc2e4c002d0f4c5df3a1')
    }
  }, [type])
  const submitHandler = (e) => {
    if (packId === '') {
      alert.error('Vui lòng chọn gói tin đăng')
      return
    }
    if (period === '') {
      alert.error('Vui lòng chọn gói thời hạn tin')
      return
    }
    e.preventDefault()
    dispatch(payMent(token, post._id, packId, period, type))
  }
  useEffect(() => {
    if (accesssLink === 1) {
      window.location.href = link.paymentUrl
    }
    setAccesssLink(1)
  }, [link])
  const comPareDay = () => {
    const currentDate = new Date()
    const dateEndOfPost = new Date(post.endedAt)
    if (
      currentDate.getFullYear() > dateEndOfPost.getUTCFullYear() ||
      currentDate.getMonth() > dateEndOfPost.getUTCMonth() ||
      currentDate.getDate() > dateEndOfPost.getUTCDate() ||
      currentDate.getHours() > dateEndOfPost.getUTCHours() ||
      currentDate.getMinutes() > dateEndOfPost.getUTCMinutes() ||
      currentDate.getSeconds() > dateEndOfPost.getUTCSeconds()
    ) {
      return true
    }
    return false
  }
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
          <li className='breadcrumb-item active' aria-current='page'>
            Thanh toán
          </li>
        </ol>
      </nav>
      <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom'>
        <h1 className='h2'>Thanh toán tin</h1>
        {comPareDay && post.endedAt && (
          <h1 className='h3 text-danger'>
            Tin đã hết hạn vào ngày{' '}
            {post.endedAt && format(post.endedAt, 'dd/MM/yyyy-HH:mm:ss')}
          </h1>
        )}
      </div>
      <div className=' h-100'>
        <div className='row d-flex justify-content-center'>
          <div className='mb-4 mb-md-0 align-content-center'>
            <h4>{post.title}</h4>
            <div className='rounded d-flex bg-body-tertiary'>
              <div className='p-2'>
                <label for='recipient-name' className='col-form-label'>
                  Chọn gòi tin đăng
                </label>
                <select
                  className='form-select'
                  aria-label='Default select example'
                  value={packId}
                  onChange={(e) => setPackId(e.target.value)}
                >
                  <option value=''></option>
                  {packs &&
                    packs.packs?.map((pack) => (
                      <option key={pack._id} value={pack._id}>
                        {pack.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className='p-2'>
                <label for='recipient-name' className='col-form-label'>
                  Hạn tin đăng
                </label>

                <select
                  className='form-select'
                  aria-label='Default select example'
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                >
                  <option value=''></option>
                  <option value='1'>1 Ngày</option>
                  <option value='3'>3 Ngày</option>
                  <option value='5'>5 Ngày</option>
                  <option value='7'>7 Ngày</option>
                  <option value='15'>15 Ngày</option>
                  <option value='30'>30 Ngày</option>
                </select>
              </div>
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
                      thanh toán bằng vnpay
                    </p>
                  </div>
                </div>

                <div className='d-flex mt-3'>
                  <Link
                    to='/user/post-management'
                    className='btn btn-secondary d-grid w-50 me-3'
                  >
                    Quay lại
                  </Link>
                  <button className='btn btn-success d-grid w-50' type='submit'>
                    Xác nhận thanh toán
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Payment
