import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { useDispatch, useSelector } from 'react-redux'

import {
  addPostToFavorite,
  removePostFromFavorite,
} from '../../actions/favoriteActions'

import {
  faStar,
  faLocationDot,
  faRulerCombined,
} from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom'
const Post = ({ post }) => {
  const dispatch = useDispatch()

  // State to manage saved status
  const [saved, setSaved] = useState(false)
  const { favoritePosts } = useSelector((state) => state.favorite)

  const truncateTitle = (title, limit) => {
    if (title.length > limit) {
      return title.substring(0, limit) + '...'
    }
    return title
  }

  useEffect(() => {
    // Kiểm tra xem post.slug có trong danh sách bài đăng yêu thích không
    const isFavorite = favoritePosts.some(
      (favoritePost) => favoritePost.slug === post.slug
    )
    // Cập nhật trạng thái của nút lưu (saved) dựa vào kết quả kiểm tra
    setSaved(isFavorite)
  }, [favoritePosts, post.slug])

  const handleSaveClick = () => {
    if (saved) {
      dispatch(removePostFromFavorite(post.slug))
    } else {
      dispatch(addPostToFavorite(post.slug))
    }
    setSaved((prevSaved) => !prevSaved) // Đảo ngược trạng thái của nút lưu sau khi click
  }
  return (
    <div className='col-lg-4 col-md-6 wow fadeInUp' data-wow-delay='0.5s'>
      <Link
        to={'post/' + post.slug}
        className='link-secondary text-decoration-none'
      >
        <div
          className='property-item border-secondary-subtle border rounded overflow-hidden'
          style={{
            minHeight: '490px',
          }}
        >
          <div
            className='position-relative overflow-hidden'
            style={{ width: 'auto', height: '275px' }}
          >
            <img
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              src={post.images[0] ? post.images[0] : 'images/property-test.jpg'}
              alt=''
            />
            <div className='bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3'>
              {post.categoryId?.name}
            </div>
            <div className='rounded text-white position-absolute end-0 top-0 mx-4 py-0 px-3 homepage-post-listing'>
              <span
                className={`post-save ${saved ? 'saved' : ''}`}
                title='Thêm vào danh sách yêu thích'
                onClick={(e) => {
                  e.preventDefault()
                  // e.stopPropagation()
                  handleSaveClick()
                }}
              >
                <i></i>
              </span>
            </div>
            <div className='bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3 border border-bottom-0'>
              Shop
            </div>
          </div>
          <div
            style={{
              height: '280px',
            }}
            className='d-flex flex-column'
          >
            <div className='p-4 pb-0'>
              <div className='d-block ellipsis h4 mb-3'>
                <FontAwesomeIcon icon={faStar} className='iconstar' />
                <FontAwesomeIcon icon={faStar} className='iconstar' />
                <FontAwesomeIcon icon={faStar} className='iconstar' />
                <FontAwesomeIcon icon={faStar} className='iconstar' />
                <FontAwesomeIcon icon={faStar} className='iconstar' />{' '}
                {truncateTitle(post.title, 50)}
              </div>
              <h5 className='text-primary mb-2'>
                {parseInt(post.price).toLocaleString('vi-VN')} đồng/tháng
              </h5>
            </div>
            <div className='flex-grow-1 align-content-end'>
              <p className='fs-6 ellipsis pe-4 ps-4'>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className='me-1 text-primary'
                />
                {post.address.ward +
                  ', ' +
                  post.address.district +
                  ', ' +
                  post.address.city}
              </p>
              <div className='d-flex border-top'>
                <small className='flex-fill text-center border-end py-2'>
                  <FontAwesomeIcon
                    icon={faUser}
                    className='me-1 text-primary'
                  />
                  {post.userId.name}
                </small>
                <small className='flex-fill text-center py-2'>
                  <FontAwesomeIcon
                    icon={faRulerCombined}
                    className='me-1 text-primary'
                  />
                  {post.area} m²
                </small>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Post
