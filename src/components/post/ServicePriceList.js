import React from 'react'
import { Link } from 'react-router-dom'

const ServicePriceList = () => {
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
      <section className='section' id='pricing'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='title-box text-center'>
                <h3 className='title-heading mt-4'>Bảng giá dịch vụ</h3>
                <p className='text-muted f-17 mt-3'>
                  ĐỪNG ĐỂ PHÒNG TRỐNG THÊM BẤT CỨ NGÀY NÀO!, đăng tin ngay tại
                  TroTot123 và tất cả các vấn đề sẽ được giải quyết một cách
                  nhanh nhất. <br /> Áp dụng từ ngày 01/07/2024
                </p>
                <img
                  src='images/home-border.png'
                  height='15'
                  className='mt-3'
                  alt=''
                />
              </div>
            </div>
          </div>

          <div className='row mt-2 pt-2 mb-5'>
            <div className='col-lg-4'>
              <div className='pricing-box mt-4'>
                <i className='mdi mdi-account h1'></i>
                <h4 className='f-20'>Tin thường</h4>
                <div className='mt-4 pt-2'>
                  <p className='mb-2 f-18'>Tính năng</p>
                  <p className='mb-2'>
                    <i className='mdi mdi-checkbox-marked-circle text-success text-success f-18 mr-2'></i>
                    <b>Tiêu đề màu mặc định</b>
                  </p>
                  <p className='mb-2'>
                    <i className='mdi mdi-close-circle text-danger text-success f-18 mr-2'></i>
                    <b>Có biểu tượng sao</b>
                  </p>
                  <p className='mb-2'>
                    <i className='mdi mdi-close-circle text-danger text-success f-18 mr-2'></i>
                    <b>Có huy hiệu nổi bật</b>
                  </p>
                  <p className='mb-2'>
                    <i className='mdi mdi-close-circle text-danger text-success f-18 mr-2'></i>
                    <b>Luôn nằm đầu trang</b>
                  </p>
                </div>
                <p className='mt-4 pt-2 text-muted'>
                  Hiển thị sau các tin Vip.
                </p>
                <div className='pricing-plan mt-4 pt-2'>
                  <h4 className='text-muted'>
                    <span className='plan pl-3 text-dark'>10.000 VNĐ</span>
                  </h4>
                  <p className='text-muted mb-0'>một Ngày</p>
                </div>
              </div>
            </div>

            <div className='col-lg-4'>
              <div className='pricing-box mt-4'>
                <i className='mdi mdi-account-multiple h1'></i>
                <h4 className='f-20'>Tin Vip</h4>
                <div className='mt-4 pt-2'>
                  <p className='mb-2 f-18'>Tính năng</p>
                  <p className='mb-2'>
                    <i className='mdi mdi-checkbox-marked-circle text-success f-18 mr-2'></i>
                    <b>Tiêu đề màu mặc định, in hoa</b>
                  </p>
                  <p className='mb-2'>
                    <i className='mdi mdi-checkbox-marked-circle text-success f-18 mr-2'></i>
                    <b>Có biểu tượng 3 sao</b>
                  </p>
                  <p className='mb-2'>
                    <i className='mdi mdi-close-circle text-danger text-success f-18 mr-2'></i>
                    <b>Có huy hiệu nổi bật</b>
                  </p>
                  <p className='mb-2'>
                    <i className='mdi mdi-close-circle text-danger text-success f-18 mr-2'></i>
                    <b>Luôn nằm đầu trang</b>
                  </p>
                </div>
                <p className='mt-4 pt-2 text-muted'>
                  Hiển thị sau tin VIP nổi bật và trên các tin thường.
                </p>
                <div className='pricing-plan mt-4 pt-2'>
                  <h4 className='text-muted'>
                    <span className='plan pl-3 text-dark'>15.000 VNĐ</span>
                  </h4>
                  <p className='text-muted mb-0'>một Ngày</p>
                </div>
              </div>
            </div>

            <div className='col-lg-4'>
              <div className='pricing-box mt-4'>
                <div className='pricing-badge'>
                  <span className='badge'>Features</span>
                </div>
                <i className='mdi mdi-account-multiple-plus h1'></i>
                <h4 className='f-20'>Tin Vip Nổi bật</h4>
                <div className='mt-4 pt-2'>
                  <p className='mb-2 f-18'>Tính năng</p>
                  <p className='mb-2'>
                    <i className='mdi mdi-checkbox-marked-circle text-success f-18 mr-2'></i>
                    <b>Tiêu đề đậm, in hoa</b>
                  </p>
                  <p className='mb-2'>
                    <i className='mdi mdi-checkbox-marked-circle text-success f-18 mr-2'></i>
                    <b>Có biểu tượng 5 sao</b>
                  </p>
                  <p className='mb-2'>
                    <i className='mdi mdi-checkbox-marked-circle text-success f-18 mr-2'></i>
                    <b>Có huy hiệu nổi bật</b>
                  </p>
                  <p className='mb-2'>
                    <i className='mdi mdi-checkbox-marked-circle text-success f-18 mr-2'></i>
                    <b>Luôn nằm đầu trang</b>
                  </p>
                </div>
                <p className='mt-4 pt-2 text-muted'>
                  Nằm trên tất cả các tin khác, được hưởng nhiều ưu tiên và hiệu
                  quả giao dịch cao nhất.
                </p>
                <div className='pricing-plan mt-4 pt-2'>
                  <h4 className='text-muted'>
                    <span className='plan pl-3 text-dark'>20.000 VNĐ</span>
                  </h4>
                  <p className='text-muted mb-0'>một Ngày</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ServicePriceList
