import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import api from '../axiosInstance'

function useUpdateLocation() {
  const { userData } = useSelector(state => state.user)

  useEffect(() => {
    if (!userData) return  // ← don't watch if not logged in

    const watchId = navigator.geolocation.watchPosition(
      async (pos) => {
        try {
          const result = await api.post('/api/user/update-location', {
            lat: pos.coords.latitude,
            lon: pos.coords.longitude
          })
          console.log(result.data)
        } catch (error) {
          console.log(error)
        }
      },
      (err) => console.warn('Location watch error:', err.message)
    )

    return () => navigator.geolocation.clearWatch(watchId)  // ← cleanup
  }, [userData])
}

export default useUpdateLocation