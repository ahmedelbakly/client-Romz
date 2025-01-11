
import { useState } from 'react'
import axios from 'axios'
import * as yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { serverUrl } from '../../constant'
import { useUser } from '../../hooks/useUser'

const SignIn = () => {
const {setUser } = useUser()
  const router = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})

  const schema = yup.object().shape({
    email: yup
      .string()
      .email('Invalid email format')
      .required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required')
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await schema.validate(formData, { abortEarly: false })
      setErrors({})

      // Make API call
      const response = await axios.post(`${serverUrl}/auth/login`, formData)

      if (response.data.success == true) {
        console.log('Sign in successful')
        setUser(response.data.data?.user)
        localStorage.setItem('token', response.data.data?.accessToken)
        toast('Sign in successful', { type: 'success' })
        setFormData({ email: '', password: '' })
        router('/')
      }
    } catch (err) {
      if (err.inner) {
        const formErrors = {}
        err.inner.forEach(error => {
          formErrors[error.path] = error.message
        })
        setErrors(formErrors)
      } else {
        toast(err?.response?.data?.message, { type: 'error' })
      }
    }
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center '>
      <div className='flex flex-col  items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 w-[400px] '>
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-900 dark:border-gray-600'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              Sign in to your account
            </h1>
            <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor='email'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Your email
                </label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  value={formData.email}
                  onChange={handleChange}
                  className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='name@company.com'
                />
                {errors.email && (
                  <p className='text-red-500 text-sm'>{errors.email}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor='password'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  value={formData.password}
                  onChange={handleChange}
                  placeholder='••••••••'
                  className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                />
                {errors.password && (
                  <p className='text-red-500 text-sm'>{errors.password}</p>
                )}
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-start'>
                  <div className='flex items-center h-5'>
                    <input
                      id='remember'
                      aria-describedby='remember'
                      type='checkbox'
                      className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
                    />
                  </div>
                  <div className='ml-3 text-sm'>
                    <label
                      htmlFor='remember'
                      className='text-gray-500 dark:text-gray-300'
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href='#'
                  className='text-sm font-medium text-primary-600 hover:underline dark:text-white '
                >
                  Forgot password?
                </a>
              </div>
              <button
                type='submit'
                className='w-full bg-blue-500 text-white rounded-md py-3 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50'
              >
                Sign in
              </button>
              <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                Don’t have an account yet?{' '}
                <Link
                  to='/signup'
                  className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}



export default SignIn
