import React from 'react'

const SearchFilter = () => {
  return (
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
                <select className='form-select border-0'>
                  <option defaultValue={'1'}>Location</option>
                  <option value='1'>Location 1</option>
                  <option value='2'>Location 2</option>
                  <option value='3'>Location 3</option>
                </select>
              </div>
              <div className='col-md-3'>
                <select className='form-select border-0 '>
                  <option defaultValue={'1'}>Property Type</option>
                  <option value='1'>Property Type 1</option>
                  <option value='2'>Property Type 2</option>
                  <option value='3'>Property Type 3</option>
                </select>
              </div>
              <div className='col-md-3'>
                <select className='form-select border-0 '>
                  <option defaultValue={'1'}>Location</option>
                  <option value='1'>Location 1</option>
                  <option value='2'>Location 2</option>
                  <option value='3'>Location 3</option>
                </select>
              </div>
              <div className='col-md-3'>
                <select className='form-select border-0 '>
                  <option defaultValue={'1'}>Location</option>
                  <option value='1'>Location 1</option>
                  <option value='2'>Location 2</option>
                  <option value='3'>Location 3</option>
                </select>
              </div>
            </div>
          </div>
          <div className='col-md-2'>
            <button className='btn btn-primary border-0 w-100 '>Search</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchFilter
