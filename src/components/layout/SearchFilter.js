import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { getProvince, getdistrict, getWard } from '../../actions/provinceAction'
import { getCategories } from '../../actions/categoryActions'
import { Link, useNavigate } from 'react-router-dom'
import { getPosts } from '../../actions/postActions'
import { RangeSlider, Slider } from 'rsuite'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import {
  faMagnifyingGlassLocation,
  faArrowLeft,
  faMoneyBill,
  faRuler,
  faList,
} from '@fortawesome/free-solid-svg-icons'
import 'rsuite/dist/rsuite-no-reset.min.css'

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    handleResize() // Call handler right away so state gets updated with initial window size

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

const SearchFilter = ({ setFilterData }) => {
  const { width, height } = useWindowSize()

  const [minPrice, setMinPrice] = useState(-1)
  const [maxPrice, setMaxPrice] = useState(-1)
  const [minArea, setMinArea] = useState(-1)
  const [maxArea, setMaxArea] = useState(-1)
  const [categoryId, setCategoryId] = useState('')
  const [province, setProvince] = useState('')
  const [district, setDistrict] = useState('')
  const [ward, setWard] = useState('')

  const [valueRangeSlider, setValueRangeSlider] = useState([1, 140])
  const [priceSliderMin, setpriceSliderMin] = useState(0)
  const [priceSliderMax, setpriceSliderMax] = useState(0)

  const [valueRangeSliderArea, setValueRangeSliderArea] = useState([10, 40])
  const [areaSliderMin, setAreaSliderMin] = useState(0)
  const [areaSliderMax, setAreaSliderMax] = useState(0)

  const [kich, setKich] = useState(false)

  const [address, setAddress] = useState('')
  const navigate = useNavigate()
  const alert = useAlert()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProvince())
    dispatch(getCategories())
  }, [dispatch, navigate])
  const { provinces } = useSelector((state) => state.province)
  const { districts } = useSelector((state) => state.district)
  const { wards } = useSelector((state) => state.ward)
  const { categories } = useSelector((state) => state.categories)

  const PriceDisplay = ({ price }) => {
    if (!price) return
    if (true) {
      const trieu = Math.floor(price / 1000000) // Phần triệu
      const tramNgan = Math.floor((price % 1000000) / 1000) // Phần trăm nghìn
      const trieuStr = trieu > 0 ? `${trieu}` : '' // Chuỗi phần triệu

      // Chuỗi phần trăm nghìn với đúng ba chữ số sau dấu chấm
      const tramNganStr =
        tramNgan > 0
          ? `.${(tramNgan / 1000).toFixed(3).slice(2)}`.replace(/0+$/, '')
          : ''
      if (trieuStr === '') {
        return `0${trieuStr}${tramNganStr} triệu`
      } else {
        return `${trieuStr}${tramNganStr} triệu`
      }
    } else {
    }
  }
  useEffect(() => {
    if (provinces.length !== 0 && provinces !== undefined && province !== '') {
      const keypro = provinces.find(
        (location) => location.full_name === province
      ).id
      dispatch(getdistrict(keypro))
    }
    if (province === '') {
      dispatch(getdistrict(''))
    }
    dispatch(getWard(''))
    setDistrict('')
    setWard('')
  }, [province])
  useEffect(() => {
    if (districts.length !== 0 && districts !== undefined && district !== '') {
      const keydis = districts.find(
        (location) => location.full_name === district
      ).id
      dispatch(getWard(keydis))
    }
    if (district === '') {
      dispatch(getWard(''))
    }
    setWard('')
  }, [district])

  const SetRangeSliderWhenhandlePriceChange = (PriceMax) => {
    switch (PriceMax) {
      case 1000000:
        setValueRangeSlider([1, 10])
        break
      case 2000000:
        setValueRangeSlider([10, 20])
        break
      case 4000000:
        setValueRangeSlider([20, 40])
        break
      case 6000000:
        setValueRangeSlider([40, 60])
        break
      case 8000000:
        setValueRangeSlider([60, 80])
        break
      case 10000000:
        setValueRangeSlider([80, 100])
        break
      case 12000000:
        setValueRangeSlider([100, 120])
        break
      case 14000000:
        setValueRangeSlider([120, 140])
        break
      default:
        console.error('Invalid PriceMax value')
    }
  }
  const SetRangeSliderWhenhandleAreaChange = (AreaMax) => {
    switch (AreaMax) {
      case 20:
        setValueRangeSliderArea([1, 20])
        break
      case 40:
        setValueRangeSliderArea([20, 40])
        break
      case 60:
        setValueRangeSliderArea([40, 60])
        break
      case 80:
        setValueRangeSliderArea([60, 80])
        break
      case 100:
        setValueRangeSliderArea([80, 100])
        break
      case 1000:
        setValueRangeSliderArea([100, 100])
        break

      default:
        console.error('Invalid AreaMax value')
    }
  }

  const handlePriceChange = (event) => {
    const value = event.target.value
    const [MiP, Map] = value.split('-').map(Number)
    setMinPrice(MiP)
    setMaxPrice(Map)
    SetRangeSliderWhenhandlePriceChange(Map)
  }
  const handleAreaChange = (event) => {
    const value = event.target.value
    const [MiA, MaA] = value.split('-').map(Number)
    setMinArea(MiA)
    setMaxArea(MaA)
    SetRangeSliderWhenhandleAreaChange(MaA)
  }
  async function Search() {
    dispatch(
      getPosts(1, {
        minPrice: minPrice,
        maxPrice: maxPrice,
        minArea: minArea,
        maxArea: maxArea,
        categoryId: categoryId,
        province: province,
        district: district,
        ward: ward,
      })
    )
    setFilterData({
      minPrice: minPrice,
      maxPrice: maxPrice,
      minArea: minArea,
      maxArea: maxArea,
      categoryId: categoryId,
      province: province,
      district: district,
      ward: ward,
    })
  }

  useEffect(() => {
    setAddress(province + ',' + district + ',' + ward)
  }, [province, district, ward])

  useEffect(() => {
    if (kich) {
      setpriceSliderMin(valueRangeSlider[0] * 100000)
      setpriceSliderMax(valueRangeSlider[1] * 100000)
      setMinPrice(valueRangeSlider[0] * 100000)
      setMaxPrice(valueRangeSlider[1] * 100000)
    }
  }, [valueRangeSlider])
  useEffect(() => {
    if (kich) {
      setAreaSliderMin(valueRangeSliderArea[0])
      setAreaSliderMax(valueRangeSliderArea[1])
      setMinArea(valueRangeSliderArea[0])
      setMaxArea(valueRangeSliderArea[1])
    }
    setKich(true)
  }, [valueRangeSliderArea])
  return (
    <>
      <div
        className='container-fluid bg-secondary mb-3 wow fadeIn'
        data-wow-delay='0.1s'
        style={{ paddingTop: '15px' }}
      >
        <div className='container'>
          <div className='row g-2'>
            <div className='col-lg-10'>
              <div className='row g-2'>
                <div className='col-lg-3'>
                  <div className='input-group mb-3'>
                    <span className='input-group-text' id='basic-addon1'>
                      <FontAwesomeIcon icon={faList} />
                    </span>
                    <select
                      className='form-control valid form-select shadow-none'
                      id='post_cat'
                      name='loai_chuyen_muc'
                      required=''
                      data-msg-required='Chưa chọn loại chuyên mục'
                      aria-invalid='false'
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                    >
                      <option value=''>Chọn chuyên mục</option>
                      {categories.length !== 0
                        ? categories.cates.map((category) => (
                            <option key={category._id} value={category._id}>
                              {category.name}
                            </option>
                          ))
                        : null}
                    </select>
                  </div>
                </div>
                <div className='col-lg-3'>
                  <button
                    type='button'
                    className='btn btn-light w-100 d-flex  justify-content-between'
                    data-bs-toggle='modal'
                    data-bs-target='#locationmodal'
                    data-bs-whatever='@mdo'
                  >
                    <FontAwesomeIcon
                      className='me-1 align-self-center'
                      icon={faMagnifyingGlassLocation}
                    />
                    {province === '' ? (
                      <span className='address text-muted'>
                        Chọn tỉnh thành
                      </span>
                    ) : (
                      <span className='address text-muted'>
                        {width >= 992
                          ? address.length > 20
                            ? address.substring(0, 12) + '...'
                            : address
                          : address}
                      </span>
                    )}

                    <FontAwesomeIcon
                      className='me-1 align-self-center'
                      icon={faArrowLeft}
                    />
                  </button>
                </div>
                <div className='col-lg-3'>
                  <button
                    type='button'
                    className='btn btn-light w-100 d-flex  justify-content-between'
                    data-bs-toggle='modal'
                    data-bs-target='#moneymodal'
                    data-bs-whatever='@mdo'
                  >
                    <FontAwesomeIcon
                      className='me-1 align-self-center'
                      icon={faMoneyBill}
                    />
                    {minPrice === -1 ? (
                      <span className='address text-muted'>Chọn giá</span>
                    ) : (
                      <span className='address text-muted'>
                        <PriceDisplay price={priceSliderMin} />-
                        <PriceDisplay price={priceSliderMax} />
                      </span>
                    )}
                    <FontAwesomeIcon
                      className='me-1 align-self-center'
                      icon={faArrowLeft}
                    />
                  </button>
                </div>
                <div className='col-lg-3'>
                  <button
                    type='button'
                    className='btn btn-light w-100 d-flex  justify-content-between'
                    data-bs-toggle='modal'
                    data-bs-target='#acreagemodal'
                    data-bs-whatever='@mdo'
                  >
                    <FontAwesomeIcon
                      className='me-1 align-self-center'
                      icon={faRuler}
                    />
                    {minArea === -1 ? (
                      <span className='text-muted'>Chọn diện tích</span>
                    ) : (
                      <span className='text-muted'>
                        {' '}
                        {areaSliderMin !== 100
                          ? areaSliderMin + 'm²' + '-' + areaSliderMax + ' m²'
                          : '->' + areaSliderMax + ' m²'}
                      </span>
                    )}

                    <FontAwesomeIcon
                      className='me-1 align-self-center'
                      icon={faArrowLeft}
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className='col-lg-2'>
              <button
                className='btn btn-primary border-0 w-100 mb-3'
                onClick={() => {
                  Search()
                }}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div
        className='modal modal-lg fade'
        id='locationmodal'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Chọn địa điểm
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <div className='row mt-3 mb-3'>
                <div className='col-lg-3'>
                  <div className='form-group'>
                    <label htmlFor='province_id' className='col-form-label'>
                      Tỉnh/Thành phố
                    </label>
                    <select
                      id='province_id'
                      name='province_id'
                      className='form-control js-select-tinhthanhpho select2-hidden-accessible form-select'
                      required=''
                      data-msg-required='Chưa chọn Tỉnh/TP'
                      tabIndex='-1'
                      aria-hidden='true'
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                    >
                      <option value=''>-- Chọn Tỉnh/TP --</option>
                      {provinces &&
                        provinces.map((location) => (
                          <option key={location.id} value={location.full_name}>
                            {location.full_name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className='col-lg-3'>
                  <div className='form-group'>
                    <label className='col-form-label' htmlFor='district_id'>
                      Quận/Huyện
                    </label>
                    <select
                      name='district_id'
                      id='district_id'
                      className='form-control js-select-quanhuyen select2-hidden-accessible  form-select'
                      required=''
                      data-msg-required='Chưa chọn Quận/Huyện'
                      tabIndex='-1'
                      aria-hidden='true'
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                    >
                      <option value=''>chọn quận huyện</option>
                      {districts &&
                        districts.map((district) => (
                          <option key={district.id} value={district.full_name}>
                            {district.full_name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className='col-lg-3'>
                  <div className='form-group'>
                    <label className='col-form-label' htmlFor='phuongxa'>
                      Phường/Xã
                    </label>
                    <select
                      className='form-control js-select-phuongxa select2-hidden-accessible form-select'
                      name='phuongxa'
                      id='phuongxa'
                      tabIndex='-1'
                      aria-hidden='true'
                      value={ward}
                      onChange={(e) => setWard(e.target.value)}
                    >
                      <option value=''>chọn phường xã</option>
                      {wards &&
                        wards.map((ward) => (
                          <option key={ward.id} value={ward.full_name}>
                            {ward.full_name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-success'
                data-bs-dismiss='modal'
              >
                Xong
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className='modal modal-lg fade'
        id='moneymodal'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Chọn giá
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <div className='d-flex justify-content-center'>
                <span className='fw-bold fs-3 text-primary'>
                  <PriceDisplay price={priceSliderMin} /> -{' '}
                  <PriceDisplay price={priceSliderMax} />
                </span>
              </div>
              <div className='d-flex justify-content-center'>
                <RangeSlider
                  max={140}
                  defaultValue={[10, 40]}
                  style={{ width: '100%' }}
                  constraint={([start, end]) => start >= 1 && end <= 140}
                  value={valueRangeSlider}
                  onChange={(value) => {
                    setValueRangeSlider(value)
                  }}
                  progress={true}
                  tooltip={true}
                  barClassName='trinh'
                  className='mb-4 mt-4 custom-slider'
                  handleStyle={{
                    borderRadius: 50,
                    color: '#fff',
                    fontSize: 12,
                    width: 25,
                    height: 25,
                  }}
                />
              </div>

              <button
                type='button'
                className='btn btn-light shadow-lg p-2 mb-2 bg-body rounded me-2'
                data-bs-toggle='button'
                autoComplete='off'
                value='0-1000000'
                onClick={handlePriceChange}
              >
                Dưới 1 triệu
              </button>
              <button
                type='button'
                className='btn btn-light shadow-lg p-2 mb-2 bg-body rounded me-2'
                data-bs-toggle='button'
                autoComplete='off'
                value='1000000-2000000'
                onClick={handlePriceChange}
              >
                Từ 1 đến 2 triệu
              </button>
              <button
                type='button'
                className='btn btn-light shadow-lg p-2 mb-2 bg-body rounded me-2'
                data-bs-toggle='button'
                autoComplete='off'
                value='2000000-4000000'
                onClick={handlePriceChange}
              >
                từ 2-4 triệu
              </button>
              <button
                type='button'
                className='btn btn-light shadow-lg p-2 mb-2 bg-body rounded me-2'
                data-bs-toggle='button'
                autoComplete='off'
                value='4000000-6000000'
                onClick={handlePriceChange}
              >
                từ 4-6 triệu
              </button>

              <button
                type='button'
                className='btn btn-light shadow-lg p-2 mb-2 bg-body rounded me-2'
                data-bs-toggle='button'
                autoComplete='off'
                value='6000000-8000000'
                onClick={handlePriceChange}
              >
                từ 6-8 triệu
              </button>
              <button
                type='button'
                className='btn btn-light shadow-lg p-2 mb-2 bg-body rounded me-2'
                data-bs-toggle='button'
                autoComplete='off'
                value='8000000-10000000'
                onClick={handlePriceChange}
              >
                từ 8-10 triệu
              </button>
              <button
                type='button'
                className='btn btn-succcess shadow-lg p-2 mb-2 bg-body rounded me-2'
                data-bs-toggle='button'
                autoComplete='off'
                value='10000000-12000000'
                onClick={handlePriceChange}
              >
                từ 10-12 triệu
              </button>
              <button
                type='button'
                className='btn btn-light shadow-lg p-2 mb-2 bg-body rounded me-2 '
                data-bs-toggle='button'
                autoComplete='off'
                value='12000000-14000000'
                onClick={handlePriceChange}
              >
                từ 12-14 triệu
              </button>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-success'
                data-bs-dismiss='modal'
              >
                Xong
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className='modal modal-lg fade'
        id='acreagemodal'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Chọn giá
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              <div className='d-flex justify-content-center'>
                <span className='fw-bold fs-3 text-primary'>
                  {areaSliderMin !== 100
                    ? areaSliderMin + 'm²' + '-' + areaSliderMax + ' m²'
                    : '->' + areaSliderMax + ' m²'}
                </span>
              </div>
              <div className='d-flex justify-content-center'>
                <RangeSlider
                  max={100}
                  defaultValue={[10, 40]}
                  style={{ width: '100%' }}
                  constraint={([start, end]) => start >= 1 && end <= 100}
                  value={valueRangeSliderArea}
                  onChange={(value) => {
                    setValueRangeSliderArea(value)
                  }}
                  progress={true}
                  tooltip={true}
                  barClassName='trinh'
                  className='mb-4 mt-4 custom-slider'
                  handleStyle={{
                    borderRadius: 50,
                    color: '#fff',
                    fontSize: 12,
                    width: 25,
                    height: 25,
                  }}
                />
              </div>

              <button
                type='button'
                className='btn btn-light shadow-lg p-2 mb-2 bg-body rounded me-2'
                data-bs-toggle='button'
                autoComplete='off'
                value='1-20'
                onClick={handleAreaChange}
              >
                Dưới 20 m²
              </button>
              <button
                type='button'
                className='btn btn-light shadow-lg p-2 mb-2 bg-body rounded me-2'
                data-bs-toggle='button'
                autoComplete='off'
                value='20-40'
                onClick={handleAreaChange}
              >
                Từ 20 đến 40 m²
              </button>
              <button
                type='button'
                className='btn btn-light shadow-lg p-2 mb-2 bg-body rounded me-2'
                data-bs-toggle='button'
                autoComplete='off'
                value='40-60'
                onClick={handleAreaChange}
              >
                từ 40-60 m²
              </button>
              <button
                type='button'
                className='btn btn-light shadow-lg p-2 mb-2 bg-body rounded me-2'
                data-bs-toggle='button'
                autoComplete='off'
                value='60-80'
                onClick={handleAreaChange}
              >
                từ 60-80 m²
              </button>

              <button
                type='button'
                className='btn btn-light shadow-lg p-2 mb-2 bg-body rounded me-2'
                data-bs-toggle='button'
                autoComplete='off'
                value='80-100'
                onClick={handleAreaChange}
              >
                từ 80-100 m²
              </button>
              <button
                type='button'
                className='btn btn-light shadow-lg p-2 mb-2 bg-body rounded me-2'
                data-bs-toggle='button'
                autoComplete='off'
                value='100-1000'
                onClick={handleAreaChange}
              >
                Trên 100 m²
              </button>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-success'
                data-bs-dismiss='modal'
              >
                Xong
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchFilter
