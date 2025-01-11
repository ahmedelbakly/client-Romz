import { DataGrid } from '@mui/x-data-grid'
import Paper from '@mui/material/Paper'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


// handleDelete



const paginationModel = { page: 0, pageSize: 5 }

export default function DataTable ({ rows, handleDelete }) {
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
      headerClassName: 'header-style',
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 400,
      headerClassName: 'header-style',
      align: 'left',
      headerAlign: 'center',
      renderCell: params => (
        <h2
          title={params.value}
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            width: '400px',
            margin: 0,
            fontSize: '16px',
            color: '#374151',
            paddingLeft: '150px' // Neutral Gray
          }}
        >
          {params.value}
        </h2>
      )
    },
    // Add two buttons here
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      headerClassName: 'header-style',
      align: 'center',
      headerAlign: 'center',
      renderCell: params =>
        params?.row?.name !== 'admin' && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%'
            }}
          >
            <Link
              to={`/roles/edit/${params.row.id}`}
              className='text-blue-500 font-bold py-0 px-4 rounded mr-2'
            >
              Edit
            </Link>
            <button
              className='text-red-500 font-bold py-0 px-4 rounded'
              onClick={() => handleDelete(params.row.id)} // Call the delete function here
            >
              Delete
            </button>
          </div>
        )
    }
  ]
  
  // Map rows to ensure each row has an 'id' field
  const mappedRows = rows.map(row => ({
    ...row,
    id: row._id // Map '_id' to 'id'
  }))

  return (
    <Paper sx={{ height: 400, width: '700px' }}>
      <DataGrid
        rows={mappedRows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{
          border: 0,
          '& .MuiDataGrid-row': {
            fontSize: '14px',
            color: '#1F2937',
            height: '70px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: '30px',
            '&:hover': {
              backgroundColor: '#F3F4F6' // Light Gray on Hover
            }
          },
          '& .MuiDataGrid-row:nth-of-type(odd)': {
            backgroundColor: '#FAFAFA' // Subtle Background for Odd Rows
          },
          '& .MuiDataGrid-row:nth-of-type(even)': {
            backgroundColor: '#FFFFFF' // White Background for Even Rows
          },
          '& .MuiDataGrid-row.Mui-selected': {
            backgroundColor: '#E5E7EB !important', // Slightly Darker Gray for Selected Rows
            color: '#000000' // Black Text for Selected Rows
          },
          '& .MuiDataGrid-row.Mui-selected:hover': {
            backgroundColor: '#D1D5DB !important' // Darker Gray on Hover for Selected Rows
          },
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid #E5E7EB' // Subtle Border Between Cells
          }
        }}
      />
    </Paper>
  )
}

DataTable.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired, // Ensure '_id' is required
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  handleDelete: PropTypes.func.isRequired // Ensure handleDelete function is passed as a prop
}
