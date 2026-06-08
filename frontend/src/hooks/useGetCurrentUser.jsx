import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import api from '../axiosInstance'  // ← use this, not axios directly

function useGetCurrentUser() {
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await api.get('/api/user/current')
        dispatch(setUserData(result.data))
      } catch (error) {
        // 400/401 = not logged in, safe to ignore
        if (error.response?.status !== 400 && error.response?.status !== 401) {
          console.log(error)
        }
      }
    }
    fetchUser()
  }, [])
}

export default useGetCurrentUser