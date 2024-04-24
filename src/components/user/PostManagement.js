import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { getUserPosts } from '../../actions/postActions'
import Cookies from 'js-cookie'

const PostManagement = () => {
  const alert = useAlert()
  const dispatch = useDispatch()
  const token = Cookies.get('accessToken')

  const { loading, posts, error } = useSelector((state) => state.userPosts)

  useEffect(() => {
    if (error) {
      return alert.error(error)
    }
    dispatch(getUserPosts(token))
  }, [dispatch, alert, error])

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
            <Link to='/user/dashboard' className='text-decoration-none'>
              Quản lý
            </Link>
          </li>
          <li className='breadcrumb-item active' aria-current='page'>
            Danh sách tin đăng
          </li>
        </ol>
      </nav>
      <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom'>
        <h1 className='h2'>Quản lý tin đăng</h1>
      </div>
      <div className='d-none d-md-block'>
        <div className='table-responsive'>
          <table className='table table_post_listing table-bordered _table-hover'>
            <thead>
              <tr>
                <th>Mã tin</th>
                <th style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                  Ảnh đại diện
                </th>
                <th>Tiêu đề</th>
                <th>Giá</th>
                <th style={{ whiteSpace: 'nowrap' }}>Ngày bắt đầu</th>
                <th style={{ whiteSpace: 'nowrap' }}>Ngày hết hạn</th>
                <th style={{ whiteSpace: 'nowrap' }}>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#653234</td>
                <td>
                  <div className='post_thumb'>
                    <a
                      href='https://phongtro123.com/cho-thue-phong-rong-mat-duong-man-thien-q-9-pr653234.html'
                      target='_blank'
                    >
                      <img src='https://pt123.cdn.static123.com/images/thumbs/450x300/fit/2024/04/23/439979152-377368798623213-8314998822001744453-n_1713882276.jpg' />
                    </a>
                  </div>
                </td>
                <td>
                  <span className='badge text-bg-warning me-1'>Phòng trọ</span>
                  <a
                    className='post_title'
                    target='_blank'
                    href='https://phongtro123.com/cho-thue-phong-rong-mat-duong-man-thien-q-9-pr653234.html'
                    style={{ color: '#055699' }}
                  >
                    Cho thuê phòng rộng, mát đường Man Thiện Q.9
                  </a>
                  <p style={{ marginTop: '10px' }}>
                    <strong>Địa chỉ:</strong> Đường Man Thiện, Phường Tân Phú,
                    Quận 9, Hồ Chí Minh
                  </p>
                  <div className='post_btn_toolbar mt-3'>
                    <a
                      href='https://phongtro123.com/quan-ly/tin-dang/gia-han-tin/653234'
                      className='btn btn-sm btn_danglai btn-warning text-success'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth={2}
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='feather feather-plus'
                      >
                        <line x1='12' y1='5' x2='12' y2='19'></line>
                        <line x1='5' y1='12' x2='19' y2='12'></line>
                      </svg>
                      Thêm ngày
                    </a>
                    <a
                      href='https://phongtro123.com/quan-ly/post/gan-nhan/653234'
                      className='btn btn-sm'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth={2}
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='feather feather-tag'
                      >
                        <path d='M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z'></path>
                        <line x1='7' y1='7' x2='7' y2='7'></line>
                      </svg>
                      Gắn nhãn
                    </a>
                    <a
                      href='https://phongtro123.com/quan-ly/sua-tin-dang/653234'
                      className='btn btn-sm'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth={2}
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='feather feather-edit-2'
                      >
                        <polygon points='16 3 21 8 8 21 3 21 3 16 16 3'></polygon>
                      </svg>
                      Sửa tin
                    </a>
                    <a
                      href='https://phongtro123.com/quan-ly/tin-dang/day-tin/653234'
                      className='btn btn-sm'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth={2}
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='feather feather-arrow-up'
                      >
                        <line x1='12' y1='19' x2='12' y2='5'></line>
                        <polyline points='5 12 12 5 19 12'></polyline>
                      </svg>
                      Đẩy tin
                    </a>
                    <a
                      href='https://phongtro123.com/quan-ly/tin-dang/nang-cap-tin/653234'
                      className='btn btn-sm'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth={2}
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='feather feather-star'
                      >
                        <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'></polygon>
                      </svg>
                      Nâng cấp VIP
                    </a>
                    <a
                      href='https://phongtro123.com/quan-ly/tin-dang/an-tin/653234'
                      className='btn btn-sm'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth={2}
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='feather feather-eye-off'
                      >
                        <path d='M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24'></path>
                        <line x1='1' y1='1' x2='23' y2='23'></line>
                      </svg>
                      Ẩn tin
                    </a>
                  </div>
                  <span
                    style={{
                      display: 'block',
                      color: '#333',
                      marginTop: '10px',
                    }}
                  >
                    <em>Lượt hiển thị: 1</em>
                  </span>
                  <span
                    style={{
                      display: 'block',
                      color: '#999',
                      marginTop: '10px',
                    }}
                  >
                    Cập nhật gần nhất: 1 phút trước
                  </span>
                </td>
                <td>
                  <div className='post_price'>2.8 triệu/tháng</div>
                </td>
                <td>23/04/2024 21:26:13</td>
                <td>28/04/2024 21:26:13</td>
                <td>
                  <span
                    className='text-success label-success'
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    Đang hiển thị
                  </span>
                </td>
              </tr>
              <tr>
                <td>#653232</td>
                <td>
                  <div className='post_thumb'>
                    <a href='#' target='_blank'>
                      <img src='https://pt123.cdn.static123.com/images/thumbs/450x300/fit/2024/04/23/439805093-442997208097989-8836608322787762254-n_1713880960.jpg' />
                    </a>
                  </div>
                </td>
                <td>
                  <a
                    className='post_title'
                    target='_blank'
                    href='#'
                    style={{ color: '#055699' }}
                  >
                    Studio CHDV full nội thất mới cao cấp Đường 22 Linh Đông,
                    Phạm Văn Đồng Thủ Đức
                  </a>
                  <p style={{ marginTop: '10px' }}>
                    <strong>Địa chỉ:</strong> 22/52 Đường số 22, Phường Linh
                    Đông, Thủ Đức, Hồ Chí Minh
                  </p>
                  <div className='post_btn_toolbar mt-3'>
                    <a
                      href='https://phongtro123.com/quan-ly/tin-dang/dang-lai-tin/653232'
                      className='btn btn-sm btn_danglai'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth={2}
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='feather feather-refresh-ccw'
                      >
                        <polyline points='1 4 1 10 7 10'></polyline>
                        <polyline points='23 20 23 14 17 14'></polyline>
                        <path d='M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15'></path>
                      </svg>
                      Sửa và Đăng lại
                    </a>
                  </div>
                  <span
                    style={{
                      display: 'block',
                      color: '#333',
                      marginTop: '10px',
                    }}
                  >
                    <em>Lượt hiển thị: 1</em>
                  </span>
                  <span
                    style={{
                      display: 'block',
                      color: '#999',
                      marginTop: '10px',
                    }}
                  >
                    Cập nhật gần nhất: 24 phút trước
                  </span>
                </td>
                <td>
                  <div className='post_price'>5 triệu/tháng</div>
                </td>
                <td>23/04/2024 21:08:03</td>
                <td>23/04/2024 21:08:03</td>
                <td>
                  <span
                    className='text text-warning'
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    Tin đã ẩn
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default PostManagement
