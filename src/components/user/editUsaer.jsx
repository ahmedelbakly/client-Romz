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
import { useUser } from '../../hooks/useUser'
import axiosInstance from '../../helper/axiosInstance'
import { serverUrl } from '../../constant'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { hasRequiredPermissions } from '../../helper/helper-functions'
import isAuthenticated from '../../helper/PrivateRoute '

const EditUserForm = () => {
  const navigate = useNavigate()
  const { setLoading, user: authUser } = useUser()
  const { userId } = useParams()
  const [roles, setRoles] = useState([])
  const [user, setUser] = useState(null)

  if (!hasRequiredPermissions(authUser, 'users', ['read', 'update'])) {
    if (!isAuthenticated(authUser, 'users', 'read')) {
      navigate('/users')
    }
    navigate('/')
  }

  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true)
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
  }, [setLoading])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const rolesResponse = await axiosInstance.get('/role')
        setRoles(rolesResponse?.data?.data)

        const userResponse = await axiosInstance.get(
          `${serverUrl}/user/getUserById/${userId}`
        )
        setUser(userResponse?.data?.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [setLoading, userId])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
      role: user?.role?._id || user?.role || '',
      password: '', // Added password field
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
      role: Yup.string().required('Role is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .nullable(),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance.put(
          `${serverUrl}/user/updateUser/${userId}`,
          values
        )
        if (response.data.success) {
          toast.success('User updated successfully')
          navigate('/users')
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error updating user')
      }
    },
  })

  return (
    <Container
      maxWidth="md"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper elevation={3} style={{ padding: '2rem', width: '100%' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Edit User
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            {/* Name */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>

            {/* Email */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>

            {/* Role */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="role"
                name="role"
                label="Role"
                variant="outlined"
                select
                value={formik.values.role}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.role && Boolean(formik.errors.role)}
                helperText={formik.touched.role && formik.errors.role}
              >
                <MenuItem value="">Select Role</MenuItem>
                {roles.map((role) => (
                  <MenuItem key={role._id} value={role._id}>
                    {role.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Password */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>

            {/* Submit Button */}
            <Grid
              item
              xs={12}
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Button
                onClick={() => navigate('/users')}
                variant="contained"
                color="primary"
                size="large"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Update User
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default EditUserForm
