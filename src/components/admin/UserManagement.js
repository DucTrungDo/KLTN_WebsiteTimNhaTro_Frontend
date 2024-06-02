import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faLock, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateProfileUserAdmin,
  blockUser,
  getAlluser,
  clearErrors,
  unBlockUser,
  deleteUserTemporary,
  deleteUserPermanently,
  restoreUserDelete,
} from '../../actions/userActions'
import { useAlert } from 'react-alert'
import Cookies from 'js-cookie'
import Loader from '../layout/Loader'
import NewpostModal from './NewpostModal'
import React, { useState, useEffect } from 'react'
import { UPDATE_PROFILE_USER_ADMIN_RESET } from '../../constants/userConstants'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
const UserManagement = () => {
  const token = Cookies.get('accessToken')
  const dispatch = useDispatch()
  const alert = useAlert()
  const [page, setPage] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const [searchText, setSearchText] = useState('')
  const [statusGet, setStatusGet] = useState('allUser')

  const [userDetail, setUserDetail] = useState({})

  const { error, loading, users, isUpdated, user } = useSelector(
    (state) => state.user
  )
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    if (isUpdated) {
      alert.success('Cập nhật thành công')
      dispatch({
        type: UPDATE_PROFILE_USER_ADMIN_RESET,
      })
    }
    dispatch(getAlluser(token, currentPage, statusGet, searchText))
  }, [dispatch, alert, error, isUpdated])
  useEffect(() => {
    if (JSON.stringify(users) !== '{}' && users !== undefined) {
      setPage(
        Math.round(
          users.total % 10 !== 0
            ? Math.floor(users.total / 10) + 1
            : Math.floor(users.total / 10)
        )
      )
    }
  }, [users])

  useEffect(() => {
    dispatch(getAlluser(token, 1, statusGet, searchText))
    setCurrentPage(1)
  }, [statusGet])

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  async function ResetOut() {
    setUserDetail({})
  }
  async function ChoisePage(indexPageCurrent) {
    setCurrentPage(indexPageCurrent)
    dispatch(getAlluser(token, indexPageCurrent, statusGet, searchText))
  }
  async function NextAndPrevious(Actions) {
    if (Actions === 'next') {
      setCurrentPage(currentPage + 1)
      dispatch(getAlluser(token, currentPage + 1, statusGet, searchText))
    } else {
      setCurrentPage(currentPage - 1)
      dispatch(getAlluser(token, currentPage - 1, statusGet, searchText))
    }
  }
  async function ViewDetail(user) {
    setUserDetail(user)
  }
  async function updateProfile() {
    let userDetailCopy = { ...userDetail }
    delete userDetailCopy._id
    delete userDetailCopy.email
    delete userDetailCopy.updatedAt
    dispatch(updateProfileUserAdmin(token, userDetailCopy, userDetail._id))
    setCurrentPage(1)
  }
  async function BlockUser() {
    dispatch(blockUser(token, userDetail._id))
    setCurrentPage(1)
  }
  async function UnBlockUser() {
    dispatch(unBlockUser(token, userDetail._id))
    setCurrentPage(1)
  }
  async function DeleteUserTemporary() {
    dispatch(deleteUserTemporary(token, userDetail._id))
    setCurrentPage(1)
  }
  async function DeleteUserPermanently() {
    dispatch(deleteUserPermanently(token, userDetail._id))
    setCurrentPage(1)
  }
  async function RestoreUserDeleted() {
    dispatch(restoreUserDelete(token, userDetail._id))
    setCurrentPage(1)
  }
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      Search()
    }
  }
  async function Search() {
    dispatch(getAlluser(token, 1, statusGet, searchText))
    setCurrentPage(1)
  }
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <nav
            aria-label='breadcrumb'
            className='bg-body-secondary px-3 py-1 mb-3'
          >
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
                Danh sách Người dùng
              </li>
            </ol>
          </nav>
          <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom'>
            <h1 className='h2'>Quản lý người dùng</h1>
          </div>
          <div class='d-flex bd-highlight mb-2 justify-content-end align-items-center'>
            <div className='me-2'>
              <div class='input-group me-3 '>
                <input
                  type='text'
                  class='form-control'
                  placeholder='Tìm Kiếm'
                  aria-label='Tìm kiếm'
                  aria-describedby='button-addon2'
                  onKeyPress={handleKeyPress}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <button
                  onClick={() => {
                    Search()
                  }}
                  class='btn btn-outline-secondary'
                  type='button'
                  id='button-addon2'
                >
                  <FontAwesomeIcon className='me-1 ' icon={faMagnifyingGlass} />
                </button>
              </div>
            </div>
            <div class='bd-highlight'>
              <select
                class='form-select'
                aria-label='Default select example'
                value={statusGet}
                onChange={(e) => setStatusGet(e.target.value)}
              >
                <option value='allUser'>User đang hoạt động</option>
                <option value='delete'>Thùng rác</option>
                <option value='moderator'>Danh sách Moderator</option>
              </select>
            </div>
          </div>
          <div class='d-md-block'>
            <div class='table-responsive'>
              <table class='table table_post_listing table-bordered _table-hover'>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                      No.
                    </th>
                    <th style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                      Avatar
                    </th>
                    <th style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                      Thông tin người dùng
                    </th>
                    <th style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                      Quyền
                    </th>
                    <th style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                      Ngày bắt tạo
                    </th>
                    <th style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                      Ngày cập nhật
                    </th>
                    <th style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                      Trạng thái
                    </th>
                    <th
                      style={{
                        textAlign: 'center',
                        width: '150px',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Hoạt động
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users &&
                    users.users?.map((user, index) => (
                      <tr>
                        <td>{index + 1 + 10 * (currentPage - 1)}</td>
                        <td>
                          <div className='user_avatar'>
                            <img
                              src='/images/default_avatar.jpg'
                              className='user-info'
                            />
                          </div>
                        </td>
                        <td>
                          <div>
                            <span class='fw-bold'>Tên: </span> {user.name}
                          </div>
                          <div>
                            <span class='fw-bold'>Email: </span>
                            {user.email}
                          </div>
                          <div>
                            <span class='fw-bold'>SDT: </span>
                            {user.phone}
                          </div>
                          <div>
                            <span class='fw-bold'>ZaLo: </span>
                            {user.zalo}
                          </div>
                          <div>
                            <span class='fw-bold'>Facebook: </span>
                            {user.facebook}
                          </div>
                          <div>
                            <span class='fw-bold'>Giới tính: </span>
                            {user.gender}
                          </div>
                          <div>
                            <span class='fw-bold'>Ngày sinh: </span>
                            {user.birthday}
                          </div>
                        </td>
                        <td>
                          <p style={{ margin: '0px' }}>
                            {user.isAdmin
                              ? 'Admin'
                              : user.isModerator
                              ? 'Moderator'
                              : 'User'}
                          </p>
                        </td>
                        <td>23/04/2024 21:26:13</td>
                        <td>28/04/2024 21:26:13</td>
                        <td>
                          <div class='post_price'>
                            {user.isVerified
                              ? user.isLocked
                                ? 'bị khoá'
                                : 'hoạt động'
                              : 'Chưa sát thực'}
                          </div>
                        </td>

                        <td style={{ display: 'block' }}>
                          <button
                            data-bs-toggle='modal'
                            data-bs-target='#exampleModal'
                            data-bs-whatever='@mdo'
                            onClick={() => {
                              ViewDetail(user)
                            }}
                            style={{
                              textAlign: 'left',
                              marginTop: '5px',
                              width: '100%',
                            }}
                            className='btn btn-primary btn-sm '
                          >
                            <FontAwesomeIcon className='me-1 ' icon={faEye} />
                            Xem chi tiết
                          </button>
                          {statusGet === 'delete' ? (
                            <>
                              <button
                                data-bs-toggle='modal'
                                data-bs-target='#deletedPermanently'
                                data-bs-whatever='@mdo'
                                style={{
                                  textAlign: 'left',
                                  marginTop: '5px',
                                  width: '100%',
                                }}
                                onClick={() => {
                                  ViewDetail(user)
                                }}
                                className='btn btn-danger btn-sm '
                              >
                                <FontAwesomeIcon
                                  className='me-1 '
                                  icon={faTrashCan}
                                />
                                Xoá vĩnh viễn
                              </button>
                              <button
                                data-bs-toggle='modal'
                                data-bs-target='#restoreuser'
                                data-bs-whatever='@mdo'
                                style={{
                                  textAlign: 'left',
                                  marginTop: '5px',
                                  width: '100%',
                                }}
                                onClick={() => {
                                  ViewDetail(user)
                                }}
                                className='btn btn-success btn-sm '
                              >
                                <FontAwesomeIcon
                                  className='me-1 '
                                  icon={faTrashCan}
                                />
                                Khôi phục
                              </button>
                            </>
                          ) : (
                            <button
                              data-bs-toggle='modal'
                              data-bs-target='#deletetemporary'
                              data-bs-whatever='@mdo'
                              style={{
                                textAlign: 'left',
                                marginTop: '5px',
                                width: '100%',
                              }}
                              onClick={() => {
                                ViewDetail(user)
                              }}
                              className='btn btn-danger btn-sm '
                            >
                              <FontAwesomeIcon
                                className='me-1 '
                                icon={faTrashCan}
                              />
                              Xoá tài khoản
                            </button>
                          )}

                          {user.isLocked ? (
                            <button
                              data-bs-toggle='modal'
                              data-bs-target='#AccessUnBlocksModal'
                              data-bs-whatever='@mdo'
                              style={{
                                textAlign: 'left',
                                marginTop: '5px',
                                width: '100%',
                              }}
                              onClick={() => {
                                ViewDetail(user)
                              }}
                              className={
                                statusGet === 'delete'
                                  ? 'btn btn-warning btn-sm d-none'
                                  : 'btn btn-warning btn-sm'
                              }
                            >
                              <FontAwesomeIcon
                                className='me-1 '
                                icon={faLock}
                              />
                              Mở tài khoản
                            </button>
                          ) : (
                            <button
                              data-bs-toggle='modal'
                              data-bs-target='#AccessBlocksModal'
                              data-bs-whatever='@mdo'
                              style={{
                                textAlign: 'left',
                                marginTop: '5px',
                                width: '100%',
                              }}
                              onClick={() => {
                                ViewDetail(user)
                              }}
                              className={
                                statusGet === 'delete'
                                  ? 'btn btn-warning btn-sm d-none'
                                  : 'btn btn-warning btn-sm'
                              }
                            >
                              <FontAwesomeIcon
                                className='me-1 '
                                icon={faLock}
                              />
                              khoá tài khoản
                            </button>
                          )}
                          <button
                            variant='primary'
                            style={{
                              textAlign: 'left',
                              marginTop: '5px',
                              width: '100%',
                            }}
                            onClick={() => {
                              ViewDetail(user)
                              handleShow()
                            }}
                            className={
                              statusGet === 'delete'
                                ? 'btn btn-success btn-sm d-none'
                                : 'btn btn-success btn-sm'
                            }
                          >
                            <FontAwesomeIcon className='me-1 ' icon={faLock} />
                            Hỗ trợ đăng tin
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <nav aria-label='...'>
                <ul class='pagination justify-content-end'>
                  <li
                    class={
                      currentPage === 1 ? 'page-item disabled' : 'page-item'
                    }
                  >
                    <button
                      onClick={() => {
                        NextAndPrevious('previous')
                      }}
                      class='page-link'
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
                          ChoisePage(index + 1)
                        }}
                        className='page-link'
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li
                    class={
                      currentPage === page ? 'page-item disabled' : 'page-item'
                    }
                  >
                    <button
                      onClick={() => {
                        NextAndPrevious('next')
                      }}
                      class='page-link'
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <div
            class='modal fade'
            id='exampleModal'
            tabindex='-1'
            aria-labelledby='exampleModalLabel'
            aria-hidden='true'
          >
            <div class='modal-dialog'>
              <div class='modal-content'>
                <div class='modal-header'>
                  <h5 class='modal-title' id='exampleModalLabel'>
                    Thông Tin chi tiết
                  </h5>
                  <button
                    type='button'
                    class='btn-close'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                  ></button>
                </div>
                <div class='modal-body'>
                  <form>
                    <div>
                      <label for='recipient-name' class='col-form-label'>
                        Avatar
                      </label>
                    </div>
                    <div
                      class='mb-3'
                      style={{
                        height: '50px',
                      }}
                    >
                      <img
                        src='/images/default_avatar.jpg'
                        className='user-info'
                      />
                    </div>
                    <div class='mb-3'>
                      <label for='recipient-name' class='col-form-label'>
                        Mã người dùng
                      </label>
                      <input
                        type='text'
                        class='form-control'
                        id='recipient-name'
                        value={userDetail._id}
                        readOnly='ReadOnly'
                      />
                    </div>

                    <div class='mb-3'>
                      <label for='recipient-name' class='col-form-label'>
                        Tên người dùng
                      </label>
                      <input
                        type='text'
                        class='form-control'
                        id='recipient-name'
                        value={userDetail.name}
                        onChange={(e) =>
                          setUserDetail((prevState) => ({
                            ...prevState,
                            name: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div class='mb-3'>
                      <label for='recipient-name' class='col-form-label'>
                        Địa chỉ email
                      </label>
                      <input
                        type='text'
                        class='form-control'
                        id='recipient-name'
                        value={userDetail.email}
                        onChange={(e) =>
                          setUserDetail((prevState) => ({
                            ...prevState,
                            email: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div class='mb-3'>
                      <label for='recipient-name' class='col-form-label'>
                        birthday
                      </label>

                      <input
                        type='datetime-local'
                        id='meeting-time'
                        name='meeting-time'
                        className='w-100 form-control'
                        value={
                          userDetail.birthday === undefined
                            ? ''
                            : userDetail.birthday.substring(
                                0,
                                userDetail.birthday.length - 1
                              )
                        }
                        onChange={(e) =>
                          setUserDetail((prevState) => ({
                            ...prevState,
                            birthday: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div class='mb-3'>
                      <label for='recipient-name' class='col-form-label'>
                        facebook
                      </label>
                      <input
                        type='text'
                        class='form-control'
                        id='recipient-name'
                        value={
                          userDetail.facebook === undefined
                            ? ''
                            : userDetail.facebook
                        }
                        onChange={(e) =>
                          setUserDetail((prevState) => ({
                            ...prevState,
                            facebook: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div class='mb-3'>
                      <label for='recipient-name' class='col-form-label'>
                        Giới tính
                      </label>
                      <select
                        id='province_id'
                        name='province_id'
                        className='form-control js-select-tinhthanhpho select2-hidden-accessible'
                        required=''
                        data-msg-required='Chưa chọn Tỉnh/TP'
                        tabIndex='-1'
                        aria-hidden='true'
                        value={
                          userDetail.gender === undefined
                            ? ''
                            : userDetail.gender
                        }
                        onChange={(e) =>
                          setUserDetail((prevState) => ({
                            ...prevState,
                            gender: e.target.value,
                          }))
                        }
                      >
                        <option value=''></option>
                        <option value='male'>Nam</option>
                        <option value='female'>Nữ</option>
                      </select>
                    </div>
                    <div class='mb-3'>
                      <label for='recipient-name' class='col-form-label'>
                        phone
                      </label>
                      <input
                        type='text'
                        class='form-control'
                        id='recipient-name'
                        value={
                          userDetail.phone === undefined ? '' : userDetail.phone
                        }
                        onChange={(e) =>
                          setUserDetail((prevState) => ({
                            ...prevState,
                            phone: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div class='mb-3'>
                      <label for='recipient-name' class='col-form-label'>
                        zalo
                      </label>
                      <input
                        type='text'
                        class='form-control'
                        id='recipient-name'
                        value={
                          userDetail.zalo === undefined ? '' : userDetail.zalo
                        }
                        onChange={(e) =>
                          setUserDetail((prevState) => ({
                            ...prevState,
                            zalo: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div class='mb-3'>
                      <label for='recipient-name' class='col-form-label'>
                        Quyền
                      </label>
                      <select
                        id='province_id'
                        name='province_id'
                        className='form-control js-select-tinhthanhpho select2-hidden-accessible'
                        required=''
                        data-msg-required='Chưa chọn Tỉnh/TP'
                        tabIndex='-1'
                        aria-hidden='true'
                        value={
                          userDetail.isAdmin
                            ? 'Admin'
                            : userDetail.isModerator
                            ? 'Moderator'
                            : 'User'
                        }
                        onChange={(e) =>
                          setUserDetail((prevState) => ({
                            ...prevState,
                            isAdmin: e.target.value === 'Admin' ? true : false,
                            isModerator:
                              e.target.value === 'Moderator' ? true : false,
                          }))
                        }
                      >
                        <option value='Admin'>Admin</option>
                        <option value='Moderator'>Moderator</option>
                        <option value='User'>User</option>
                      </select>
                    </div>
                    <div class='mb-3'>
                      <label for='recipient-name' class='col-form-label'>
                        Ngày tạo
                      </label>
                      <input
                        type='datetime-local'
                        id='meeting-time'
                        name='meeting-time'
                        className='w-100 form-control'
                        value={
                          userDetail.createdAt === undefined
                            ? ''
                            : userDetail.createdAt.substring(
                                0,
                                userDetail.createdAt.length - 1
                              )
                        }
                        onChange={(e) =>
                          setUserDetail((prevState) => ({
                            ...prevState,
                            createdAt: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div class='mb-3'>
                      <label for='recipient-name' class='col-form-label'>
                        Ngày câp nhật
                      </label>
                      <input
                        type='datetime-local'
                        id='meeting-time'
                        name='meeting-time'
                        className='w-100 form-control'
                        value={
                          userDetail.updatedAt === undefined
                            ? ''
                            : userDetail.updatedAt.substring(
                                0,
                                userDetail.updatedAt.length - 1
                              )
                        }
                        onChange={(e) =>
                          setUserDetail((prevState) => ({
                            ...prevState,
                            updatedAt: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div class='mb-3'>
                      <label for='recipient-name' class='col-form-label'>
                        Trạng thái
                      </label>
                      <input
                        type='text'
                        class='form-control'
                        id='recipient-name'
                        value={
                          userDetail.isVerified
                            ? userDetail.isLocked
                              ? 'bị khoá'
                              : 'hoạt động'
                            : 'Chưa sát thực'
                        }
                      />
                    </div>
                  </form>
                </div>
                <div class='modal-footer'>
                  <button
                    type='button'
                    class='btn btn-secondary'
                    data-bs-dismiss='modal'
                  >
                    Đóng
                  </button>
                  <button
                    type='button'
                    class='btn btn-primary '
                    data-bs-dismiss='modal'
                    onClick={() => {
                      updateProfile()
                    }}
                  >
                    Cập nhật
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            class='modal fade'
            id='restoreuser'
            tabindex='-1'
            aria-labelledby='exampleModalLabel'
            aria-hidden='true'
          >
            <div class='modal-dialog'>
              <div class='modal-content'>
                <div class='modal-header'>
                  <h5 class='modal-title' id='exampleModalLabel'>
                    Bạn muốn khôi phục tài khoản Người dùng này ?
                  </h5>
                  <button
                    type='button'
                    class='btn-close'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                  ></button>
                </div>
                <div class='modal-body'>
                  <div>
                    <span className='fw-bold'>ID: </span> {userDetail._id}
                  </div>
                  <div>
                    <span className='fw-bold'>Tên người dùng: </span>{' '}
                    {userDetail.name}
                  </div>
                </div>
                <div class='modal-footer'>
                  <button
                    type='button'
                    class='btn btn-secondary'
                    data-bs-dismiss='modal'
                  >
                    Huỷ
                  </button>
                  <button
                    onClick={() => {
                      RestoreUserDeleted()
                    }}
                    type='button'
                    class='btn btn-primary'
                    data-bs-dismiss='modal'
                  >
                    Xác nhận
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            class='modal fade'
            id='deletedPermanently'
            tabindex='-1'
            aria-labelledby='exampleModalLabel'
            aria-hidden='true'
          >
            <div class='modal-dialog'>
              <div class='modal-content'>
                <div class='modal-header'>
                  <h5 class='modal-title' id='exampleModalLabel'>
                    Bạn có chắc Xoá tài khoản này!
                  </h5>
                  <button
                    type='button'
                    class='btn-close'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                  ></button>
                </div>
                <div class='modal-body'>
                  <div>
                    <span className='fw-bold'>ID: </span> {userDetail._id}
                  </div>
                  <div>
                    <span className='fw-bold'>Tên người dùng: </span>{' '}
                    {userDetail.name}
                  </div>
                </div>
                <div class='modal-footer'>
                  <button
                    type='button'
                    class='btn btn-secondary'
                    data-bs-dismiss='modal'
                  >
                    Huỷ
                  </button>
                  <button
                    onClick={() => {
                      DeleteUserPermanently()
                    }}
                    type='button'
                    class='btn btn-primary'
                    data-bs-dismiss='modal'
                  >
                    Xác nhận
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            class='modal fade'
            id='deletetemporary'
            tabindex='-1'
            aria-labelledby='exampleModalLabel'
            aria-hidden='true'
          >
            <div class='modal-dialog'>
              <div class='modal-content'>
                <div class='modal-header'>
                  <h5 class='modal-title' id='exampleModalLabel'>
                    Đưa tài khoản này vào thùng rác
                  </h5>
                  <button
                    type='button'
                    class='btn-close'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                  ></button>
                </div>
                <div class='modal-body'>
                  <div>
                    <span className='fw-bold'>ID: </span> {userDetail._id}
                  </div>
                  <div>
                    <span className='fw-bold'>Tên người dùng: </span>{' '}
                    {userDetail.name}
                  </div>
                </div>
                <div class='modal-footer'>
                  <button
                    type='button'
                    class='btn btn-secondary'
                    data-bs-dismiss='modal'
                  >
                    Huỷ
                  </button>
                  <button
                    onClick={() => {
                      DeleteUserTemporary()
                    }}
                    type='button'
                    class='btn btn-primary'
                    data-bs-dismiss='modal'
                  >
                    Xác nhận
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            class='modal fade'
            id='AccessBlocksModal'
            tabindex='-1'
            aria-labelledby='exampleModalLabel'
            aria-hidden='true'
          >
            <div class='modal-dialog'>
              <div class='modal-content'>
                <div class='modal-header'>
                  <h5 class='modal-title' id='exampleModalLabel'>
                    Bạn Có Thật Sự Muốn Khoá tài Khoản
                  </h5>
                  <button
                    type='button'
                    class='btn-close'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                  ></button>
                </div>
                <div class='modal-body'>
                  <div>
                    <span className='fw-bold'>ID: </span> {userDetail._id}
                  </div>
                  <div>
                    <span className='fw-bold'>Tên người dùng: </span>{' '}
                    {userDetail.name}
                  </div>
                </div>
                <div class='modal-footer'>
                  <button
                    type='button'
                    class='btn btn-secondary'
                    data-bs-dismiss='modal'
                  >
                    Huỷ
                  </button>
                  <button
                    onClick={() => {
                      BlockUser()
                    }}
                    type='button'
                    class='btn btn-primary'
                    data-bs-dismiss='modal'
                  >
                    Xác nhận Khoá
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            class='modal fade'
            id='AccessUnBlocksModal'
            tabindex='-1'
            aria-labelledby='exampleModalLabel'
            aria-hidden='true'
          >
            <div class='modal-dialog'>
              <div class='modal-content'>
                <div class='modal-header'>
                  <h5 class='modal-title' id='exampleModalLabel'>
                    Bạn có muốn mở khoá tài Khoản
                  </h5>
                  <button
                    type='button'
                    class='btn-close'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                  ></button>
                </div>
                <div class='modal-body'>
                  <div>
                    <span className='fw-bold'>ID: </span> {userDetail._id}
                  </div>
                  <div>
                    <span className='fw-bold'>Tên người dùng: </span>{' '}
                    {userDetail.name}
                  </div>
                </div>
                <div class='modal-footer'>
                  <button
                    type='button'
                    class='btn btn-secondary'
                    data-bs-dismiss='modal'
                  >
                    Huỷ
                  </button>
                  <button
                    onClick={() => {
                      UnBlockUser()
                    }}
                    type='button'
                    class='btn btn-primary'
                    data-bs-dismiss='modal'
                  >
                    Xác nhận Khoá
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Modal
            show={show}
            onHide={() => {
              ResetOut()
              handleClose()
            }}
            backdrop='static'
            keyboard={false}
            size='xl'
          >
            <Modal.Header closeButton>
              <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <NewpostModal user={userDetail} setShowModal={setShow} />
            </Modal.Body>
            <Modal.Footer>
              <Button
                class='btn btn-secondary'
                variant='secondary'
                onClick={() => {
                  ResetOut()
                  handleClose()
                }}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </>
  )
}

export default UserManagement
