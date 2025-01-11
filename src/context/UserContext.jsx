import { useState } from 'react'
import PropTypes from 'prop-types'
import axiosInstance from '../helper/axiosInstance'
import { useEffect } from 'react'
import UserContext from './context'
import { useNavigate } from 'react-router-dom'

// Create the UserContext
// UserProvider component to wrap around parts of the app that need user data
export const UserProvider = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const token = localStorage.getItem('token')

  useEffect(() => {
    const getUser = async () => {
      setLoading(true)
      try {
        const user = await axiosInstance.get('/user/userOnAuth')
        setUser(user.data.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
        navigate('/signin')
      }
    }
    if (token) {
      getUser()
    }
  }, [navigate, token])

  const logout = async () => {
    try {
      localStorage.removeItem('token')
      setUser(null)
      navigate('/signin')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  //er` can be null or contain user data

  return (
    <UserContext.Provider
      value={{ user, setUser, logout, loading, setLoading }}
    >
      {children}
    </UserContext.Provider>
  )
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired
}
