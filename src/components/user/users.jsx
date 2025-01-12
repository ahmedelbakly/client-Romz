import { Button, Grid2 } from "@mui/material";
import DataTable from "./table";
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import axiosInstance from "../../helper/axiosInstance";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import isAuthenticated from "../../helper/PrivateRoute ";

const Users = () => {
  const { setLoading, user } = useUser();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [reGet, setReGet] = useState(false);

  if (!isAuthenticated(user, "users", "read")) {
    navigate("/");
  }

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/user/get-all");
        setLoading(false);
        setUsers(response?.data?.data);
      } catch (error) {
        console.log(error);
        setLoading(false); // Ensure loading is stopped on error
      }
    };

    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reGet]);
  // Only re-fetch when `reGet` changes

  // Handle delete user
  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(`/user/delete/${id}`);
      if (response.data.success) {
        toast("User deleted successfully", { type: "success" });
        setReGet(!reGet);
      }
    } catch (error) {
      console.log(error);
      toast("Failed to delete user", { type: "error" });
    }
  };

  return (
    <div className="bg-slate-800 h-screen p-10 flex flex-col gap-5 justify-center items-center">
      <Grid2 className="flex justify-between items-center w-[850px]">
        <Typography variant="h4" className="text-white">
          Users
        </Typography>
        {isAuthenticated(user, "users", "add") && (
          <Link to={"/users/add"}>
            <Button variant="contained" color="primary">
              Add User
            </Button>
          </Link>
        )}
      </Grid2>
      <Grid2 container spacing={2}>
        <DataTable rows={users} handleDelete={handleDelete} />
      </Grid2>
    </div>
  );
};

export default Users;
