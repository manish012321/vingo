import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMyShopData } from '../redux/ownerSlice'
import api from '../axiosInstance'

function useGetMyShop() {
  const dispatch = useDispatch()
  const { userData } = useSelector(state => state.user)

  useEffect(() => {
    if (!userData) return  // ← don't fetch if not logged in
    const fetchShop = async () => {
      try {
        const result = await api.get('/api/shop/get-my')
        dispatch(setMyShopData(result.data))
      } catch (error) {
        console.log(error)
      }
    }
    fetchShop()
  }, [userData])
}

export default useGetMyShop