import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Bar } from 'react-chartjs-2'
import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js'
import Loader from '../layout/Loader'
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons'
import { statisticalAdmin, clearErrors } from '../../actions/postActions'

const Dashboard = () => {
  const dispatch = useDispatch()
  const alert = useAlert()
  const token = Cookies.get('accessToken')

  const [chartData, setChartData] = useState({
    labels: ['Red', 'Orange', 'Blue'],
    datasets: [
      {
        label: 'Popularity of colours',
        data: [55, 23, 96],
        // you can set indiviual colors for each bar
        backgroundColor: ['#50AF95', '#f3ba2f', '#2a71d0'],
        borderWidth: 1,
      },
    ],
  })
  const [chartDataMoth, setChartDataMoth] = useState({
    labels: ['Red', 'Orange', 'Blue'],
    datasets: [
      {
        label: 'Popularity of colours',
        data: [55, 23, 96],
        // you can set indiviual colors for each bar
        backgroundColor: ['#50AF95', '#f3ba2f', '#2a71d0'],
        borderWidth: 1,
      },
    ],
  })
  const { loading, statistical, error } = useSelector(
    (state) => state.statisticalAdmin
  )

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
  }, [alert, error])

  useEffect(() => {
    dispatch(statisticalAdmin(token))
  }, [dispatch])

  useEffect(() => {
    if (statistical.statistics !== undefined) {
      setChartData({
        labels: ['Tin thường', 'Tin Vip', 'Tin Vip nổi bật'],
        // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
        datasets: [
          {
            label: 'Popularity of colours',
            data: [
              statistical.statistics.packRevenue.find(
                (pack) => pack.packName === 'Tin thường'
              ).totalRevenue,
              statistical.statistics.packRevenue.find(
                (pack) => pack.packName === 'Tin Vip'
              ).totalRevenue,
              statistical.statistics.packRevenue.find(
                (pack) => pack.packName === 'Tin Vip nổi bật'
              ).totalRevenue,
            ],
            // you can set indiviual colors for each bar
            backgroundColor: ['#50AF95', '#f3ba2f', '#2a71d0'],
            borderWidth: 1,
          },
        ],
      })
      setChartDataMoth({
        labels: ['Tin thường', 'Tin Vip', 'Tin Vip nổi bật'],
        // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
        datasets: [
          {
            label: 'Popularity of colours',
            data: [
              statistical.statistics.packRevenueThisMonth.find(
                (pack) => pack.packName === 'Tin thường'
              ).totalRevenue,
              statistical.statistics.packRevenueThisMonth.find(
                (pack) => pack.packName === 'Tin Vip'
              ).totalRevenue,
              statistical.statistics.packRevenueThisMonth.find(
                (pack) => pack.packName === 'Tin Vip nổi bật'
              ).totalRevenue,
            ],
            // you can set indiviual colors for each bar
            backgroundColor: ['#50AF95', '#f3ba2f', '#2a71d0'],
            borderWidth: 1,
          },
        ],
      })
    }
  }, [statistical])
  return (
    <>
      <div>
        <nav
          aria-label='breadcrumb'
          className='bg-body-secondary px-3 py-1 mb-3'
        >
          <ol className='breadcrumb mb-0 py-1'>
            <li className='breadcrumb-item'>
              <Link to='/' className='text-decoration-none'>
                TroTot123
              </Link>
            </li>
            <li className='breadcrumb-item active' aria-current='page'>
              Trang quản lý - Admin
            </li>
          </ol>
        </nav>
        {loading ? (
          <Loader />
        ) : (
          <>
            <div
              class='me-3 border-5 border-success border-start shadow p-3 bg-body rounded '
              style={{ textAlign: 'center' }}
            >
              <div className='text-success fw-bold fs-3'>TỔNG DOANH THU</div>
              <div className='fw-bold fs-4'>
                {parseInt(statistical.statistics?.totalRevenue).toLocaleString(
                  'vi-VN'
                )}{' '}
                VND
              </div>
            </div>
            <div>
              <div class='row ms-0 me-0' style={{ marginTop: '20px' }}>
                <div class='col me-3 border-5 border-primary border-start shadow p-3 mb-3 bg-body rounded d-flex justify-content-between'>
                  <div>
                    <div className='text-primary fw-bold'>
                      DOANH THU (Tháng)
                    </div>
                    <div className='fw-bold'>
                      {parseInt(
                        statistical.statistics?.totalRevenueThisMonth
                      ).toLocaleString('vi-VN')}{' '}
                      VND
                    </div>
                  </div>
                  <FontAwesomeIcon
                    icon={faSquarePlus}
                    className='me-2 align-self-center'
                  />
                </div>
                <div class='col me-3 border-5 border-success border-start shadow p-3 mb-3 bg-body rounded d-flex justify-content-between'>
                  <div>
                    <div className='text-success fw-bold'>TỔNG SỐ BÀI ĐĂNG</div>
                    <div className='fw-bold'>
                      {statistical.statistics?.totalPosts}
                    </div>
                  </div>
                  <FontAwesomeIcon
                    icon={faSquarePlus}
                    className='me-2 align-self-center'
                  />
                </div>
                <div class='col  me-3 border-5 border-info border-start shadow p-3 mb-3 bg-body rounded d-flex justify-content-between'>
                  <div>
                    <div className='text-info fw-bold'>SỐ BÀI ĐĂNG MỚI</div>
                    <div className='fw-bold'>
                      {statistical.statistics?.newPosts}
                    </div>
                  </div>
                  <FontAwesomeIcon
                    icon={faSquarePlus}
                    className='me-2 align-self-center'
                  />
                </div>
                <div class='col  me-3 border-5 border-warning border-start shadow p-3 mb-3 bg-body rounded d-flex justify-content-between'>
                  <div>
                    <div className='text-warning fw-bold'>BÀI ĐƯỢC DUYỆT</div>
                    <div className='fw-bold'>
                      {statistical.statistics?.totalApprovedPost}
                    </div>
                  </div>
                  <FontAwesomeIcon
                    icon={faSquarePlus}
                    className='me-2 align-self-center'
                  />
                </div>
              </div>
              <div class='row ms-0 me-0'>
                <div class='col me-3 border-5 border-primary border-start shadow p-3 mb-5 bg-body rounded d-flex justify-content-between'>
                  <div>
                    <div className='text-primary fw-bold'>
                      TRUNG BÌNH BÀI ĐĂNG/NGƯỜI DÙNG
                    </div>
                    <div className='fw-bold'>
                      {statistical.statistics?.avgPostPerUser.toFixed(2)}
                    </div>
                  </div>
                  <FontAwesomeIcon
                    icon={faSquarePlus}
                    className='me-2 align-self-center'
                  />
                </div>
                <div class='col me-3 border-5 border-success border-start shadow p-3 mb-5 bg-body rounded d-flex justify-content-between'>
                  <div>
                    <div className='text-success fw-bold'>
                      SỐ LƯỢNG TÀI KHOẢN NGƯỜI DÙNG
                    </div>
                    <div className='fw-bold'>
                      {statistical.statistics?.totalUser}
                    </div>
                  </div>
                  <FontAwesomeIcon
                    icon={faSquarePlus}
                    className='me-2 align-self-center'
                  />
                </div>
                <div class='col me-3 border-5 border-info border-start shadow p-3 mb-5 bg-body rounded d-flex justify-content-between'>
                  <div>
                    <div className='text-info fw-bold'>
                      SỐ BÀI ĐĂNG CHƯA DUYỆT
                    </div>
                    <div className='fw-bold'>
                      {statistical.statistics?.toModeratedPost}
                    </div>
                  </div>
                  <FontAwesomeIcon
                    icon={faSquarePlus}
                    className='me-2 align-self-center'
                  />
                </div>
                <div class='col me-3 border-5 border-warning border-start shadow p-3 mb-5 bg-body rounded d-flex justify-content-between'>
                  <div>
                    <div className='text-warning fw-bold'>BÀI VI PHẠM</div>
                    <div className='fw-bold'>
                      {statistical.statistics?.totalViolatedPost}
                    </div>
                  </div>
                  <FontAwesomeIcon
                    icon={faSquarePlus}
                    className='me-2 align-self-center'
                  />
                </div>
              </div>
              <div className='row'>
                <div className='chart-container col-md-6'>
                  <h2 style={{ textAlign: 'center' }}>
                    Tổng lợi nhuận các gói tin
                  </h2>
                  <Bar
                    data={chartData}
                    options={{
                      plugins: {
                        title: {
                          display: true,
                        },
                        legend: {
                          display: false,
                        },
                      },
                    }}
                  />
                </div>
                <div className='chart-container col-md-6'>
                  <h2 style={{ textAlign: 'center' }}>
                    Lợi nhuận gói tin trong tháng
                  </h2>
                  <Bar
                    data={chartDataMoth}
                    options={{
                      plugins: {
                        title: {
                          display: true,
                        },
                        legend: {
                          display: false,
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Dashboard
