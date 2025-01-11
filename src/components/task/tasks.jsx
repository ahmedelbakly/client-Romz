import { Button, Grid2 } from '@mui/material'
import DataTable from './table'
import { Typography } from '@mui/material'

import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../../hooks/useUser'
import axiosInstance from '../../helper/axiosInstance'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import isAuthenticated from '../../helper/PrivateRoute '

const Tasks = () => {
  const navigate = useNavigate()
  const { setLoading, user } = useUser()
  const [tasks, setTasks] = useState([])
  const [reGet, setReGet] = useState(false)

  if (!isAuthenticated(user, 'tasks', 'read')) {
    navigate('/')
  }

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosInstance.get('/task/get-all')
        setTasks(response?.data?.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchTasks()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reGet])

  console.log({ tasks })

  // Handle delete
  const handleDelete = async id => {
    try {
      const response = await axiosInstance.delete(`/tasks/${id}`)
      if (response.data.success) {
        toast('Task deleted successfully', { type: 'success' })
        setReGet(!reGet)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='bg-slate-800 h-screen p-10 flex flex-col gap-5 justify-center items-center'>
      <Grid2 className='flex justify-between items-center w-[700px]'>
        <Typography variant='h4' className='text-white'>
          Tasks
        </Typography>
        <Link to={'/tasks/add'}>
          <Button variant='contained' color='primary'>
            Add Task
          </Button>
        </Link>
      </Grid2>
      <Grid2 container spacing={2}>
        <DataTable rows={tasks} handleDelete={handleDelete} />
      </Grid2>
    </div>
  )
}

export default Tasks
