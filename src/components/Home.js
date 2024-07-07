import React, { useState, useEffect } from 'react'
import Loader from './layout/Loader'
import Post from './post/Post'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { getPosts, clearErrors } from '../actions/postActions'

import SearchFilter from './layout/SearchFilter'

const Home = () => {
  const alert = useAlert()
  const dispatch = useDispatch()
  const { loading, posts, error } = useSelector((state) => state.posts)
  const [page, setPage] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [filterData, setFilterData] = useState({})
  useEffect(() => {
    dispatch(getPosts(1, {}))
  }, [dispatch])
  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
  }, [dispatch, alert, error])
  useEffect(() => {
    if (JSON.stringify(posts) !== '{}' && posts !== undefined) {
      setPage(
        Math.round(
          posts.count % 10 !== 0
            ? Math.floor(posts.count / 10) + 1
            : Math.floor(posts.count / 10)
        )
      )
    }
  }, [posts])
  async function ChoisePage(indexPageCurrent) {
    setCurrentPage(indexPageCurrent)
    dispatch(getPosts(indexPageCurrent))
  }
  async function NextAndPrevious(Actions) {
    if (Actions === 'next') {
      setCurrentPage(currentPage + 1)
      dispatch(getPosts(currentPage + 1, filterData))
    } else {
      setCurrentPage(currentPage - 1)
      dispatch(getPosts(currentPage - 1, filterData))
    }
  }
  return (
    <>
      <SearchFilter setFilterData={setFilterData} />
      {loading ? (
        <Loader />
      ) : (
        <div className='container-xxl py-5 border mb-3'>
          <div className='container'>
            <div className='row g-0 gx-5 align-items-end'>
              <div className='col-lg-6'>
                <div
                  className='text-start mx-auto mb-5 wow slideInLeft'
                  data-wow-delay='0.1s'
                >
                  <h1 className='mb-3'>Danh sách tin đăng</h1>
                  <h4>Kết quả tìm thấy: {posts.count}</h4>
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
                  {posts.posts?.length === 0 ? (
                    <h4>Không tìm thấy bài đăng nào.</h4>
                  ) : (
                    posts.posts?.map((post, index) => (
                      <Post key={index} post={post} />
                    ))
                  )}

                  <div
                    className='col-12 text-center wow fadeInUp'
                    data-wow-delay='0.1s'
                  >
                    <nav aria-label='...'>
                      <ul className='pagination pagination-lg justify-content-center'>
                        <li
                          className={
                            currentPage === 1
                              ? 'page-item disabled'
                              : 'page-item'
                          }
                        >
                          <button
                            onClick={() => {
                              NextAndPrevious('previous')
                            }}
                            className='page-link'
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
                          className={
                            currentPage === page
                              ? 'page-item disabled'
                              : 'page-item'
                          }
                        >
                          <button
                            onClick={() => {
                              NextAndPrevious('next')
                            }}
                            className='page-link'
                          >
                            Next
                          </button>
                        </li>
                      </ul>
                    </nav>
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
