import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-regular-svg-icons'
import {
  faLocationDot,
  faRulerCombined,
  faUserAstronaut,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
const Post = ({ post }) => {
  useEffect(() => {
    function truncateText(selector, maxLength) {
      var elements = document.querySelectorAll(selector)
      elements.forEach(function (element) {
        var text = element.textContent
        if (text.length > maxLength) {
          element.textContent = text.slice(0, maxLength) + '...'
        }
      })
    }

    truncateText('.title', 50)
    truncateText('.address', 30)
  })
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
          <div className='position-relative overflow-hidden'>
            <img
              className='img-fluid'
              src='./images/property-test.jpg'
              alt=''
            />
            <div className='bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3'>
              For Rent
            </div>
            <div className='bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3'>
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
              <div className='title d-block ellipsis h4 mb-3'>{post.title}</div>

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
                    icon={faUserAstronaut}
                    className='me-1 text-primary'
                  />
                  {post.userId.name}
                </small>
                <small className='flex-fill text-center py-2'>
                  <FontAwesomeIcon
                    icon={faRulerCombined}
                    className='me-1 text-primary'
                  />
                  3{post.area} m²
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
