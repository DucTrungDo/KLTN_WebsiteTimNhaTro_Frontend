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
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  clearErrors,
} from '../../actions/categoryActions'
import {
  ADD_CATEGORY_RESET,
  UPDATE_CATEGORY_RESET,
  DELETE_CATEGORY_RESET,
} from '../../constants/categoryConstants'

import Loader from '../layout/Loader'

const CategoryManagement = () => {
  const alert = useAlert()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = Cookies.get('accessToken')
  const [cateId, setCateId] = useState('')
  const [cateName, setCateName] = useState('')

  const { loading, categories, error } = useSelector(
    (state) => state.categories
  )
  const {
    loading: cateLoading,
    isAdded,
    isUpdated,
    isDeleted,
    error: cateError,
  } = useSelector((state) => state.category)

  useEffect(() => {
    dispatch(getCategories())

    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }

    if (cateError) {
      alert.error(cateError)
      dispatch(clearErrors())
    }

    if (isAdded) {
      alert.success('Category added successfully')
      navigate('/admin/category-management')
      dispatch({
        type: ADD_CATEGORY_RESET,
      })
    }

    if (isUpdated) {
      alert.success('Category updated successfully')
      navigate('/admin/category-management')
      dispatch({
        type: UPDATE_CATEGORY_RESET,
      })
    }

    if (isDeleted) {
      alert.success('Category deleted successfully')
      navigate('/admin/category-management')
      dispatch({
        type: DELETE_CATEGORY_RESET,
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
    cateError,
  ])

  const resetCateInfo = () => {
    setCateName('')
  }

  const handleUpdateCategory = (category) => {
    setCateId(category._id)
    setCateName(category.name)
  }

  const addHandler = (e) => {
    e.preventDefault()
    if (!cateName.trim()) {
      // Kiểm tra xem input có giá trị không
      alert.error('Vui lòng nhập tên danh mục.') // Hiển thị thông báo nếu input trống
      return
    }
    dispatch(addCategory(token, cateName))
    setCateName('')
  }

  const updateHandler = (e) => {
    e.preventDefault()

    dispatch(updateCategory(token, cateId, cateName))
  }

  const deleteHandler = (e) => {
    e.preventDefault()

    dispatch(deleteCategory(token, cateId))
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
            Quản lý danh mục
          </li>
        </ol>
      </nav>
      <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom'>
        <h1 className='h2'>Quản lý Danh mục</h1>
      </div>
      <button
        type='button'
        className='btn btn-success btn-sm mb-2 px-4 fw-semibold'
        data-bs-toggle='modal'
        data-bs-target='#addModal'
        onClick={resetCateInfo}
      >
        <FontAwesomeIcon className='me-2' icon={faSquarePlus} />
        Thêm danh mục
      </button>
      {loading || !categories ? (
        <Loader />
      ) : (
        <div className='d-md-block'>
          <div className='table-responsive'>
            <table className='table table_post_listing table-bordered _table-hover'>
              <thead>
                <tr>
                  <th style={{ whiteSpace: 'nowrap' }}>Mã danh mục</th>
                  <th style={{ whiteSpace: 'nowrap' }}>Tên danh mục</th>
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
                {categories.count === 0 || !categories.cates ? (
                  <tr>
                    <td colSpan='5'>Bạn chưa có danh mục nào.</td>
                  </tr>
                ) : (
                  categories.cates?.map((cate) => (
                    <tr key={cate._id}>
                      <td>#{cate._id}</td>
                      <td>{cate.name}</td>
                      <td>{format(cate.createdAt, 'HH:mm:ss - dd/MM/yyyy')}</td>
                      <td>{format(cate.updatedAt, 'HH:mm:ss - dd/MM/yyyy')}</td>
                      <td className='d-block'>
                        <button
                          className='btn btn-primary btn-sm text-center w-100'
                          type='button'
                          data-bs-toggle='modal'
                          data-bs-target='#updateModal'
                          onClick={() => handleUpdateCategory(cate)}
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
                          onClick={() => setCateId(cate._id)}
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
                Thêm danh mục
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
                    Tên danh mục:
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='message-text'
                    value={cateName}
                    onChange={(e) => setCateName(e.target.value)}
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
                disabled={cateLoading ? true : false}
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
                Cập nhật thông tin danh mục
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
                    Mã danh mục:
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    id='recipient-name'
                    defaultValue={cateId}
                    readOnly
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor='message-text' className='col-form-label'>
                    Tên danh mục:
                  </label>
                  <textarea
                    className='form-control'
                    id='message-text'
                    value={cateName}
                    onChange={(e) => setCateName(e.target.value)}
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
                disabled={cateLoading ? true : false}
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
              Bạn có chắc là muốn xóa category chứ?
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
                disabled={cateLoading ? true : false}
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

export default CategoryManagement
