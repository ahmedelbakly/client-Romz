import { useNavigate } from 'react-router-dom'
import { useUser } from '../hooks/useUser'
import PropTypes from 'prop-types'
import { useEffect } from 'react'

const Protected = ({ children }) => {
  const { user, loading } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !user) {
      // Add a delay before navigating to '/signin'
      const timeout = setTimeout(() => {
        navigate('/signin')
      }, 1000) // 1000ms delay (1 second)

      return () => clearTimeout(timeout) // Cleanup timeout if the component unmounts
    }
  }, [user, loading, navigate])

  

  // Show loading spinner while fetching user data
  if (loading) {
    return (
      <div className='fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50'>
        <div className='animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white'></div>
      </div>
    )
  }

  // If user is authenticated, render children
  if (user) {
    return <>{children}</>
  }

  // While waiting for the timeout, render nothing
  return null
}

Protected.propTypes = {
  children: PropTypes.node.isRequired
}




export default Protected
