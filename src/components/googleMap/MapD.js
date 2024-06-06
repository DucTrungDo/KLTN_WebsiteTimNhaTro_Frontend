import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'
import React, { useRef, useState, useEffect } from 'react'
import { getlocation } from '../../actions/provinceAction'
import { useDispatch, useSelector } from 'react-redux'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useAlert } from 'react-alert'
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete'
import { GOOGLE_MAPS_APT_KEY } from '../../env'
function MapD({ direction, useDirect }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_APT_KEY,
    libraries: ['places'],
  })
  const alert = useAlert()
  const [coords, setCoords] = useState({ lat: 10.838042, lng: 106.793579 })
  const dispatch = useDispatch()
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { longitude, latitude } }) => {
        dispatch(getlocation(latitude, longitude, ''))
        setCoords({ lat: latitude, lng: longitude })
      }
    )
  }, [dispatch, isLoaded])
  useEffect(() => {
    if (isLoaded && direction !== '') {
      geocodeByAddress(direction)
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => setCoords({ lat, lng }))
        .catch((error) => console.error('Error', error))
    }
  }, [direction, isLoaded])
  const { Geos } = useSelector((state) => state.googleGeo)
  const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef()
  async function calculateRoute() {
    if (direction === '') {
      alert.error('Thông tin tìm kiếm chưa đủ')
      return
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: Geos[1].formatted_address,
      destination: direction,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
    alert.success('Tìm kiếm thành công')
  }

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={{
          width: '100%',
          height: '300px',
          marginBottom: '15px',
        }}
        center={coords}
        zoom={15}
        options={{
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: true,
          fullscreenControl: true,
        }}
        onLoad={(map) => setMap(map)}
      >
        <Marker position={coords} />
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
        <></>
      </GoogleMap>
      <div style={{ display: useDirect ? 'block' : 'none' }}>
        <div>
          <InputGroup className='mb-1'>
            <InputGroup.Text id='basic-addon1'>Khoảng cách</InputGroup.Text>
            <Form.Control
              placeholder='DisTance'
              aria-label='DisTance'
              aria-describedby='basic-addon1'
              defaultValue={distance}
              readOnly
            />
          </InputGroup>
        </div>
        <div>
          <InputGroup className='mb-2'>
            <InputGroup.Text id='basic-addon1'>Thời gian đi</InputGroup.Text>
            <Form.Control
              placeholder='Duration'
              aria-label='Duration'
              aria-describedby='basic-addon1'
              defaultValue={duration}
              readOnly
            />
          </InputGroup>
        </div>

        <div className='d-grid gap-2'>
          <Button onClick={calculateRoute} variant='primary' size='ms'>
            Tìm đường
          </Button>
        </div>
      </div>
    </>
  ) : (
    <></>
  )
}
export default MapD
