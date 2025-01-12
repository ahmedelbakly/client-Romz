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
            fontSize: "16px",
            color: "#374151",
          }}
        >
          {params.value}
        </span>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      headerClassName: "header-style",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "priority",
      headerName: "Priority",
      width: 120,
      headerClassName: "header-style",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      width: 150,
      headerClassName: "header-style",
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <span title={params.value}>{params.value?.split("T")[0]}</span>
      ),
    },
    {
      field: "userId",
      headerName: "Assign To",
      width: 150,
      headerClassName: "header-style",
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <span title={params.value}>{params?.value?.name}</span>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      headerClassName: "header-style",
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            width: "100%",
          }}
        >
          {isAuthenticated(user, "tasks", "update") && (
            <Link
              to={`/tasks/edit/${params.row.id}`}
              className="text-blue-500 font-bold py-0 px-4 rounded mr-2"
            >
              Edit
            </Link>
          )}

          {isAuthenticated(user, "tasks", "delete") && (
            <button
              onClick={() => handleDelete(params.row.id)}
              className="text-red-500 font-bold py-0 px-4 rounded"
            >
              Delete
            </button>
          )}
        </div>
      ),
    },
  ];

  // Map rows to ensure each row has an 'id' field
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
            color: "#1F2937",
            height: "70px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            "&:hover": {
              backgroundColor: "#F3F4F6",
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
      status: PropTypes.string.isRequired,
      priority: PropTypes.string.isRequired,
      dueDate: PropTypes.string.isRequired,
      assignTo: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleDelete: PropTypes.func.isRequired,
};
