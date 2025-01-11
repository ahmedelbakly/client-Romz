import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  Grid,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Container,
  Paper
} from '@mui/material'
import axiosInstance from '../../helper/axiosInstance'
import { serverUrl } from '../../constant'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

const EditRoleForm = () => {
  const navigate = useNavigate()
  const { roleId } = useParams() // Get roleId from URL
  const [initialValues, setInitialValues] = useState({
    name: '',
    tasks: { add: false, read: false, update: false, delete: false },
    roles: { add: false, read: false, update: false, delete: false },
    users: { add: false, read: false, update: false, delete: false }
  })

  // Fetch the role data by ID when the component is mounted
  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await axiosInstance.get(`${serverUrl}/role/${roleId}`)
        if (response.data.success) {
          setInitialValues(response.data.data) // Set role data in form
        }
      } catch (error) {
        toast(error.response.data.message, { type: 'error' })
      }
    }
    fetchRole()
  }, [roleId])

  // Formik for handling form submission
  const formik = useFormik({
    initialValues,
    enableReinitialize: true, // This ensures the form is reinitialized with new initial values
    validationSchema: Yup.object({
      name: Yup.string().required('Role name is required')
    }),
    onSubmit: async values => {
      try {
        const response = await axiosInstance.put(
          `${serverUrl}/role/${roleId}`,
          values
        )
        if (response.data.success) {
          toast('Role updated successfully', { type: 'success' })
          navigate('/roles')
        }
      } catch (error) {
        toast(error.response.data.message, { type: 'error' })
      }
    }
  })

  // Render permissions (checkboxes)
  const renderPermissions = groupName => (
    <>
      {['add', 'read', 'update', 'delete'].map(action => (
        <FormControlLabel
          key={action}
          control={
            <Checkbox
              name={`${groupName}.${action}`}
              checked={formik.values[groupName][action]}
              onChange={formik.handleChange}
            />
          }
          label={`${
            action.charAt(0).toUpperCase() + action.slice(1)
          } ${groupName}`}
        />
      ))}
    </>
  )

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
          Edit Role
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={5}>
            {/* Role Name */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                id='name'
                name='name'
                label='Role Name'
                variant='outlined'
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>

            {/* Permissions */}
            <Grid item xs={12}>
              <Typography variant='h6'>Permissions</Typography>
            </Grid>

            {/* Tasks Permissions */}
            <Grid item xs={12} sm={4}>
              <Typography variant='subtitle1'>Tasks</Typography>
              {renderPermissions('tasks')}
            </Grid>

            {/* Roles Permissions */}
            <Grid item xs={12} sm={4}>
              <Typography variant='subtitle1'>Roles</Typography>
              {renderPermissions('roles')}
            </Grid>

            {/* Users Permissions */}
            <Grid item xs={12} sm={4}>
              <Typography variant='subtitle1'>Users</Typography>
              {renderPermissions('users')}
            </Grid>

            {/* Submit Button */}
            <Grid
              item
              xs={12}
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Button
                onClick={() => navigate('/roles')}
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
                Add Role
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default EditRoleForm
