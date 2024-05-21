import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { getProvince, getdistrict, getWard } from '../../actions/provinceAction'
import { getCategories } from '../../actions/categoryActions'
import { Link, useNavigate } from 'react-router-dom'
import { getPosts } from '../../actions/postActions'
const SearchFilter = ({ setFilterData }) => {
  const [minPrice, setMinPrice] = useState(-1)
  const [maxPrice, setMaxPrice] = useState(-1)
  const [minArea, setMinArea] = useState(-1)
  const [maxArea, setMaxArea] = useState(-1)
  const [category, setCategory] = useState('')
  const [province, setProvince] = useState('')
  const [district, setDistrict] = useState('')
  const [ward, setWard] = useState('')

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
  useEffect(() => {
    if (provinces.length !== 0 && provinces !== undefined && province !== '') {
      const keypro = provinces.find(
        (location) => location.province_name === province
      ).province_id
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
        (location) => location.district_name === district
      ).district_id
      dispatch(getWard(keydis))
    }
    if (district === '') {
      dispatch(getWard(''))
    }
    setWard('')
  }, [district])

  const handlePriceChange = (event) => {
    const value = event.target.value
    const [MiP, Map] = value.split('-').map(Number)
    setMinPrice(MiP)
    setMaxPrice(Map)
  }
  const handleAreaChange = (event) => {
    const value = event.target.value
    const [MiA, MaA] = value.split('-').map(Number)
    setMaxArea(MiA)
    setMinArea(MaA)
  }
  async function Search() {
    dispatch(
      getPosts(1, {
        minPrice: minPrice,
        maxPrice: maxPrice,
        minArea: minArea,
        maxArea: maxArea,
        category: category,
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
      category: category,
      province: province,
      district: district,
      ward: ward,
    })
  }
  return (
    <>
      <div
        className='container-fluid bg-secondary mb-3 wow fadeIn'
        data-wow-delay='0.1s'
        style={{ padding: '15px' }}
      >
        <div className='container'>
          <div className='row g-2'>
            <div className='col-md-10'>
              <div className='row g-2'>
                <div className='col-md-3'>
                  <select
                    className='form-control valid'
                    id='post_cat'
                    name='loai_chuyen_muc'
                    required=''
                    data-msg-required='Chưa chọn loại chuyên mục'
                    aria-invalid='false'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value=''>-- Chọn loại chuyên mục --</option>
                    {categories.length !== 0
                      ? categories.cates.map((category) => (
                          <option value={category._id}>{category.name}</option>
                        ))
                      : null}
                  </select>
                </div>
                <div className='col-md-3'>
                  <select
                    id='province_id'
                    name='province_id'
                    className='form-control js-select-tinhthanhpho select2-hidden-accessible'
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
                        <option
                          key={location.province_id}
                          value={location.province_name}
                        >
                          {location.province_name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className='col-md-3'>
                  <select
                    name='district_id'
                    id='district_id'
                    className='form-control js-select-quanhuyen select2-hidden-accessible'
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
                        <option
                          key={district.district_id}
                          value={district.district_name}
                        >
                          {district.district_name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className='col-md-3'>
                  <select
                    className='form-control js-select-phuongxa select2-hidden-accessible'
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
                        <option key={ward.ward_id} value={ward.ward_name}>
                          {ward.ward_name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
            <div className='col-md-2'>
              <button
                className='btn btn-primary border-0 w-100 '
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

      <div class='container' style={{ padding: '15px' }}>
        <div class='row g-2'>
          <div class='col-6 border bg-light'>
            <div class='p-3'>Chọn giá</div>
            <div class='p-3 '>
              <div class='form-check form-check-inline'>
                <input
                  class='form-check-input'
                  type='radio'
                  name='inlineRadioOptions1'
                  id='inlineRadio1'
                  value='0-1000000'
                  onChange={handlePriceChange}
                />
                <label class='form-check-label' for='inlineRadio1'>
                  Dưới 1 triệu
                </label>
              </div>
              <div class='form-check form-check-inline'>
                <input
                  class='form-check-input'
                  type='radio'
                  name='inlineRadioOptions1'
                  id='inlineRadio2'
                  value='1000000-2000000'
                  onChange={handlePriceChange}
                />
                <label class='form-check-label' for='inlineRadio2'>
                  Từ 1 đến 2 triệu
                </label>
              </div>
              <div class='form-check form-check-inline'>
                <input
                  class='form-check-input'
                  type='radio'
                  name='inlineRadioOptions1'
                  id='inlineRadio3'
                  value='2000000-4000000'
                  onChange={handlePriceChange}
                />
                <label class='form-check-label' for='inlineRadio3'>
                  từ 2-4 triệu
                </label>
              </div>
              <div class='form-check form-check-inline'>
                <input
                  class='form-check-input'
                  type='radio'
                  name='inlineRadioOptions1'
                  id='inlineRadio4'
                  value='4000000-6000000'
                  onChange={handlePriceChange}
                />
                <label class='form-check-label' for='inlineRadio4'>
                  từ 4-6 triệu
                </label>
              </div>
            </div>
            <div class='p-3 '>
              {' '}
              <div class='form-check form-check-inline'>
                <input
                  class='form-check-input'
                  type='radio'
                  name='inlineRadioOptions1'
                  id='inlineRadio5'
                  value='6000000-10000000'
                  onChange={handlePriceChange}
                />
                <label class='form-check-label' for='inlineRadio5'>
                  từ 6-10 triệu
                </label>
              </div>
              <div class='form-check form-check-inline'>
                <input
                  class='form-check-input'
                  type='radio'
                  name='inlineRadioOptions1'
                  id='inlineRadio6'
                  value='10000000-12000000'
                  onChange={handlePriceChange}
                />
                <label class='form-check-label' for='inlineRadio6'>
                  từ 10-12 triệu
                </label>
              </div>
              <div class='form-check form-check-inline'>
                <input
                  class='form-check-input'
                  type='radio'
                  name='inlineRadioOptions1'
                  id='inlineRadio7'
                  value='12000000-14000000'
                  onChange={handlePriceChange}
                />
                <label class='form-check-label' for='inlineRadio7'>
                  từ 12-14 triệu
                </label>
              </div>
            </div>
          </div>
          <div class='col-6 border bg-light'>
            <div class='p-3'>Diện tích</div>
            <div class='p-3'>
              <div class='form-check form-check-inline'>
                <input
                  class='form-check-input'
                  type='radio'
                  name='inlineRadioOptions'
                  id='inlineRadiod1'
                  value='0-20'
                  onChange={handleAreaChange}
                />
                <label class='form-check-label' for='inlineRadiod1'>
                  Dưới 20 m²
                </label>
              </div>
              <div class='form-check form-check-inline'>
                <input
                  class='form-check-input'
                  type='radio'
                  name='inlineRadioOptions'
                  id='inlineRadiod2'
                  value='20-40'
                  onChange={handleAreaChange}
                />
                <label class='form-check-label' for='inlineRadiod2'>
                  Từ 20 đến 40 m²
                </label>
              </div>
              <div class='form-check form-check-inline'>
                <input
                  class='form-check-input'
                  type='radio'
                  name='inlineRadioOptions'
                  id='inlineRadiod3'
                  value='40-60'
                  onChange={handleAreaChange}
                />
                <label class='form-check-label' for='inlineRadiod3'>
                  từ 40-60 m²
                </label>
              </div>
            </div>
            <div class='p-3 '>
              {' '}
              <div class='form-check form-check-inline'>
                <input
                  class='form-check-input'
                  type='radio'
                  name='inlineRadioOptions'
                  id='inlineRadiod4'
                  value='60-80'
                  onChange={handleAreaChange}
                />
                <label class='form-check-label' for='inlineRadiod4'>
                  từ 60-80 m²
                </label>
              </div>
              <div class='form-check form-check-inline'>
                <input
                  class='form-check-input'
                  type='radio'
                  name='inlineRadioOptions'
                  id='inlineRadiod5'
                  value='80-100'
                  onChange={handleAreaChange}
                />
                <label class='form-check-label' for='inlineRadiod5'>
                  từ 80-100 m²
                </label>
              </div>
              <div class='form-check form-check-inline'>
                <input
                  class='form-check-input'
                  type='radio'
                  name='inlineRadioOptions'
                  id='inlineRadiod6'
                  value='100-1000'
                  onChange={handleAreaChange}
                />
                <label class='form-check-label' for='inlineRadiod6'>
                  Trên 100 m²
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchFilter
