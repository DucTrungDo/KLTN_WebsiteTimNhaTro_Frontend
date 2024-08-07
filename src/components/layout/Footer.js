import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Footer = () => {
  const { loading } = useSelector((state) => state.posts)
  return (
    <footer
      className='text-center text-lg-start text-dark'
      style={
        loading
          ? { backgroundColor: '#ECEFF1', marginTop: '240px' }
          : { backgroundColor: '#ECEFF1' }
      }
    >
      <section className='pt-2'>
        <div className='container text-center text-md-start mt-5'>
          <div className='row mt-3'>
            <div className='col-md-3 col-lg-4 col-xl-3 mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold'>TroTot123</h6>
              <hr
                className='mb-4 mt-0 d-inline-block mx-auto'
                style={{
                  width: '60px',
                  backgroundColor: '#7c4dff',
                  height: '2px',
                }}
              />
              <p>
                Here you can find good boarding houses and apartments in many
                provinces and cities with the most reasonable location and
                price.
              </p>
            </div>

            <div className='col-md-2 col-lg-2 col-xl-2 mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold'>Posts</h6>
              <hr
                className='mb-4 mt-0 d-inline-block mx-auto'
                style={{
                  width: '60px',
                  backgroundColor: '#7c4dff',
                  height: '2px',
                }}
              />
              <p>
                <a href='#!' className='text-dark'>
                  Boarding houses
                </a>
              </p>
              <p>
                <a href='#!' className='text-dark'>
                  Dormitory
                </a>
              </p>
              <p>
                <a href='#!' className='text-dark'>
                  Apartment for rent
                </a>
              </p>
              <p>
                <a href='#!' className='text-dark'>
                  House for rent
                </a>
              </p>
            </div>

            <div className='col-md-3 col-lg-2 col-xl-2 mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold'>Links</h6>
              <hr
                className='mb-4 mt-0 d-inline-block mx-auto'
                style={{
                  width: '60px',
                  backgroundColor: '#7c4dff',
                  height: '2px',
                }}
              />
              <p>
                <Link to='/user/profile' className='text-dark'>
                  Your Account
                </Link>
              </p>
              <p>
                <Link to='/user/add-new-post' className='text-dark'>
                  Create Post
                </Link>
              </p>
              <p>
                <Link to='/favorite_post' className='text-dark'>
                  Favorite Post
                </Link>
              </p>
              <p>
                <Link to='/service-price-list' className='text-dark'>
                  Service Price List
                </Link>
              </p>
            </div>

            <div className='col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold'>Contact</h6>
              <hr
                className='mb-4 mt-0 d-inline-block mx-auto'
                style={{
                  width: '60px',
                  backgroundColor: '#7c4dff',
                  height: '2px',
                }}
              />
              <p>
                <i className='fas fa-home mr-3'></i> Viet Nam, HCMC 70000, VN
              </p>
              <p>
                <i className='fas fa-envelope mr-3'></i> ducdt1192@gmail.com
              </p>
              <p>
                <i className='fas fa-phone mr-3'></i> +84964822216
              </p>
              <p>
                <i className='fas fa-print mr-3'></i> +84346952975
              </p>
            </div>
          </div>
        </div>
      </section>

      <div
        className='text-center p-3'
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
      >
        © 2024 Copyright: TroTot123
      </div>
    </footer>
  )
}

export default Footer
