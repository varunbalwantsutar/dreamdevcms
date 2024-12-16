import React, { useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { IconButton, Tooltip, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { createEnquiryRequest, deleteEnquiryRequest, getAllEnquirysRequest, updateEnquiryRequest } from "../api/enquiry";
import Swal from 'sweetalert2';

const App = ({data,setData}) => {
  const [open, setOpen] = useState(false); // Dialog for Add/Edit
  const [isEditMode, setIsEditMode] = useState(false); // Flag for Add/Edit mode
  const [newRow, setNewRow] = useState({
    id: "",
    name: "",
    phone_no: "",
    email: "",
    source: "",
    service: "",
  });

  useEffect(() => {
    getAllEnquirysRequest()
      .then((res) => setData(res.data?.enquirys))
      .catch((err) => console.log(err));
  }, []);

  // Edit action handler
  const handleEdit = (row) => {
    setNewRow(row); // Prefill form with row data
    setIsEditMode(true); // Set to edit mode
    setOpen(true); // Open dialog
  };

  // Save updated data after editing
  const handleUpdateEnquiry = () => {
    updateEnquiryRequest(newRow, newRow._id)
      .then((res) => {
        Swal.fire({
          title: "Enquiry Updated Successfully",
          text: "Enquiry details updated",
          icon: "success",
          confirmButtonText: "Got it",
        });
        getAllEnquirysRequest()
          .then((res) => setData(res.data?.enquirys))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    setOpen(false);
    setIsEditMode(false);
  };

  // Add New action handler
  const handleAddNew = (data) => {
    createEnquiryRequest(data)
      .then((res) => {
        Swal.fire({
          title: "New Enquiry Created Successfully",
          text: "Enquiry raised",
          icon: "success",
          confirmButtonText: "Got it",
        });
        getAllEnquirysRequest()
          .then((res) => setData(res.data?.enquirys))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    setOpen(false);
  };

  // Open dialog for adding new row
  const openAddDialog = () => {
    setNewRow({
      id: "",
      name: "",
      phone_no: "",
      email: "",
      source: "",
      service: "",
    });
    setIsEditMode(false);
    setOpen(true);
  };

  // Columns definition
  const columns = [
    { accessorKey: "createdAt", header: "Date & Time" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "phone_no", header: "Phone No" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "source", header: "Source" },
    { accessorKey: "service", header: "Service" },
    {
      accessorKey: "actions",
      header: "Actions",
      enableSorting: false,
      enableColumnFilter: false,
      Cell: ({ row }) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Tooltip title="Edit">
            <IconButton color="primary" onClick={() => handleEdit(row.original)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              color="error"
              onClick={() => handleDelete(row.original)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Enquirys</h1>
      {/* <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={openAddDialog}
        style={{ marginBottom: "20px" }}
      >
        Add New
      </Button> */}

      <MaterialReactTable columns={columns} data={data} />

      {/* Dialog for Adding/Editing Row */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{isEditMode ? "Edit Enquiry" : "Add New Enquiry"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="dense"
            value={newRow.name}
            onChange={(e) => setNewRow({ ...newRow, name: e.target.value })}
          />
          <TextField
            label="Phone no"
            type="text"
            fullWidth
            margin="dense"
            value={newRow.phone_no}
            onChange={(e) => setNewRow({ ...newRow, phone_no: e.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            margin="dense"
            value={newRow.email}
            onChange={(e) => setNewRow({ ...newRow, email: e.target.value })}
          />
          <TextField
            label="Source"
            fullWidth
            margin="dense"
            value={newRow.source}
            onChange={(e) => setNewRow({ ...newRow, source: e.target.value })}
          />
          <TextField
            label="Service"
            fullWidth
            margin="dense"
            value={newRow.service}
            onChange={(e) => setNewRow({ ...newRow, service: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={isEditMode ? handleUpdateEnquiry : handleAddNew}
          >
            {isEditMode ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default App;


