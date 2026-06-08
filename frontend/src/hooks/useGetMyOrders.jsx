import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMyOrders } from '../redux/userSlice'
import api from '../axiosInstance'

function useGetMyOrders() {
  const dispatch = useDispatch()
  const { userData } = useSelector(state => state.user)

  useEffect(() => {
    if (!userData) return  // ← guard
    const fetchOrders = async () => {
      try {
        const result = await api.get('/api/order/my-orders')
        dispatch(setMyOrders(result.data))
      } catch (error) {
        console.log(error)
      }
    }
    fetchOrders()
  }, [userData])
}

export default useGetMyOrders