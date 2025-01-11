import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  Grid,
  TextField,
  Button,
  MenuItem,
  Typography,
  Container,
  Paper
} from '@mui/material'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../helper/axiosInstance'
import { toast } from 'react-toastify'
import { useUser } from '../../hooks/useUser'

const EditTaskForm = () => {
  const navigate = useNavigate()
  const { setLoading } = useUser()
  const { taskId } = useParams()

  const [users, setUsers] = useState([])
  const [task, setTask] = useState(null)

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/user/get-all')
        setUsers(response?.data?.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchUsers()
  }, [])

  // Fetch task details
  useEffect(() => {
    const fetchTaskDetails = async () => {
      setLoading(true)
      try {
        const response = await axiosInstance.get(`/task/get/${taskId}`)
        setTask(response?.data?.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchTaskDetails()
  }, [taskId, setLoading])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: task?.name || '',
      userId: task?.userId?._id || task?.userId || '',
      status: task?.status || '',
      priority: task?.priority || '',
      // convert dueDate to string
      dueDate: task?.dueDate
        ? new Date(task?.dueDate).toISOString().split('T')[0]
        : ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Task name is required'),
      userId: Yup.string().required('User ID is required'),
      status: Yup.string().required('Status is required'),
      priority: Yup.string().required('Priority is required'),
      dueDate: Yup.date().required('Due date is required').nullable()
    }),
    onSubmit: async values => {
      try {
        const response = await axiosInstance.patch(
          `/task/update/${taskId}`,
          values
        )
        console.log({response})

        if (response.data.success) {
          toast.success('Task updated successfully')
          navigate('/tasks')
        }
      } catch (error) {
        console.error('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', error)
        toast.error(error.response?.data?.message || 'Error updating task')
      }
    }
  })

  return (
    <Container
      maxWidth='md'
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Paper elevation={3} style={{ padding: '2rem', width: '100%' }}>
        <Typography variant='h4' align='center' gutterBottom>
          Edit Task
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            {/* Task Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id='name'
                name='name'
                label='Task Name'
                variant='outlined'
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>

            {/* User ID */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id='userId'
                name='userId'
                label='Assigned User'
                variant='outlined'
                select
                value={formik.values.userId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.userId && Boolean(formik.errors.userId)}
                helperText={formik.touched.userId && formik.errors.userId}
              >
                <MenuItem value=''>Select User</MenuItem>
                {users.map(user => (
                  <MenuItem key={user._id} value={user._id}>
                    {user.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Status */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id='status'
                name='status'
                label='Status'
                variant='outlined'
                select
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.status && Boolean(formik.errors.status)}
                helperText={formik.touched.status && formik.errors.status}
              >
                <MenuItem value=''>Select Status</MenuItem>
                <MenuItem value='to do'>To Do</MenuItem>
                <MenuItem value='in progress'>In Progress</MenuItem>
                <MenuItem value='completed'>Completed</MenuItem>
              </TextField>
            </Grid>

            {/* Priority */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id='priority'
                name='priority'
                label='Priority'
                variant='outlined'
                select
                value={formik.values.priority}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.priority && Boolean(formik.errors.priority)
                }
                helperText={formik.touched.priority && formik.errors.priority}
              >
                <MenuItem value=''>Select Priority</MenuItem>
                <MenuItem value='low'>Low</MenuItem>
                <MenuItem value='medium'>Medium</MenuItem>
                <MenuItem value='high'>High</MenuItem>
              </TextField>
            </Grid>

            {/* Due Date */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id='dueDate'
                name='dueDate'
                label='Due Date'
                type='date'
                variant='outlined'
                value={formik.values.dueDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                InputLabelProps={{
                  shrink: true
                }}
                error={formik.touched.dueDate && Boolean(formik.errors.dueDate)}
                helperText={formik.touched.dueDate && formik.errors.dueDate}
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                fullWidth
                type='submit'
                variant='contained'
                color='primary'
                size='large'
              >
                Update Task
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default EditTaskForm
