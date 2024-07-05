import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { payMent } from '../../actions/postActions'
const Payment = () => {
  const navigate = useNavigate()
  const { slug } = useParams()
  const { link } = useSelector((state) => state.payMent)
  const submitHandler = (e) => {
    e.preventDefault()
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
      </div>
      <div className=' h-100'>
        <div className='row d-flex justify-content-center'>
          <div className='mb-4 mb-md-0 align-content-center'>
            <h4>SIÊU PHẨM KHAI TRƯƠNG TÒA TRỌ NGAY GẦN HUB - SPKT</h4>
            <div className='rounded d-flex bg-body-tertiary'>
              <div className='p-2'>
                <label for='recipient-name' className='col-form-label'>
                  Chọn gòi tin đăng
                </label>
                <select
                  className='form-select'
                  aria-label='Default select example'
                >
                  <option value='1'>gói 1</option>
                  <option value='2'>gói 2</option>
                  <option value='3'>gói 3</option>
                </select>
              </div>
              <div className='p-2'>
                <label for='recipient-name' className='col-form-label'>
                  hạn tin đăng
                </label>
                <input
                  type='datetime-local'
                  id='meeting-time'
                  name='meeting-time'
                  className='w-100 form-control'
                />
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
                <div className='d-flex flex-row'>
                  <div className='d-flex align-items-center pe-2'>
                    <input
                      className='form-check-input'
                      type='radio'
                      name='radioNoLabel'
                      id='radioNoLabel2'
                      value=''
                      aria-label='...'
                    />
                  </div>
                  <div className='rounded border d-flex w-100 p-3 justify-content-left'>
                    <img
                      src=' https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Circle.png'
                      style={{ width: '50px' }}
                      className='img-thumbnail'
                      alt=''
                    />
                    <p className='m-0 ms-2 align-content-center'>
                      thanh toán bằng momo
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
