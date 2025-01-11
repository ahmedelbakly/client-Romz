import { Button, Grid2 } from '@mui/material'
import DataTable from './table'
import { Typography } from '@mui/material'

import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../../hooks/useUser'
import axiosInstance from '../../helper/axiosInstance'
import { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import isAuthenticated from '../../helper/PrivateRoute '

const Roles = () => {
  const navigate = useNavigate()
  const {setLoading,user } = useUser()
  const [roles, setRoles] = useState([])
  const [reGet, setReGet] = useState(false)
  
  if (!isAuthenticated(user, 'roles', 'read')) {
    navigate('/')
  }

  useEffect(() => {
    const fetchRoles = async () => {
        
        try {
          const response = await axiosInstance.get('/role')
          setRoles(response?.data?.data)
        } catch (error) {
          console.log(error)
        } finally {
          setLoading(false)
        }
      }
    fetchRoles()
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reGet])

  // handle delete
  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(`/role/${id}`)
      if (response.data.success) {
        toast("Role deleted successfully", { type: 'success' })
        setReGet(!reGet)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='bg-slate-800 h-screen p-10 flex flex-col gap-5  justify-center items-center'>
      <Grid2 className='flex justify-between items-center w-[700px] '>
        <Typography variant='h4' className='text-white'>
          Roles
        </Typography>
        <Link to={'/roles/add'}>
          <Button variant='contained' color='primary'>
            Add Role
          </Button>
        </Link>
      </Grid2>
      <Grid2 container spacing={2}>
        <DataTable  rows={roles} handleDelete={handleDelete}/>
      </Grid2>
    </div>
  )
}

export default Roles