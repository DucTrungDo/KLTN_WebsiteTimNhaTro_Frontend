import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPenToSquare,
  faTrashCan,
  faSquarePlus,
} from '@fortawesome/free-regular-svg-icons'
import { format } from 'date-fns'
import {
  getPacks,
  addPack,
  updatePack,
  deletePack,
  clearErrors,
} from '../../actions/packActions'
import {
  ADMIN_ADD_PACK_RESET,
  ADMIN_UPDATE_PACK_RESET,
  ADMIN_DELETE_PACK_RESET,
} from '../../constants/packConstants'

import Loader from '../layout/Loader'

const PackManagement = () => {
  const alert = useAlert()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = Cookies.get('accessToken')
  const [packId, setPackId] = useState('')
  const [packName, setPackName] = useState('')
  const [packDescription, setPackDescription] = useState('')
  const [packFee, setPackFee] = useState('')

  const { loading, packs, error } = useSelector((state) => state.packs)
  const {
    loading: packLoading,
    isAdded,
    isUpdated,
    isDeleted,
    error: packError,
  } = useSelector((state) => state.pack)

  console.log(error)
  useEffect(() => {
    dispatch(getPacks())

    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }

    if (packError) {
      alert.error(packError)
      dispatch(clearErrors())
    }

    if (isAdded) {
      alert.success('pack added successfully')
      navigate('/admin/pack-management')
      dispatch({
        type: ADMIN_ADD_PACK_RESET,
      })
    }

    if (isUpdated) {
      alert.success('pack updated successfully')
      navigate('/admin/pack-management')
      dispatch({
        type: ADMIN_UPDATE_PACK_RESET,
      })
    }

    if (isDeleted) {
      alert.success('pack deleted successfully')
      navigate('/admin/pack-management')
      dispatch({
        type: ADMIN_DELETE_PACK_RESET,
      })
    }
  }, [
    dispatch,
    alert,
    error,
    navigate,
    isAdded,
    isUpdated,
    isDeleted,
    packError,
  ])

  const resetPackInfo = () => {
    setPackName('')
    setPackDescription('')
    setPackFee('')
  }

  const handleUpdatePack = (pack) => {
    setPackId(pack._id)
    setPackName(pack.name)
    setPackDescription(pack.description)
    setPackFee(pack.fee)
  }

  const addHandler = (e) => {
    e.preventDefault()
    if (!packName.trim() || !packDescription.trim() || !packFee.trim()) {
      // Kiểm tra xem input có giá trị không
      alert.error('Vui lòng đủ thông tin gói tin.') // Hiển thị thông báo nếu input trống
      return
    }

    dispatch(addPack(token, packName, packDescription, packFee))
    setPackName('')
  }

  const updateHandler = (e) => {
    e.preventDefault()

    dispatch(updatePack(token, packId, packName, packDescription, packFee))
  }

  const deleteHandler = (e) => {
    e.preventDefault()

    dispatch(deletePack(token, packId))
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
            Quản lý gói tin
          </li>
        </ol>
      </nav>
      <button
        type='button'
        className='btn btn-success btn-sm mb-2 px-4 fw-semibold'
        data-bs-toggle='modal'
        data-bs-target='#addModal'
        onClick={resetPackInfo}
      >
        <FontAwesomeIcon className='me-2' icon={faSquarePlus} />
        Thêm gói tin
      </button>
      {loading || !packs ? (
        <Loader />
      ) : (
        <div className='d-md-block'>
          <div className='table-responsive'>
            <table className='table table_post_listing table-bordered _table-hover'>
              <thead>
                <tr>
                  <th style={{ whiteSpace: 'nowrap' }}>Mã gói tin</th>
                  <th style={{ whiteSpace: 'nowrap' }}>Tên gói tin</th>
                  <th style={{ whiteSpace: 'nowrap' }}>Mô tả</th>
                  <th style={{ whiteSpace: 'nowrap' }}>Phí/ngày</th>
                  <th style={{ whiteSpace: 'nowrap' }}>Ngày tạo</th>
                  <th style={{ whiteSpace: 'nowrap' }}>Ngày cập nhật</th>
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
                {packs.count === 0 || !packs.packs ? (
                  <tr>
                    <td colSpan='5'>Bạn chưa có gói tin nào.</td>
                  </tr>
                ) : (
                  packs.packs?.map((pack) => (
                    <tr key={pack._id}>
                      <td>#{pack._id}</td>
                      <td>{pack.name}</td>
                      <td>{pack.description}</td>
                      <td>{pack.fee}</td>
                      <td>{format(pack.createdAt, 'HH:mm:ss - dd/MM/yyyy')}</td>
                      <td>{format(pack.updatedAt, 'HH:mm:ss - dd/MM/yyyy')}</td>
                      <td className='d-block'>
                        <button
                          className='btn btn-primary btn-sm text-center w-100'
                          type='button'
                          data-bs-toggle='modal'
                          data-bs-target='#updateModal'
                          onClick={() => handleUpdatePack(pack)}
                        >
                          <FontAwesomeIcon
                            className='me-1 '
                            icon={faPenToSquare}
                          />
                          Cập nhật
                        </button>
                        <button
                          className='btn btn-danger btn-sm text-center w-100 mt-1'
                          type='button'
                          data-bs-toggle='modal'
                          data-bs-target='#deleteModal'
                          onClick={() => setPackId(pack._id)}
                        >
                          <FontAwesomeIcon
                            className='me-1 '
                            icon={faTrashCan}
                          />
                          Xoá
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <div
        className='modal fade'
        id='addModal'
        tabIndex='-1'
        aria-labelledby='addModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='addModalLabel'>
                Thêm gói tin
              </h1>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <form>
                <div className='mb-3'>
                  <label htmlFor='message-text' className='col-form-label'>
                    Tên gói tin:
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='message-text'
                    value={packName}
                    onChange={(e) => setPackName(e.target.value)}
                  ></input>
                </div>
                <div className='mb-3'>
                  <label htmlFor='message-text' className='col-form-label'>
                    Mô tả:
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='message-text'
                    value={packDescription}
                    onChange={(e) => setPackDescription(e.target.value)}
                  ></input>
                </div>
                <div className='mb-3'>
                  <label htmlFor='message-text' className='col-form-label'>
                    Phí:
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='message-text'
                    value={packFee}
                    onChange={(e) => setPackFee(e.target.value)}
                  ></input>
                </div>
              </form>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
              >
                Hủy
              </button>
              <button
                type='button'
                className='btn btn-primary'
                data-bs-dismiss='modal'
                aria-label='Close'
                onClick={addHandler}
                disabled={packLoading ? true : false}
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className='modal fade'
        id='updateModal'
        tabIndex='-1'
        aria-labelledby='updateModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='updateModalLabel'>
                Cập nhật thông tin gói tin
              </h1>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <form>
                <div className='mb-3'>
                  <label htmlFor='recipient-name' className='col-form-label'>
                    Mã gói tin:
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='recipient-name'
                    defaultValue={packId}
                    readOnly
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='message-text' className='col-form-label'>
                    Tên gói tin:
                  </label>
                  <textarea
                    className='form-control'
                    id='message-text'
                    value={packName}
                    onChange={(e) => setPackName(e.target.value)}
                  ></textarea>
                </div>
                <div className='mb-3'>
                  <label htmlFor='message-text' className='col-form-label'>
                    Mô tả:
                  </label>
                  <textarea
                    className='form-control'
                    id='message-text'
                    value={packDescription}
                    onChange={(e) => setPackDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className='mb-3'>
                  <label htmlFor='message-text' className='col-form-label'>
                    Phí:
                  </label>
                  <textarea
                    className='form-control'
                    id='message-text'
                    value={packFee}
                    onChange={(e) => setPackFee(e.target.value)}
                  ></textarea>
                </div>
              </form>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
              >
                Đóng
              </button>
              <button
                type='button'
                className='btn btn-primary'
                data-bs-dismiss='modal'
                aria-label='Close'
                onClick={updateHandler}
                disabled={packLoading ? true : false}
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className='modal fade'
        id='deleteModal'
        tabIndex='-1'
        aria-labelledby='deleteModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='deleteModalLabel'>
                Xác nhận xóa
              </h1>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              Bạn có chắc là muốn xóa gói tin chứ?
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
              >
                Hủy
              </button>
              <button
                type='button'
                className='btn btn-danger'
                data-bs-dismiss='modal'
                aria-label='Close'
                onClick={deleteHandler}
                disabled={packLoading ? true : false}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PackManagement
