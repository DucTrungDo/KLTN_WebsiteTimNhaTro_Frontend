import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-regular-svg-icons'
import {
  faLocationDot,
  faRulerCombined,
  faUserAstronaut,
} from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate, useLocation } from 'react-router-dom'
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

    truncateText('.title', 36)
    truncateText('.address', 30)
  })
  return (
    <div class='col-lg-4 col-md-6 wow fadeInUp' data-wow-delay='0.5s'>
      <Link
        to={'posts/' + post.slug}
        className='link-secondary text-decoration-none'
      >
        <div
          class='property-item border-info border rounded overflow-hidden'
          style={{
            minHeight: '490px',
          }}
        >
          <div class='position-relative overflow-hidden'>
            <a href=''>
              <img class='img-fluid' src='./images/property-test.jpg' alt='' />
            </a>
            <div class='bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3'>
              For Rent
            </div>
            <div class='bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3'>
              Shop
            </div>
          </div>
          <div
            style={{
              height: '280px',
            }}
            className='d-flex flex-column'
          >
            <div class='p-4 pb-0'>
              <h5 class='text-primary mb-3'>
                {parseInt(post.price).toLocaleString('vi-VN')} đồng/tháng
              </h5>
              <a class='title d-block ellipsis h4 mb-2' href=''>
                {post.title}
              </a>
            </div>
            <div className='flex-grow-1 align-content-end'>
              <p className='fs-6 ellipsis pe-4 ps-4'>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className='me-1 text-primary'
                />
                {post.address.city +
                  ', ' +
                  post.address.district +
                  ', ' +
                  post.address.ward +
                  ', ' +
                  post.address.street}
              </p>
              <div class='d-flex border-top'>
                <small class='flex-fill text-center border-end py-2'>
                  <FontAwesomeIcon
                    icon={faUserAstronaut}
                    className='me-1 text-primary'
                  />
                  Trình công lê
                </small>
                <small class='flex-fill text-center border-end py-2'>
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
