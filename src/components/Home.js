import React, { useState, useEffect } from 'react'
import Loader from './layout/Loader'

import Post from './post/Post'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { getPosts } from '../actions/postActions'

const Home = () => {
  const alert = useAlert()
  const dispatch = useDispatch()

  const { loading, posts, error } = useSelector((state) => state.posts)

  useEffect(() => {
    if (error) {
      return alert.error(error)
    }
    dispatch(getPosts())
  }, [dispatch, alert, error])

  return (
    <>
     <div
        className='container-fluid bg-secondary mb-5 wow fadeIn'
        data-wow-delay='0.1s'
        style={{ padding: '15px' }}
      >
        <div className='container'>
          <div className='row g-2'>
            <div className='col-md-10'>
              <div className='row g-2'>
                <div className='col-md-3'>
                  <select className='form-select border-0'>
                    <option defaultValue={'1'}>Location</option>
                    <option value='1'>Location 1</option>
                    <option value='2'>Location 2</option>
                    <option value='3'>Location 3</option>
                  </select>
                </div>
                <div className='col-md-3'>
                  <select className='form-select border-0 '>
                    <option defaultValue={'1'}>Property Type</option>
                    <option value='1'>Property Type 1</option>
                    <option value='2'>Property Type 2</option>
                    <option value='3'>Property Type 3</option>
                  </select>
                </div>
                <div className='col-md-3'>
                  <select className='form-select border-0 '>
                    <option defaultValue={'1'}>Location</option>
                    <option value='1'>Location 1</option>
                    <option value='2'>Location 2</option>
                    <option value='3'>Location 3</option>
                  </select>
                </div>
                <div className='col-md-3'>
                  <select className='form-select border-0 '>
                    <option defaultValue={'1'}>Location</option>
                    <option value='1'>Location 1</option>
                    <option value='2'>Location 2</option>
                    <option value='3'>Location 3</option>
                  </select>
                </div>
              </div>
            </div>
            <div className='col-md-2'>
              <button className='btn btn-primary border-0 w-100 '>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className='container-xxl py-5'>
          <div className='container'>
            <div className='row g-0 gx-5 align-items-end'>
              <div className='col-lg-6'>
                <div
                  className='text-start mx-auto mb-5 wow slideInLeft'
                  data-wow-delay='0.1s'
                >
                  <h1 className='mb-3'>Property Listing</h1>
                  <p>
                    Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor
                    ut dolore lorem kasd vero ipsum sit eirmod sit diam justo
                    sed rebum.
                  </p>
                </div>
              </div>
              <div
                className='col-lg-6 text-start text-lg-end wow slideInRight'
                data-wow-delay='0.1s'
              >
                <ul className='nav nav-pills d-inline-flex justify-content-end mb-5'>
                  <li className='nav-item me-2'>
                    <a
                      className='btn btn-outline-primary active'
                      data-bs-toggle='pill'
                      href='#tab-1'
                    >
                      Featured
                    </a>
                  </li>
                  <li className='nav-item me-2'>
                    <a
                      className='btn btn-outline-primary'
                      data-bs-toggle='pill'
                      href='#tab-2'
                    >
                      For Sell
                    </a>
                  </li>
                  <li className='nav-item me-0'>
                    <a
                      className='btn btn-outline-primary'
                      data-bs-toggle='pill'
                      href='#tab-3'
                    >
                      For Rent
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className='tab-content'>
              <div id='tab-1' className=''>
                <div className='row g-4'>
                  {posts?.map((post, index) => (
                    <Post key={index} post={post} />
                  ))}
                  <div
                    className='col-12 text-center wow fadeInUp'
                    data-wow-delay='0.1s'
                  >
                    <a className='btn btn-primary py-3 px-5' href=''>
                      Browse More Property
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Home
