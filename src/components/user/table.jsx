import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isAuthenticated from "../../helper/PrivateRoute ";
import { useUser } from "../../hooks/useUser";

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable({ rows, handleDelete }) {
  const { user } = useUser();
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      headerClassName: "header-style",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      headerClassName: "header-style",
      align: "left",
      headerAlign: "center",
      renderCell: (params) => (
        <span
          title={params.value}
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: "200px",
            paddingLeft: "50px",
            display: "inline-block",
          }}
        >
          {params.value}
        </span>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      headerClassName: "header-style",
      align: "left",
      headerAlign: "center",
      renderCell: (params) => (
        <span
          title={params.value}
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            width: "250px",
            paddingLeft: "80px",
            display: "inline-block",
          }}
        >
          {params.value}
        </span>
      ),
    },
    {
      field: "role",
      headerName: "Role",
      width: 150,
      headerClassName: "header-style",
      align: "left",
      headerAlign: "center",
      renderCell: (params) => (
        <p style={{ margin: 0, paddingLeft: "40px" }}>{params.row.role.name}</p>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      headerClassName: "header-style",
      align: "center",
      headerAlign: "center",

      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          {isAuthenticated(user, "users", "read") && (
            <Link
              to={`/users/edit/${params.row.id}`}
              style={{
                color: "#1E88E5",
                fontWeight: "bold",
                textDecoration: "none",
                marginRight: "10px",
              }}
            >
              Edit
            </Link>
          )}
          {isAuthenticated(user, "users", "delete") && (
            <button
              onClick={() => handleDelete(params.row.id)}
              style={{
                color: "#D32F2F",
                fontWeight: "bold",
                border: "none",
                background: "none",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          )}
        </div>
      ),
    },
  ];

  // Map rows to include `id` from `_id`
  const mappedRows = rows.map((row) => ({
    ...row,
    id: row._id, // Map '_id' to 'id' for DataGrid compatibility
  }));

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={mappedRows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{
          border: 0,
          "& .MuiDataGrid-row": {
            fontSize: "14px",
            color: "#374151",
            height: "70px",
            display: "flex",
            alignItems: "center",
            "&:hover": {
              backgroundColor: "#F9FAFB",
            },
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #E5E7EB",
          },
        }}
      />
    </Paper>
  );
}

DataTable.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleDelete: PropTypes.func.isRequired,
};
