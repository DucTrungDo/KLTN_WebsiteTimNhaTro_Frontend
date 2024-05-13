import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { differenceInDays } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faStar,
  faLocationDot,
  faTags,
  faUpRightAndDownLeftFromCenter,
  faClock,
  faHashtag,
} from '@fortawesome/free-solid-svg-icons'
import { format } from 'date-fns'

import SearchFilter from '../layout/SearchFilter'
import MapD from '../googleMap/MapD'
import Loader from '../layout/Loader'
import { getPostDetails, clearErrors } from '../../actions/postActions'
import {
  addPostToFavorite,
  removePostFromFavorite,
} from '../../actions/favoriteActions'

const PostDetail = () => {
  const alert = useAlert()
  const dispatch = useDispatch()
  const { slug } = useParams()
  const { loading, post, error } = useSelector((state) => state.postDetails)
  const { favoritePosts } = useSelector((state) => state.favorite)
  const [addressPost, setaddressPost] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    // Kiểm tra xem post.slug có trong danh sách bài đăng yêu thích không
    const isFavorite = favoritePosts.some(
      (favoritePost) => favoritePost.slug === slug
    )
    // Cập nhật trạng thái của nút lưu (saved) dựa vào kết quả kiểm tra
    setSaved(isFavorite)
  }, [favoritePosts, slug])

  const handleSaveClick = () => {
    if (saved) {
      console.log('1')
      dispatch(removePostFromFavorite(slug))
    } else {
      dispatch(addPostToFavorite(slug))
    }
    setSaved((prevSaved) => !prevSaved) // Đảo ngược trạng thái của nút lưu sau khi click
  }

  useEffect(() => {
    dispatch(getPostDetails(slug))

    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
  }, [dispatch, alert, error])

  useEffect(() => {
    if (post.address !== undefined) {
      setaddressPost(
        post.address.city +
          '/' +
          post.address.district +
          '/' +
          post.address.ward +
          '/' +
          post.address.street
      )
    }
  }, [
    post.address?.street,
    post.address?.ward,
    post.address?.district,
    post.address?.city,
  ])

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

  const DescriptionDisplay = ({ description }) => {
    if (!description) return null

    // Tách chuỗi thành mảng các dòng
    const descriptionLines = description.split('\n')

    return (
      <>
        {descriptionLines.map((line, index) => (
          <p className='lh-lg' key={index}>
            {line}
          </p>
        ))}
      </>
    )
  }

  return (
    <>
      <SearchFilter />
      {loading ? (
        <Loader />
      ) : (
        <div className='container mt-1 mb-4'>
          <div className='row'>
            <div className='col-md-8 border border-1 rounded p-2 pb-3'>
              <div
                id='carouselExampleControlsNoTouching'
                className='carousel slide'
                data-bs-touch='false'
                data-bs-interval='false'
              >
                <div className='carousel-inner bg-dark'>
                  <div
                    className='carousel-item active '
                    data-bs-interval='10000'
                  >
                    <img
                      src='../images/property-test.jpg'
                      className='d-block w-100 cropitem'
                      alt='...'
                    />
                  </div>
                  <div className='carousel-item ' data-bs-interval='2000'>
                    <img
                      src='../images/upload-image.png'
                      className='d-block w-100 cropitem'
                      alt='...'
                    />
                  </div>
                  <div className='carousel-item'>
                    <img
                      src='../images/logo-secondary.png'
                      className='d-block w-100 cropitem'
                      alt='...'
                    />
                  </div>
                </div>
                <button
                  className='carousel-control-prev'
                  type='button'
                  data-bs-target='#carouselExampleControlsNoTouching'
                  data-bs-slide='prev'
                >
                  <span
                    className='carousel-control-prev-icon'
                    aria-hidden='true'
                  ></span>
                  <span className='visually-hidden'>Previous</span>
                </button>
                <button
                  className='carousel-control-next'
                  type='button'
                  data-bs-target='#carouselExampleControlsNoTouching'
                  data-bs-slide='next'
                >
                  <span
                    className='carousel-control-next-icon'
                    aria-hidden='true'
                  ></span>
                  <span className='visually-hidden'>Next</span>
                </button>
              </div>
              <div>
                <h4 className='mt-2 text-danger fw-bold'>
                  <FontAwesomeIcon icon={faStar} className='iconstar' />
                  <FontAwesomeIcon icon={faStar} className='iconstar' />
                  <FontAwesomeIcon icon={faStar} className='iconstar' />
                  <FontAwesomeIcon icon={faStar} className='iconstar' />
                  <FontAwesomeIcon icon={faStar} className='iconstar' />{' '}
                  {post.title}
                </h4>
              </div>
              <div>
                <p className='my-1'>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className='text-success fs-4 me-2'
                  />
                  Địa chỉ: {post.address?.street}, {post.address?.ward},{' '}
                  {post.address?.district}, {post.address?.city}
                </p>
              </div>
              <div className='d-flex flex-wrap align-items-center mb-3'>
                <div className='flex-row me-3'>
                  <FontAwesomeIcon
                    icon={faTags}
                    className='post-attributes-icon price me-2'
                  />
                  <span className='post-attributes-price'>
                    <PriceDisplay price={post.price} />
                  </span>
                </div>
                <div className='flex-row me-3'>
                  <FontAwesomeIcon
                    icon={faUpRightAndDownLeftFromCenter}
                    className='post-attributes-icon me-2'
                  />
                  <span>
                    {post.area}m<sup>2</sup>
                  </span>
                </div>
                <div className='flex-row me-3'>
                  <FontAwesomeIcon
                    icon={faClock}
                    className='post-attributes-icon me-2'
                  />
                  <span>
                    <FormatDateAgo date={post.createdAt} />
                  </span>
                </div>
                {/* <div className='flex-row'>
                  <FontAwesomeIcon
                    icon={faHashtag}
                    className='post-attributes-icon me-2'
                  />
                  <span>164287</span>
                </div> */}
              </div>
              <div>
                <h4>Thông tin mô tả</h4>
                <DescriptionDisplay description={post.description} />
              </div>
              <div>
                <h5>Đặc điểm tin đăng</h5>
                <table className='table table-striped mt-3 mb-4'>
                  <tbody>
                    <tr>
                      <td className='name'>Mã tin:</td>
                      <td>#{post._id}</td>
                    </tr>
                    <tr>
                      <td className='name'>Khu vực</td>
                      <td> Cho thuê phòng trọ {post.address?.city} </td>
                    </tr>
                    <tr>
                      <td className='name'>Loại tin rao:</td>
                      <td>{post.categoryId?.name}</td>
                    </tr>
                    <tr>
                      <td className='name'>Đối tượng thuê:</td>
                      <td>Tất cả</td>
                    </tr>
                    <tr>
                      <td className='name'>Gói tin:</td>
                      <td>
                        <span style={{ color: '#055699' }}>Tin miễn phí</span>
                      </td>
                    </tr>
                    <tr>
                      <td className='name'>Ngày đăng:</td>
                      {post.createdAt && (
                        <td>
                          {format(post.createdAt, 'HH:mm:ss - dd/MM/yyyy')}
                        </td>
                      )}
                    </tr>
                    <tr>
                      <td className='name'>Ngày hết hạn:</td>
                      <td>
                        <time title='Thứ 6, 15:15 17/05/2024'>
                          Thứ 6, 15:15 17/05/2024
                        </time>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <h5>Thông tin liên hệ</h5>
                <table className='table table-striped mt-3'>
                  <tbody>
                    <tr>
                      <td className='name'>Liên hệ:</td>
                      <td> {post.userId?.name} </td>
                    </tr>
                    <tr>
                      <td className='name'>Điện thoại:</td>
                      <td> {post.userId?.phone} </td>
                    </tr>
                    <tr>
                      <td className='name'>Zalo</td>
                      <td> {post.userId?.zalo} </td>
                    </tr>
                    <tr>
                      <td className='name'>Facebook</td>
                      <td>
                        <a href={post.userId?.facebook} target='_blank'>
                          {post.userId?.facebook}
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className='mt-4'>
                <h4>Bản đồ</h4>
                <p>
                  Dịa chỉ: 01 Võ Văn Ngân, Linh Chiểu, Thủ Đức, Thành phố Hồ Chí
                  Minh, Việt Nam
                </p>
                <MapD direction={addressPost} useDirect={true} />
              </div>
            </div>
            <div className='col-sm-12 col-md-4 pe-0'>
              <div className='info_sell border border-1 rounded'>
                <div className='mt-3'>
                  <img
                    src='../images/default_avatar.jpg'
                    className='avata rounded-circle mx-auto d-block'
                  ></img>
                </div>
                <div className='text-center'>
                  <span className='fs-4 fw-bold'>{post.userId?.name}</span>
                  <div>
                    <p className='mb-1'>
                      <i className='bi bi-dot'></i>Đang hoạt động
                    </p>
                  </div>
                </div>
                <div className='d-grid gap-2 col-11 mx-auto'>
                  <a
                    href={`tel:${post.userId?.phone}`}
                    className='btn btn-primary active fw-bold'
                    role='button'
                    aria-pressed='true'
                  >
                    <span className='bi bi-telephone'></span>
                    {post.userId?.phone}
                  </a>
                  <a
                    href={`https://zalo.me/${post.userId?.zalo}`}
                    className='container-zalo border border-1  border-secondary btn btn-light fw-bold d-flex justify-content-center'
                    role='button'
                    aria-pressed='true'
                    target='_blank'
                  >
                    <i className='iconzalo'></i> Zalo
                  </a>
                  <button
                    className='btn btn-light border border-1  border-secondary fw-bold post-details-save d-inline-flex justify-content-center'
                    aria-pressed='true'
                    onClick={() => handleSaveClick()}
                  >
                    <span
                      className={`post-save ${saved ? 'saved' : ''} me-1`}
                      title='Thêm vào danh sách yêu thích'
                    >
                      <i></i>
                    </span>
                    Yêu thích
                  </button>
                </div>
              </div>
              {/* <!-- card outstanding --> */}
              {/* <div className='border border-1 rounded mt-2'>
                <h5 className='ms-3 me-3 mt-1'>Tin nổi bật</h5>
                <div
                  className='card-list ms-3 me-3 mb-2'
                  style={{ maxWidth: '540px' }}
                >
                  <a href='#' className='row g-0 text-decoration-none'>
                    <div className='col-md-4 p-1'>
                      <img
                        src='../images/property-test.jpg'
                        className='img-fluid'
                        alt='...'
                      />
                    </div>
                    <div className='col-md-8 p-1'>
                      <div className='card-body'>
                        <p className='card-text mb-0'>
                          <i className='bi bi-star-fill iconstar'></i>
                          <i className='bi bi-star-fill iconstar'></i>
                          <i className='bi bi-star-fill iconstar'></i>
                          <i className='bi bi-star-fill iconstar'></i>
                          Phòng trọ có ban công, cửa sổ lớn
                        </p>
                        <p className='card-text mb-0 fw-bold'>
                          <small className='text-muted'>4.1 triệu/tháng</small>
                        </p>
                        <p className='card-text mb-0'>
                          <small className='text-muted'>
                            Đăng ngày 22/02/2024
                          </small>
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
                <div
                  className='card-list ms-3 me-3 mb-2'
                  style={{ maxWidth: '540px' }}
                >
                  <a href='#' className='row g-0 text-decoration-none'>
                    <div className='col-md-4 p-1'>
                      <img
                        src='../images/property-test.jpg'
                        className='img-fluid'
                        alt='...'
                      />
                    </div>
                    <div className='col-md-8 p-1'>
                      <div className='card-body'>
                        <p className='card-text mb-0'>
                          <i className='bi bi-star-fill iconstar'></i>
                          <i className='bi bi-star-fill iconstar'></i>
                          <i className='bi bi-star-fill iconstar'></i>
                          <i className='bi bi-star-fill iconstar'></i>
                          Phòng trọ có ban công, cửa sổ lớn
                        </p>
                        <p className='card-text mb-0 fw-bold'>
                          <small className='text-muted'>4.1 triệu/tháng</small>
                        </p>
                        <p className='card-text mb-0'>
                          <small className='text-muted'>
                            Đăng ngày 22/02/2024
                          </small>
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
                <div
                  className='card-list ms-3 me-3 mb-2'
                  style={{ maxWidth: '540px' }}
                >
                  <a href='#' className='row g-0 text-decoration-none'>
                    <div className='col-md-4 p-1'>
                      <img
                        src='../images/property-test.jpg'
                        className='img-fluid'
                        alt='...'
                      />
                    </div>
                    <div className='col-md-8 p-1'>
                      <div className='card-body'>
                        <p className='card-text mb-0'>
                          <i className='bi bi-star-fill iconstar'></i>
                          <i className='bi bi-star-fill iconstar'></i>
                          <i className='bi bi-star-fill iconstar'></i>
                          <i className='bi bi-star-fill iconstar'></i>
                          Phòng trọ có ban công, cửa sổ lớn
                        </p>
                        <p className='card-text mb-0 fw-bold'>
                          <small className='text-muted'>4.1 triệu/tháng</small>
                        </p>
                        <p className='card-text mb-0'>
                          <small className='text-muted'>
                            Đăng ngày 22/02/2024
                          </small>
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
                <div
                  className='card-list ms-3 me-3 mb-2'
                  style={{ maxWidth: '540px' }}
                >
                  <a href='#' className='row g-0 text-decoration-none'>
                    <div className='col-md-4 p-1'>
                      <img
                        src='../images/property-test.jpg'
                        className='img-fluid'
                        alt='...'
                      />
                    </div>
                    <div className='col-md-8 p-1'>
                      <div className='card-body'>
                        <p className='card-text mb-0'>
                          <i className='bi bi-star-fill iconstar'></i>
                          <i className='bi bi-star-fill iconstar'></i>
                          <i className='bi bi-star-fill iconstar'></i>
                          <i className='bi bi-star-fill iconstar'></i>
                          Phòng trọ có ban công, cửa sổ lớn
                        </p>
                        <p className='card-text mb-0 fw-bold'>
                          <small className='text-muted'>4.1 triệu/tháng</small>
                        </p>
                        <p className='card-text mb-0'>
                          <small className='text-muted'>
                            Đăng ngày 22/02/2024
                          </small>
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
                <div
                  className='card-list ms-3 me-3 mb-2'
                  style={{ maxWidth: '540px' }}
                >
                  <a href='#' className='row g-0 text-decoration-none'>
                    <div className='col-md-4 p-1'>
                      <img
                        src='../images/property-test.jpg'
                        className='img-fluid'
                        alt='...'
                      />
                    </div>
                    <div className='col-md-8 p-1'>
                      <div className='card-body'>
                        <p className='card-text mb-0'>
                          <i className='bi bi-star-fill iconstar'></i>
                          <i className='bi bi-star-fill iconstar'></i>
                          <i className='bi bi-star-fill iconstar'></i>
                          <i className='bi bi-star-fill iconstar'></i>
                          Phòng trọ có ban công, cửa sổ lớn
                        </p>
                        <p className='card-text mb-0 fw-bold'>
                          <small className='text-muted'>4.1 triệu/tháng</small>
                        </p>
                        <p className='card-text mb-0'>
                          <small className='text-muted'>
                            Đăng ngày 22/02/2024
                          </small>
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </div> */}
              {/* <!-- card end outstanding -->
            
            <!-- card relation --> */}
              {/* <div className='border border-1 rounded mt-2'>
                <h5 className='ms-3 me-3 mt-1'>Tin liên quan</h5>
                <div
                  className='card-list-relation ms-3 me-3 mb-2'
                  style={{ maxWidth: '540px' }}
                >
                  <a href='#' className='row g-0 text-decoration-none'>
                    <div className='col-md-4 p-1'>
                      <img
                        src='../images/property-test.jpg'
                        className='img-fluid'
                        alt='...'
                      />
                    </div>
                    <div className='col-md-8 p-1'>
                      <div className='card-body'>
                        <p className='card-text mb-0'>
                          Phòng trọ có ban công, cửa sổ lớn
                        </p>
                        <p className='card-text mb-0 fw-bold'>
                          <small className='text-muted'>4.1 triệu/tháng</small>
                        </p>
                        <p className='card-text mb-0'>
                          <small className='text-muted'>
                            Đăng ngày 22/02/2024
                          </small>
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
                <div
                  className='card-list-relation ms-3 me-3 mb-2'
                  style={{ maxWidth: '540px' }}
                >
                  <a href='#' className='row g-0 text-decoration-none'>
                    <div className='col-md-4 p-1'>
                      <img
                        src='../images/property-test.jpg'
                        className='img-fluid'
                        alt='...'
                      />
                    </div>
                    <div className='col-md-8 p-1'>
                      <div className='card-body'>
                        <p className='card-text mb-0'>
                          Phòng trọ có ban công, cửa sổ lớn
                        </p>
                        <p className='card-text mb-0 fw-bold'>
                          <small className='text-muted'>4.1 triệu/tháng</small>
                        </p>
                        <p className='card-text mb-0'>
                          <small className='text-muted'>
                            Đăng ngày 22/02/2024
                          </small>
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
                <div
                  className='card-list-relation ms-3 me-3 mb-2'
                  style={{ maxWidth: '540px' }}
                >
                  <a href='#' className='row g-0 text-decoration-none'>
                    <div className='col-md-4 p-1'>
                      <img
                        src='../images/property-test.jpg'
                        className='img-fluid'
                        alt='...'
                      />
                    </div>
                    <div className='col-md-8 p-1'>
                      <div className='card-body'>
                        <p className='card-text mb-0'>
                          Phòng trọ có ban công, cửa sổ lớn
                        </p>
                        <p className='card-text mb-0 fw-bold'>
                          <small className='text-muted'>4.1 triệu/tháng</small>
                        </p>
                        <p className='card-text mb-0'>
                          <small className='text-muted'>
                            Đăng ngày 22/02/2024
                          </small>
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
                <div
                  className='card-list-relation ms-3 me-3 mb-2'
                  style={{ maxWidth: '540px' }}
                >
                  <a href='#' className='row g-0 text-decoration-none'>
                    <div className='col-md-4 p-1'>
                      <img
                        src='../images/property-test.jpg'
                        className='img-fluid'
                        alt='...'
                      />
                    </div>
                    <div className='col-md-8 p-1'>
                      <div className='card-body'>
                        <p className='card-text mb-0'>
                          Phòng trọ có ban công, cửa sổ lớn
                        </p>
                        <p className='card-text mb-0 fw-bold'>
                          <small className='text-muted'>4.1 triệu/tháng</small>
                        </p>
                        <p className='card-text mb-0'>
                          <small className='text-muted'>
                            Đăng ngày 22/02/2024
                          </small>
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
                <div
                  className='card-list-relation ms-3 me-3 mb-2'
                  style={{ maxWidth: '540px' }}
                >
                  <a href='#' className='row g-0 text-decoration-none'>
                    <div className='col-md-4 p-1'>
                      <img
                        src='../images/property-test.jpg'
                        className='img-fluid'
                        alt='...'
                      />
                    </div>
                    <div className='col-md-8 p-1'>
                      <div className='card-body'>
                        <p className='card-text mb-0'>
                          Phòng trọ có ban công, cửa sổ lớn
                        </p>
                        <p className='card-text mb-0 fw-bold'>
                          <small className='text-muted'>4.1 triệu/tháng</small>
                        </p>
                        <p className='card-text mb-0'>
                          <small className='text-muted'>
                            Đăng ngày 22/02/2024
                          </small>
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </div> */}
              {/* <!-- card end relation --> */}
              <section className='section section-aside-tinmoidang mt-3'>
                <div class='section-header'>
                  <span class='section-title'>Tin nổi bật</span>
                </div>
                <ul className='post-listing aside clearfix'>
                  <li class='post-item clearfix tin-vip vip1' post-id='654398'>
                    <a href='/' className='text-decoration-none'>
                      <figure>
                        <img
                          class='lazy_done'
                          src='../images/property-test.jpg'
                          data-src='../images/property-test.jpg'
                          alt='Khai trương phòng giá rẻ, duplex siêu phẩm BanCol, đầy đủ nội thất, tại Tân Bình, giáp Quận 10'
                          height='100'
                          width='100'
                          layout='responsive'
                          data-loaded='true'
                        />
                      </figure>
                      <div class='post-meta'>
                        <span class='post-title' style={{ color: '#ea2e9d' }}>
                          <span class='star star-4'></span> Khai trương phòng
                          giá rẻ, duplex siêu phẩm…{' '}
                        </span>
                        <span class='post-price'>5 triệu/tháng</span>
                        <time class='post-time' title='Thứ 7, 19:49 11/05/2024'>
                          Hôm nay
                        </time>
                      </div>
                    </a>
                  </li>
                  <li class='post-item clearfix tin-vip vip2' post-id='596753'>
                    <a href='/' className='text-decoration-none'>
                      <figure>
                        <img
                          class='lazy_done'
                          src='../images/property-test.jpg'
                          data-src='../images/property-test.jpg'
                          alt='Phòng mới xây 572/9 Âu Cơ, P10, Tân Bình 3.5tr-4,7tr'
                          height='100'
                          width='100'
                          layout='responsive'
                          data-loaded='true'
                        />
                      </figure>
                      <div class='post-meta'>
                        <span class='post-title' style={{ color: '#f60' }}>
                          <span class='star star-3'></span> Phòng mới xây 572/9
                          Âu Cơ, P10, Tân Bình 3.5tr-4,7tr{' '}
                        </span>
                        <span class='post-price'>3.6 triệu/tháng</span>
                        <time class='post-time' title='Thứ 2, 14:33 13/05/2024'>
                          5 giờ trước
                        </time>
                      </div>
                    </a>
                  </li>
                </ul>
              </section>
              <section className='section section-aside-tinmoidang'>
                <div class='section-header'>
                  <span class='section-title'>Tin mới đăng</span>
                </div>
                <ul className='post-listing aside clearfix'>
                  <li class='post-item clearfix normal' post-id='654608'>
                    <a href='/' className='text-decoration-none'>
                      <figure>
                        <img
                          class='lazy_done'
                          src='../images/property-test.jpg'
                          data-src='../images/property-test.jpg'
                          alt='phòng trọ GIẢ RẺ SẴN NỘI THẤT CƠ BẢN ngay khu Bàu Cát'
                          height='100'
                          width='100'
                          layout='responsive'
                          data-loaded='true'
                        />
                      </figure>
                      <div class='post-meta'>
                        <span class='post-title' style={{ color: '#055699' }}>
                          {' '}
                          phòng trọ GIẢ RẺ SẴN NỘI THẤT CƠ BẢN…{' '}
                        </span>
                        <span class='post-price'>3.5 triệu/tháng</span>
                        <time class='post-time' title='Thứ 2, 12:27 13/05/2024'>
                          7 giờ trước
                        </time>
                      </div>
                    </a>
                  </li>
                  <li class='post-item clearfix normal' post-id='654606'>
                    <a href='/' className='text-decoration-none'>
                      <figure>
                        <img
                          class='lazy_done'
                          src='../images/property-test.jpg'
                          data-src='../images/property-test.jpg'
                          alt='PHÒNG TIỆN NGHI CAO CẤP NGAY 4’ ĐI ĐH VĂN LANG CS3'
                          height='100'
                          width='100'
                          layout='responsive'
                          data-loaded='true'
                        />
                      </figure>
                      <div class='post-meta'>
                        <span class='post-title' style={{ color: '#055699' }}>
                          {' '}
                          PHÒNG TIỆN NGHI CAO CẤP NGAY 4’ ĐI ĐH VĂN LANG CS3{' '}
                        </span>
                        <span class='post-price'>3.7 triệu/tháng</span>
                        <time class='post-time' title='Thứ 2, 11:35 13/05/2024'>
                          8 giờ trước
                        </time>
                      </div>
                    </a>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PostDetail
