import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import initialData from "./data.json"; // Importing data from external file
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const columns = [
  {
    field: "customer",
    headerName: "Customer",
    width: 200,
    renderCell: (params) => (
      <span style={{ color: "#7f00ff", textShadow: "0px 0px 3px rgba(127, 0, 255, 0.5)" }}>
        {params.value}
      </span>
    ),
  },
  { field: "lastSeen", headerName: "Last seen", width: 150 },
  {
    field: "orders",
    headerName: "Orders",
    width: 100,
    type: "number",
  },
  {
    field: "totalSpent",
    headerName: "Total spent",
    width: 150,
    renderCell: (params) => {
      const value = params.value.replace("$", ""); // Remove $ for comparison
      const parsedValue = parseFloat(value);

      const style =
        parsedValue > 500
          ? { color: "green", textShadow: "0px 0px 3px rgba(0, 128, 0, 0.5)" }
          : { color: "red", textShadow: "0px 0px 3px rgba(255, 0, 0, 0.5)" };

      return <span style={style}>{params.value}</span>;
    },
  },
  { field: "latestPurchase", headerName: "Latest purchase", width: 200 },
  {
    field: "news",
    headerName: "News",
    width: 100,
    type: "boolean",
    renderCell: (params) => (
      params.value ? <CheckIcon style={{ color: "green" }} /> : <CloseIcon style={{ color: "red" }} />
    ),
  },
  { field: "segments", headerName: "Segments", width: 150 },
];

const MyDataGrid = () => {
  const [data] = useState(initialData); // Removed setData

  // Custom row class for the last row
  const getRowClassName = (params) => {
    if (params.indexRelativeToCurrentPage === data.length - 1) {
      return "last-row"; // Apply custom class to the last row
    }
    return "";
  };

  return (
    <div
      style={{ height: "600px", width: "90%" }}
      className="flex justify-center mx-auto -mt-8"
    >
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={15}
        rowsPerPageOptions={[5, 10, 15]}
        checkboxSelection
        disableSelectionOnClick
        sortingOrder={["asc", "desc"]}
        getRowClassName={getRowClassName} 
        sx={{
          backgroundColor: "#fef9c3",
          borderRadius: 2,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "#fde68a", 
          },
          "& .MuiTablePagination-selectLabel, & .MuiTablePagination-input": {
            color: "#7f00ff", 
          },
        }}
      />
    </div>
  );
};

export default MyDataGrid;
