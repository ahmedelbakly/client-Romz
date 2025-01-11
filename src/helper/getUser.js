
import axiosInstance from './axiosInstance'

export const getUser = async() => {
  try {
    const user = await axiosInstance.get('/user/userOnAuth')
    return user.data.data
  } catch (error) {
    console.log(error)
  }
}
