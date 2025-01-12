import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Grid,
  TextField,
  Button,
  MenuItem,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useUser } from "../../hooks/useUser";
import axiosInstance from "../../helper/axiosInstance";
import { serverUrl } from "../../constant";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import isAuthenticated from "../../helper/PrivateRoute ";
import { hasRequiredPermissions } from "../../helper/helper-functions";

const AddUserForm = () => {
  const navigate = useNavigate();
  const { setLoading, user } = useUser();
  const [roles, setRoles] = useState([]);

  if (!hasRequiredPermissions(user, "users", ["read", "add"])) {
    if (!isAuthenticated(user, "users", "read")) {
      navigate("/users");
    }
    navigate("/");
  }
  // Simulating role options (in a real-world scenario, roles would be fetched from the backend)
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axiosInstance.get("/role");
        setRoles(response?.data?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoles();
  }, [setLoading]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      role: Yup.string().required("Role is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance.post(
          `${serverUrl}/user/add-new-user`,
          values
        );

        console.log(response);
        if (response.data.success) {
          toast.success("User added successfully", { type: "success" });
          navigate("/users");
        }
      } catch (error) {
        toast(error.response.data.message, { type: "error" });
      }
    },
  });

  return (
    <Container
      maxWidth="md"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper elevation={3} style={{ padding: "2rem", width: "100%" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Add User
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

            {/* Password */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                variant="outlined"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
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
                value={
                  roles.find((role) => role._id === formik.values.role)?.name
                }
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

            {/* Submit Button */}
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button
                onClick={() => navigate("/users")}
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
                Add User
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AddUserForm;
