import { useState } from "react";
import { Button, TextField, Typography, Container, Box } from "@mui/material";
import axios from "axios";
import { serverUrl } from "../../constant";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";

const TwoFactor = () => {
  const router = useNavigate();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (code.length !== 6) {
      setError("Please enter a valid 6-digit code");
      return;
    }

    e.preventDefault();
    try {
      // Make API call
      const response = await axios.post(`${serverUrl}/auth/check-two-factor`, {
        code,
        id: localStorage.getItem("userId"),
      });

      if (response.data.success == true) {
        console.log("Sign in successful");
        setUser(response.data.data?.user);
        localStorage.setItem("token", response.data.data?.accessToken);
        localStorage.removeItem("isTwoFactor");
        localStorage.removeItem("userId");
        toast("Sign in successful", { type: "success" });
        router("/");
      }
    } catch (err) {
      if (err.inner) {
        const formErrors = {};
        err.inner.forEach((error) => {
          formErrors[error.path] = error.message;
        });
      } else {
        toast(err?.response?.data?.message, { type: "error" });
      }
    }
  };
  const handleClearTwoFactor = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isTwoFactor");
    localStorage.removeItem("userId");
    setUser(null);
    router("/signin");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Container maxWidth="sm">
        <Box
          sx={{
            backgroundColor: "white",

            borderRadius: "10px",
            boxShadow: 3,
            width: "100%",
            marginTop: 8,
            padding: "50px 50px",
          }}
        >
          <Typography variant="h5" align="center" sx={{ marginBottom: 3 }}>
            Two-Factor Authentication
          </Typography>

          <Typography
            variant="body1"
            align="center"
            className="mb-4 text-gray-600"
          >
            Enter the code sent to your email/phone.
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Authentication Code"
              variant="outlined"
              fullWidth
              value={code}
              onChange={(e) => setCode(e.target.value)}
              sx={{ marginBottom: 3 }}
              error={!!error}
              helperText={error}
              inputProps={{ maxLength: 6 }}
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ width: "100%", backgroundColor: "primary.main" }}
            >
              Submit
            </Button>
          </form>

          <Box mt={2} className="text-center">
            <Typography variant="body2" color="textSecondary">
              Didn&apos;t receive the code?{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Resend Code
              </a>
            </Typography>

            <Typography
              variant="body2"
              color="textSecondary"
              onClick={handleClearTwoFactor}
              style={{ cursor: "pointer", marginTop: "10px", color: "blue" }}
            >
              Back to Sign in
            </Typography>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default TwoFactor;
