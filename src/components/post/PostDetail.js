import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie'
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

// import SearchFilter from '../layout/SearchFilter'
import MapD from '../googleMap/MapD'
import Loader from '../layout/Loader'
import {
  getUserPostDetails,
  getPostDetailsByModerator,
  getPostDetailsByAdmin,
  getPostDetails,
  clearErrors,
} from '../../actions/postActions'
import {
  addPostToFavorite,
  removePostFromFavorite,
} from '../../actions/favoriteActions'

const PostDetail = () => {
  const alert = useAlert()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { slug } = useParams()
  const token = Cookies.get('accessToken')
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
      dispatch(removePostFromFavorite(slug))
    } else {
      dispatch(addPostToFavorite(slug))
    }
    setSaved((prevSaved) => !prevSaved) // Đảo ngược trạng thái của nút lưu sau khi click
  }

  useEffect(() => {
    if (location.pathname.includes('/me')) {
      dispatch(getUserPostDetails(slug, token))
    } else if (location.pathname.includes('/moderator')) {
      dispatch(getPostDetailsByModerator(slug, token))
    } else if (location.pathname.includes('/admin')) {
      dispatch(getPostDetailsByAdmin(slug, token))
    } else {
      dispatch(getPostDetails(slug))
    }
  }, [dispatch])

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
      navigate('/')
    }
  }, [dispatch, error, alert])

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

  const getTitleClassName = () => {
    if (post.priority === 5) {
      return 'title-uppercase title-color-oustanding-vip'
    } else if (post.priority >= 3) {
      return 'title-uppercase title-color-vip'
    }
    return 'title-color-nomal'
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
      <nav
        className='navbar navbar-light mb-3 text-white'
        style={{ backgroundColor: '#1266dd' }}
      >
        <div className='container d-flex flex-nowrap'>
          <Link className='navbar-brand fs-5 ms-4' to='/'>
            Trang chủ
          </Link>

          <a className='nav-link fw-medium me-4' href='#'>
            Cho thuê phòng trọ
          </a>
          <a className='nav-link fw-medium me-4' href='#'>
            Nhà cho thuê
          </a>
          <a className='nav-link fw-medium me-4' href='#'>
            Cho thuê căn hộ
          </a>
          <a className='nav-link fw-medium me-4' href='#'>
            Mặt bằng, văn phòng
          </a>
          <a className='nav-link fw-medium me-4' href='#'>
            Tìm người ở ghép
          </a>
          <Link className='nav-link fw-medium me-4' to='/service-price-list'>
            Bảng giá dịch vụ
          </Link>
        </div>
      </nav>
      {/* <SearchFilter /> */}
      {loading ? (
        <Loader />
      ) : (
        <div className='container mt-1 mb-4'>
          <div className='row ms-0 me-0'>
            <div className='col-md-8 border border-1 rounded p-2 pb-3 overflow-hidden'>
              {post.images?.length !== 0 || post.video ? (
                <div
                  id='carouselExampleControlsNoTouching'
                  className='carousel slide'
                  data-bs-touch='false'
                  data-bs-interval='false'
                  style={{ width: 'auto', height: '300px' }}
                >
                  <div className='carousel-inner bg-dark'>
                    {post.images &&
                      post.images.map((image, index) => (
                        <div
                          className={`carousel-item ${
                            index === 0 ? 'active' : ''
                          }`}
                          key={index}
                        >
                          <img
                            src={image}
                            className='d-block m-auto'
                            alt={`Slide ${index + 1}`}
                            style={{
                              height: '300px',
                              objectFit: 'cover',
                              maxWidth: '100%',
                            }}
                          />
                        </div>
                      ))}
                    {post.video && (
                      <div className='carousel-item'>
                        <video
                          className='d-block m-auto'
                          style={{
                            height: '300px',
                            objectFit: 'cover',
                            maxWidth: '100%',
                          }}
                          controls
                        >
                          <source src={post.video} type='video/mp4' />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    )}
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
              ) : null}

              <div>
                <h4 className={`mt-2 fw-bold ${getTitleClassName()}`}>
                  <StarRating index={post.priority} />
                  {post.priority > 0 && ' '}
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
                      <td>
                        {post.renters === 'male'
                          ? 'Nam'
                          : post.renter === 'female'
                          ? 'Nữ'
                          : 'Tất cả'}
                      </td>
                    </tr>
                    <tr>
                      <td className='name'>Gói tin:</td>
                      <td>
                        <span style={{ color: '#055699' }}>Tin miễn phí</span>
                      </td>
                    </tr>
                    <tr>
                      <td className='name'>Ngày đăng:</td>
                      <td>
                        {post.startedAt
                          ? format(post.startedAt, 'dd/MM/yyyy')
                          : ' - '}
                      </td>
                    </tr>
                    <tr>
                      <td className='name'>Ngày hết hạn:</td>
                      <td>
                        {post.endedAt
                          ? format(post.endedAt, 'dd/MM/yyyy')
                          : ' - '}
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
                    {post.userId?.zalo !== 'undefined' && (
                      <tr>
                        <td className='name'>Zalo</td>
                        <td> {post.userId?.zalo} </td>
                      </tr>
                    )}
                    {post.userId?.facebook !== 'undefined' && (
                      <tr>
                        <td className='name'>Facebook</td>
                        <td>
                          <a href={post.userId?.facebook} target='_blank'>
                            {post.userId?.facebook}
                          </a>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className='mt-4'>
                <h4>Bản đồ</h4>
                <p>
                  Địa chỉ: {post.address?.street}, {post.address?.ward},{' '}
                  {post.address?.district}, {post.address?.city}
                </p>
                <MapD direction={addressPost} useDirect={true} />
              </div>
            </div>
            <div className='col-sm-12 col-md-4 pe-0'>
              <div className='info_sell border border-1 rounded'>
                <div className='mt-3'>
                  <img
                    src={post.userId?.img}
                    className='avata rounded-circle mx-auto d-block'
                  ></img>
                </div>
                <div className='text-center mb-3'>
                  <span className='fs-4 fw-bold'>{post.userId?.name}</span>
                  {/* <div>
                    <p className='mb-1'>
                      <i className='bi bi-dot'></i>Đang hoạt động
                    </p>
                  </div> */}
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
              <section className='section section-aside-tinmoidang mt-3 pb-0'>
                <div className='section-header'>
                  <span className='section-title'>Tin nổi bật</span>
                </div>
                <ul className='post-listing aside clearfix'>
                  <li
                    className='post-item clearfix tin-vip vip1'
                    post-id='654398'
                  >
                    <a href='/' className='text-decoration-none'>
                      <figure>
                        <img
                          className='lazy_done'
                          src='images/property-test.jpg'
                          data-src='images/property-test.jpg'
                          alt='Khai trương phòng giá rẻ, duplex siêu phẩm BanCol, đầy đủ nội thất, tại Tân Bình, giáp Quận 10'
                          height='100'
                          width='100'
                          layout='responsive'
                          data-loaded='true'
                        />
                      </figure>
                      <div className='post-meta'>
                        <span
                          className='post-title'
                          style={{ color: '#ea2e9d' }}
                        >
                          <span className='star star-4'></span> Khai trương
                          phòng giá rẻ, duplex siêu phẩm…
                        </span>
                        <span className='post-price'>5 triệu/tháng</span>
                        <time
                          className='post-time'
                          title='Thứ 7, 19:49 11/05/2024'
                        >
                          Hôm nay
                        </time>
                      </div>
                    </a>
                  </li>
                  <li
                    className='post-item clearfix tin-vip vip2'
                    post-id='596753'
                  >
                    <a href='/' className='text-decoration-none'>
                      <figure>
                        <img
                          className='lazy_done'
                          src='images/property-test.jpg'
                          data-src='images/property-test.jpg'
                          alt='Phòng mới xây 572/9 Âu Cơ, P10, Tân Bình 3.5tr-4,7tr'
                          height='100'
                          width='100'
                          layout='responsive'
                          data-loaded='true'
                        />
                      </figure>
                      <div className='post-meta'>
                        <span className='post-title' style={{ color: '#f60' }}>
                          <span className='star star-3'></span> Phòng mới xây
                          572/9 Âu Cơ, P10, Tân Bình 3.5tr-4,7tr
                        </span>
                        <span className='post-price'>3.6 triệu/tháng</span>
                        <time
                          className='post-time'
                          title='Thứ 2, 14:33 13/05/2024'
                        >
                          5 giờ trước
                        </time>
                      </div>
                    </a>
                  </li>
                </ul>
              </section>
              <section className='section section-aside-tinmoidang pb-0'>
                <div className='section-header'>
                  <span className='section-title'>Tin mới đăng</span>
                </div>
                <ul className='post-listing aside clearfix'>
                  <li className='post-item clearfix normal' post-id='654608'>
                    <a href='/' className='text-decoration-none'>
                      <figure>
                        <img
                          className='lazy_done'
                          src='images/property-test.jpg'
                          data-src='images/property-test.jpg'
                          alt='phòng trọ GIẢ RẺ SẴN NỘI THẤT CƠ BẢN ngay khu Bàu Cát'
                          height='100'
                          width='100'
                          layout='responsive'
                          data-loaded='true'
                        />
                      </figure>
                      <div className='post-meta'>
                        <span
                          className='post-title'
                          style={{ color: '#055699' }}
                        >
                          phòng trọ GIẢ RẺ SẴN NỘI THẤT CƠ BẢN…
                        </span>
                        <span className='post-price'>3.5 triệu/tháng</span>
                        <time
                          className='post-time'
                          title='Thứ 2, 12:27 13/05/2024'
                        >
                          7 giờ trước
                        </time>
                      </div>
                    </a>
                  </li>
                  <li className='post-item clearfix normal' post-id='654606'>
                    <a href='/' className='text-decoration-none'>
                      <figure>
                        <img
                          className='lazy_done'
                          src='images/property-test.jpg'
                          data-src='images/property-test.jpg'
                          alt='PHÒNG TIỆN NGHI CAO CẤP NGAY 4’ ĐI ĐH VĂN LANG CS3'
                          height='100'
                          width='100'
                          layout='responsive'
                          data-loaded='true'
                        />
                      </figure>
                      <div className='post-meta'>
                        <span
                          className='post-title'
                          style={{ color: '#055699' }}
                        >
                          PHÒNG TIỆN NGHI CAO CẤP NGAY 4’ ĐI ĐH VĂN LANG CS3
                        </span>
                        <span className='post-price'>3.7 triệu/tháng</span>
                        <time
                          className='post-time'
                          title='Thứ 2, 11:35 13/05/2024'
                        >
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
