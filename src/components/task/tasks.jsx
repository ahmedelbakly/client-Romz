import { Button, Grid2, MenuItem, TextField } from "@mui/material";
import DataTable from "./table";
import { Typography } from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import axiosInstance from "../../helper/axiosInstance";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import isAuthenticated from "../../helper/PrivateRoute ";

const Tasks = () => {
  const navigate = useNavigate();
  const { setLoading, user } = useUser();
  const [tasks, setTasks] = useState([]);
  const [reGet, setReGet] = useState(false);
  const [searchData, setSearchData] = useState({
    status: null,
    priority: null,
  });

  const handleChangeSearch = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  const handleSearchApi = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.get("/task/get-all-search", {
        params: { ...searchData },
      });
      setTasks(response?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated(user, "tasks", "read")) {
    navigate("/");
  }

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosInstance.get("/task/get-all");
        setTasks(response?.data?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reGet]);

  console.log({ tasks });

  // Handle delete
  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(`/task/delete/${id}`);
      if (response.data.success) {
        toast("Task deleted successfully", { type: "success" });
        setReGet(!reGet);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-slate-800 h-screen p-10 flex flex-col gap-5 justify-center items-center">
      <Grid2 className="flex justify-between items-center w-[1000px]">
        <Typography variant="h4" className="text-white">
          Tasks
        </Typography>
        {isAuthenticated(user, "tasks", "add") && (
          <Link to={"/tasks/add"}>
            <Button variant="contained" color="primary">
              Add Task
            </Button>
          </Link>
        )}
      </Grid2>
      <Grid2 container spacing={2} className="w-[1000px]">
        <form className=" w-full flex gap-5 bg-white p-5 rounded-lg" onSubmit={handleSearchApi}>
          <TextField
            fullWidth
            id="status"
            name="status"
            label="Status"
            variant="outlined"
            select
            value={searchData.status}
            onChange={handleChangeSearch}
            onBlur={""}
          >
            <MenuItem value="">Select Status</MenuItem>
            <MenuItem value="to do">To Do</MenuItem>
            <MenuItem value="in progress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </TextField>
          <TextField
            fullWidth
            id="priority"
            name="priority"
            label="Priority"
            variant="outlined"
            select
            value={searchData.priority}
            onChange={handleChangeSearch}
            onBlur={""}
          >
            <MenuItem value="">Select Priority</MenuItem>
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </TextField>
          <Button
            variant="contained"
            color="primary"
            sx={{ padding: "10px 40px" }}
            type="submit"
          >
            Search
          </Button>
        </form>
      </Grid2>
      <Grid2 container spacing={2}>
        <DataTable rows={tasks} handleDelete={handleDelete} />
      </Grid2>
    </div>
  );
};

export default Tasks;
