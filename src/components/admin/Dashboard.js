import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Bar } from 'react-chartjs-2'
import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js'
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons'
import { statisticalAdmin } from '../../actions/postActions'

const Dashboard = () => {
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
  const { loading, statistical } = useSelector(
    (state) => state.statisticalAdmin
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(statisticalAdmin(token))
  }, [dispatch])
  useEffect(() => {
    statistical.statistics &&
      setChartData({
        labels: [
          statistical.statistics.packRevenue[0].packName,
          statistical.statistics.packRevenue[1].packName,
          statistical.statistics.packRevenue[2].packName,
        ],
        // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
        datasets: [
          {
            label: 'Popularity of colours',
            data: [
              statistical.statistics.packRevenue[0].totalRevenue,
              statistical.statistics.packRevenue[1].totalRevenue,
              statistical.statistics.packRevenue[2].totalRevenue,
            ],
            // you can set indiviual colors for each bar
            backgroundColor: ['#50AF95', '#f3ba2f', '#2a71d0'],
            borderWidth: 1,
          },
        ],
      })
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
                <div className='text-primary fw-bold'>DOANH THU (Tháng)</div>
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
                <div className='text-primary fw-bold'>BÀI VI PHẠM</div>
                <div className='fw-bold'>
                  {statistical.statistics?.totalViolatedPost}
                </div>
              </div>
              <FontAwesomeIcon
                icon={faSquarePlus}
                className='me-2 align-self-center'
              />
            </div>
            <div class='col me-3 border-5 border-success border-start shadow p-3 mb-5 bg-body rounded d-flex justify-content-between'>
              <div>
                <div className='text-success fw-bold'>BÀI ĐĂNG CHƯA DUYỆT</div>
                <div className='fw-bold'>
                  {statistical.statistics?.toModeratedPost}
                </div>
              </div>
              <FontAwesomeIcon
                icon={faSquarePlus}
                className='me-2 align-self-center'
              />
            </div>
            <div class='col  me-3 border-5 border-info border-start shadow p-3 mb-5 bg-body rounded d-flex justify-content-between'>
              <div>
                <div className='text-info fw-bold'>SỐ LƯỢNG NGƯỜI DÙNG</div>
                <div className='fw-bold'>
                  {statistical.statistics?.totalUser}
                </div>
              </div>
              <FontAwesomeIcon
                icon={faSquarePlus}
                className='me-2 align-self-center'
              />
            </div>
            <div class='col me-3 border-5 border-warning border-start shadow p-3 mb-5 bg-body rounded d-flex justify-content-between'>
              <div>
                <div className='text-warning fw-bold'>NGƯỜI DÙNG/BÀI ĐĂNG</div>
                <div className='fw-bold'>
                  {statistical.statistics?.avgPostPerUser}
                </div>
              </div>
              <FontAwesomeIcon
                icon={faSquarePlus}
                className='me-2 align-self-center'
              />
            </div>
          </div>
          <div className='row'>
            <div className='chart-container col-md-8'>
              <h2 style={{ textAlign: 'center' }}>Biểu đồ</h2>
              <Bar
                data={chartData}
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: 'Lợi nhuận gói tin',
                    },
                    legend: {
                      display: false,
                    },
                  },
                }}
              />
            </div>
            <div className='col-md-4 align-center align-content-center'>
              <div className='col me-3  border-5 border-secondary border-start shadow p-3 bg-body rounded d-flex justify-content-around h-50'>
                <div className='align-center align-content-center'>
                  <div className='text-secondary fw-bold'>
                    DOANH THU GÓI NỔI BẬT (THÁNG)
                  </div>
                  <div className='text-secondary fw-bold'>
                    {statistical.statistics?.packRevenueThisMonth[0].packName}
                  </div>
                  <div className='fw-bold fs-4'>
                    {parseInt(
                      statistical.statistics?.packRevenueThisMonth[0]
                        .totalRevenue
                    ).toLocaleString('vi-VN')}{' '}
                    VND
                  </div>
                </div>
                <FontAwesomeIcon
                  icon={faSquarePlus}
                  className='me-2 align-self-center'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
