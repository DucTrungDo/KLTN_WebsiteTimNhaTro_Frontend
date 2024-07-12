import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// import SearchFilter from '../layout/SearchFilter'
import { useDispatch, useSelector } from 'react-redux'
import { differenceInDays } from 'date-fns'
import { removePostFromFavorite } from '../../actions/favoriteActions'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const FavoritePost = () => {
  const dispatch = useDispatch()

  const { favoritePosts } = useSelector((state) => state.favorite)

  favoritePosts.sort((a, b) => parseFloat(b.priority) - parseFloat(a.priority))

  // Function to handle click event on save button
  const handleSaveClick = (slug) => {
    dispatch(removePostFromFavorite(slug))
  }

  const PriceDisplay = ({ price }) => {
    if (!price) return
    if (price >= 1000000) {
      const trieu = Math.floor(price / 1000000) // Phần triệu
      const tramNgan = Math.floor((price % 1000000) / 1000) // Phần trăm nghìn
      const trieuStr = trieu > 0 ? `${trieu}` : '' // Chuỗi phần triệu

      // Chuỗi phần trăm nghìn với đúng ba chữ số sau dấu chấm
      const tramNganStr =
        tramNgan > 0
          ? `.${(tramNgan / 1000).toFixed(3).slice(2)}`.replace(/0+$/, '')
          : ''

      return `${trieuStr}${tramNganStr} triệu/tháng`
    } else {
      return `${price
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đồng/tháng`
    }
  }

  const FormatDateAgo = ({ date }) => {
    if (!date) return

    const createdAt = new Date(date)
    const currentDate = new Date()

    const daysAgo = differenceInDays(currentDate, createdAt)
    if (daysAgo == 0) {
      return 'Hôm nay'
    } else return `${daysAgo} ngày trước`
  }

  const truncateDescription = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description
    } else {
      return description.slice(0, maxLength) + '...'
    }
  }

  const StarRating = ({ index }) => {
    if (index > 5) {
      index = 5
    }

    const stars = []

    for (let i = 0; i < index; i++) {
      stars.push(<FontAwesomeIcon icon={faStar} className='iconstar' key={i} />)
    }

    return stars
  }

  const getTitleClassName = (post) => {
    if (post.priority === 5) {
      return 'title-uppercase title-color-oustanding-vip'
    } else if (post.priority >= 3) {
      return 'title-uppercase title-color-vip'
    }
    return 'title-color-nomal'
  }

  return (
    <div>
      <nav
        className='navbar navbar-light mb-3 text-white'
        style={{ backgroundColor: '#1266dd' }}
      >
        <div className='container d-flex flex-nowrap'>
          <Link className='navbar-brand fs-5 ms-4' to='/'>
            Trang chủ
          </Link>

          <a className='nav-link fw-medium ms-1' href='#'>
            Cho thuê phòng trọ
          </a>
          <a className='nav-link fw-medium ms-4' href='#'>
            Nhà cho thuê
          </a>
          <a className='nav-link fw-medium ms-4' href='#'>
            Cho thuê căn hộ
          </a>
          <a className='nav-link fw-medium ms-4' href='#'>
            Mặt bằng, văn phòng
          </a>
          <a className='nav-link fw-medium ms-4' href='#'>
            Tìm người ở ghép
          </a>
          <Link className='nav-link fw-medium me-4' to='/service-price-list'>
            Bảng giá dịch vụ
          </Link>
        </div>
      </nav>
      {/* <SearchFilter /> */}
      <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-4'>
        <h1 className='h2'>Tin đã lưu</h1>
      </div>
      {favoritePosts.length === 0 ? (
        <section className='section section-post-listing'>
          <div>
            <ul className='post-listing clearfix'>
              <div className='text-align-center '>
                <img
                  style={{
                    maxWidth: '100px',
                    display: 'block',
                    margin: '15px auto',
                  }}
                  src='images/dashboard-post-saved.png'
                />
                <p
                  style={{
                    color: '#ee664c',
                    textAlign: 'center',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                  }}
                >
                  Danh sách rỗng.
                </p>
              </div>
            </ul>
          </div>
        </section>
      ) : (
        <div className='container clearfix'>
          <div id='left-col'>
            <section className='section section-post-listing'>
              <div className='section-header'>
                <span className='section-title small'>Danh sách yêu thích</span>
              </div>
              <ul className='post-listing clearfix'>
                {favoritePosts.map((post) => (
                  <li
                    key={post._id}
                    className='post-item clearfix'
                    style={{ borderColor: '#ddd' }}
                    post-id='650734'
                  >
                    <figure className='post-thumb'>
                      <Link className='clearfix' to={'/post/' + post.slug}>
                        <img
                          className='lazy_done'
                          src={
                            post.images[0]
                              ? post.images[0]
                              : 'images/property-test.jpg'
                          }
                          alt='property-image'
                          data-src='images/property-test.jpg'
                          height='100'
                          width='100'
                          layout='responsive'
                          data-loaded='true'
                        />
                      </Link>
                      {post.images[0] && (
                        <span className='images-number'>
                          {post.images.length} ảnh
                        </span>
                      )}
                      {post.video && <span className='has-video'></span>}
                      <span
                        className='post-save saved'
                        title='Tin đã lưu'
                        onClick={() => handleSaveClick(post.slug)}
                      >
                        <i></i>
                      </span>
                    </figure>
                    <div className='post-meta'>
                      <h3 className='post-title'>
                        <Link
                          // style={{ color: '#055699' }}
                          className={`${getTitleClassName(post)}`}
                          to={'/post/' + post.slug}
                        >
                          <StarRating index={post.priority} />
                          {post.priority > 0 && ' '}
                          {post.title}
                        </Link>
                      </h3>
                      <div className='meta-row clearfix'>
                        <span className='post-price'>
                          <PriceDisplay price={post.price} />
                        </span>
                        <span className='post-acreage'>{post.area}m²</span>
                        <span className='post-location'>
                          {post.address.district}, {post.address.city}
                        </span>
                        <time className='post-time' title={post.startedAt}>
                          <FormatDateAgo date={post.startedAt} />
                        </time>
                      </div>
                      <div className='meta-row clearfix'>
                        <p className='post-summary'>
                          {truncateDescription(post.description, 300)}
                        </p>
                      </div>
                      <div className='meta-row clearfix'>
                        <div className='post-author'>
                          <img src='images/default_avatar.jpg' />
                          <span className='author-name'>
                            {post.userId.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      )}
    </div>
  )
}

export default FavoritePost
