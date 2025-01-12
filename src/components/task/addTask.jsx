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
import axiosInstance from '../../helper/axiosInstance'
import { useUser } from '../../hooks/useUser'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { hasRequiredPermissions } from '../../helper/helper-functions'
import isAuthenticated from '../../helper/PrivateRoute '

const AddTaskForm = () => {
  const navigate = useNavigate()
  const { setLoading,user } = useUser()
  const [users, setUsers] = useState([])

  if (!hasRequiredPermissions(user, "tasks", ["read", "add"])) {
    if (!isAuthenticated(user, "tasks", "read")) {
      navigate("/tasks");
    }
    navigate("/");
  }

  // Fetch users function
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/user/get-all')
        setUsers(response?.data?.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [setLoading])

  const formik = useFormik({
    initialValues: {
      name: '',
      userId: '',
      status: '',
      priority: '',
      dueDate: ''
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
        const response = await axiosInstance.post('/task/create', values)

        if (response.data.success) {
          toast(response.data.message, { type: 'success' })
          navigate('/tasks')
        }
      } catch (error) {
        toast(error.response.data.message, { type: 'error' })
      }
    }
  })

  console.log(formik.values)

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
          Add Task
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            {/* Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id='name'
                name='name'
                label='Name'
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
                label='User'
                variant='outlined'
                select
                value={
                  users.find(user => user._id == formik.values.userId)?.name
                }
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
            <Grid
              item
              xs={12}
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Button
                onClick={() => navigate('/tasks')}
                variant='contained'
                color='primary'
                size='large'
              >
                Cancel
              </Button>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                size='large'
              >
                Add Task
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default AddTaskForm
