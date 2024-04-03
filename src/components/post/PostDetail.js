import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import {
  faStar,
  faLocationDot,
  faTags,
  faUpRightAndDownLeftFromCenter,
  faClock,
  faHashtag,
} from '@fortawesome/free-solid-svg-icons'

const PostDetail = () => {
  return (
    <div className='container mt-1'>
      <div className='row'>
        <div className='col-sm-8 border border-1 p-2'>
          <div
            id='carouselExampleControlsNoTouching'
            className='carousel slide'
            data-bs-touch='false'
            data-bs-interval='false'
          >
            <div className='carousel-inner bg-dark'>
              <div className='carousel-item active ' data-bs-interval='10000'>
                <img
                  src='./img/455176597.jpg'
                  className='d-block w-100 cropitem'
                  alt='...'
                />
              </div>
              <div className='carousel-item ' data-bs-interval='2000'>
                <img
                  src='./img/how-to-design-a-house.jpg'
                  className='d-block w-100 cropitem'
                  alt='...'
                />
              </div>
              <div className='carousel-item'>
                <img
                  src='./img/455176597.jpg'
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
              <FontAwesomeIcon icon={faStar} className='iconstar' />
              Phòng VIP quận 1, gần công viên Lê Văn Tám, full nội thất
            </h4>
          </div>
          <div>
            <p>
              <FontAwesomeIcon
                icon={faLocationDot}
                className='text-success fs-4 me-2'
              />
              Dịa chỉ: 32/4 Lý Văn Phức, Phường Tân Định, Quận 1, Hồ Chí Minh
            </p>
          </div>
          <div>
            <nav className='navbar navbar-expand-lg navbar-light'>
              <div className='container-fluid p-0'>
                <span className='navbar-brand'>
                  <FontAwesomeIcon icon={faTags} className='me-2' />
                  4.1 triệu/tháng
                </span>
                <button
                  className='navbar-toggler'
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target='#navbarNav'
                  aria-controls='navbarNav'
                  aria-expanded='false'
                  aria-label='Toggle navigation'
                >
                  <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNav'>
                  <ul className='navbar-nav'>
                    <li className='nav-item'>
                      <span
                        className='nav-link active'
                        aria-current='page'
                        href='#'
                      >
                        <FontAwesomeIcon
                          icon={faUpRightAndDownLeftFromCenter}
                          className='me-2'
                        />
                        24m2
                      </span>
                    </li>
                    <li className='nav-item'>
                      <span className='nav-link' href='#'>
                        <FontAwesomeIcon icon={faClock} className='me-2' />
                        22/02/2002
                      </span>
                    </li>
                    <li className='nav-item'>
                      <span className='nav-link' href='#'>
                        <FontAwesomeIcon icon={faHashtag} className='me-2' />
                        164287
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
          <div>
            <h4>Thông tin mô tả</h4>
            <p className='lh-lg'>
              Còn 2 phòng trống có ban công, cửa sổ lớn, cần cho thuê, rộng rãi
              đầy đủ tiện nghi, khu an ninh, yên tĩnh: - Máy giặt, sân phơi
              thoáng mát.
              <br />
              - Tủ lạnh
              <br />
              - Giường nệm
              <br />
              - Tủ quần áo
              <br />
              - Bàn phấn gương
              <br />
              - Nhà vệ sinh khép kín có sửa sổ thông thoáng.
              <br />
              - Điều hoà
              <br />
              - Chỗ để xe miễn phí
              <br />
              - Bình nóng lạnh.
              <br />
              + Diện tích: 24m2.
              <br />
              + Giá: 3tr5 - 4tr5/ tháng
              <br />
              Địa chỉ: 100/16 Trần Hưng Đạo, P Phạm Ngũ Lão, Q1
              <br />
              Hẻm xe hơi vào thoải mái, ngõ thông ra phố đi bộ Bùi Viện cách
              100m, cách chợ Bến Thành 500m.
              <br />
              LH: 0913245981 ( chú An ) - Nhà cam kết đúng như hình chụp.
            </p>
          </div>
          <div className='container'>
            <h4>Bản đồ</h4>
            <p>
              Dịa chỉ: 01 Võ Văn Ngân, Linh Chiểu, Thủ Đức, Thành phố Hồ Chí
              Minh, Việt Nam
            </p>
            <iframe
              className='map w-100'
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.485398611076!2d106.76933817408849!3d10.850637657822444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752763f23816ab%3A0x282f711441b6916f!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBTxrAgcGjhuqFtIEvhu7kgdGh14bqtdCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmg!5e0!3m2!1svi!2s!4v1711952563502!5m2!1svi!2s'
              width='600'
              height='450'
              style={{ border: 0 }}
              allowFullScreen=''
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
            ></iframe>
          </div>
        </div>
        <div className='col-sm-4'>
          <div className='info_sell border border-1 rounded'>
            <div className='mt-2'>
              <img
                src='./img/avata-dep-nam-2.jpg'
                className='avata rounded mx-auto d-block'
              ></img>
            </div>
            <div className='text-center'>
              <span className='fs-4 fw-bold'>User</span>
              <div>
                <p className='mb-1'>
                  {' '}
                  <i className='bi bi-dot'></i>Đang hoạt động
                </p>
              </div>
            </div>
            <div className='d-grid gap-2 col-11 mx-auto'>
              <a
                href='#'
                className='btn btn-primary active fw-bold'
                role='button'
                data-bs-toggle='button'
                aria-pressed='true'
              >
                <span className='bi bi-telephone'></span>
                0346952976
              </a>
              <a
                href='#'
                className='container-zalo border border-1  border-secondary btn btn-light fw-bold d-flex justify-content-center'
                role='button'
                data-bs-toggle='button'
                aria-pressed='true'
              >
                <i className='iconzalo'></i> Zalo
              </a>
              <a
                href='#'
                className='btn btn-light border border-1  border-secondary fw-bold'
                role='button'
                data-bs-toggle='button'
                aria-pressed='true'
              >
                <FontAwesomeIcon icon={faHeart} className='me-1' />
                Yêu thích
              </a>
            </div>
          </div>
          {/* <!-- card outstanding --> */}
          <div className='border border-1 rounded mt-2'>
            <h5 className='ms-3 me-3 mt-1'>Tin nổi bật</h5>
            <div
              className='card-list ms-3 me-3 mb-2'
              style={{ maxWidth: '540px' }}
            >
              <a href='#' className='row g-0 text-decoration-none'>
                <div className='col-md-4 p-1'>
                  <img
                    src='./img/how-to-design-a-house.jpg'
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
                      <small className='text-muted'>Đăng ngày 22/02/2024</small>
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
                    src='./img/how-to-design-a-house.jpg'
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
                      <small className='text-muted'>Đăng ngày 22/02/2024</small>
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
                    src='./img/how-to-design-a-house.jpg'
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
                      <small className='text-muted'>Đăng ngày 22/02/2024</small>
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
                    src='./img/how-to-design-a-house.jpg'
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
                      <small className='text-muted'>Đăng ngày 22/02/2024</small>
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
                    src='./img/how-to-design-a-house.jpg'
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
                      <small className='text-muted'>Đăng ngày 22/02/2024</small>
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
          {/* <!-- card end outstanding -->
            
            <!-- card relation --> */}
          <div className='border border-1 rounded mt-2'>
            <h5 className='ms-3 me-3 mt-1'>Tin liên quan</h5>
            <div
              className='card-list-relation ms-3 me-3 mb-2'
              style={{ maxWidth: '540px' }}
            >
              <a href='#' className='row g-0 text-decoration-none'>
                <div className='col-md-4 p-1'>
                  <img
                    src='./img/how-to-design-a-house.jpg'
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
                      <small className='text-muted'>Đăng ngày 22/02/2024</small>
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
                    src='./img/how-to-design-a-house.jpg'
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
                      <small className='text-muted'>Đăng ngày 22/02/2024</small>
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
                    src='./img/how-to-design-a-house.jpg'
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
                      <small className='text-muted'>Đăng ngày 22/02/2024</small>
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
                    src='./img/how-to-design-a-house.jpg'
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
                      <small className='text-muted'>Đăng ngày 22/02/2024</small>
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
                    src='./img/how-to-design-a-house.jpg'
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
                      <small className='text-muted'>Đăng ngày 22/02/2024</small>
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
          {/* <!-- card end relation --> */}
        </div>
      </div>
    </div>
  )
}

export default PostDetail
