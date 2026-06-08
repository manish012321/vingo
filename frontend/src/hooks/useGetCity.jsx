import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentAddress, setCurrentCity, setCurrentState } from '../redux/userSlice'
import { setAddress, setLocation } from '../redux/mapSlice'

const normalize = (str) =>
  str?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim() ?? ""

function useGetCity() {
  const dispatch = useDispatch()
  const { userData } = useSelector(state => state.user)
  const apiKey = import.meta.env.VITE_GEOAPIKEY

  useEffect(() => {
    if (!userData) return  // ← only run when logged in

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords
          dispatch(setLocation({ lat: latitude, lon: longitude }))

          const result = await axios.get(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`
          )
          const place = result?.data?.results[0]
          if (!place) return

          dispatch(setCurrentCity(normalize(place.city || place.county)))
          dispatch(setCurrentState(normalize(place.state)))
          dispatch(setCurrentAddress(place.address_line2 || place.address_line1))
          dispatch(setAddress(place.address_line2))
        } catch (error) {
          console.error("Reverse geocoding failed:", error)
        }
      },
      (err) => console.warn("Geolocation denied:", err.message)
    )
  }, [userData])  // runs once when user loads
}

export default useGetCity