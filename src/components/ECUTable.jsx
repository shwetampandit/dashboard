import React, { useState, useEffect } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Typography,
  // Box,
  CircularProgress,
  Alert,
} from "@mui/material";

// ECU Table Component
// Displays a list of ECUs with their vulnerability counts and security status
// Uses pagination to manage large datasets
// Provides a clickable row that triggers an onEcuSelect callback

const ECUTable = ({ ecus, onEcuSelect, isLoading, error }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [selectedEcuId, setSelectedEcuId] = useState(1);

  // Load selected ECU id from localStorage on mount
  useEffect(() => {
    const storedId = localStorage.getItem("selectedEcuId");
    if (storedId) {
      setSelectedEcuId(storedId);
    }
  }, []);

  // Handle row click: save to localStorage and update state
  const handleRowClick = (ecuId) => {
    setSelectedEcuId(ecuId);
    localStorage.setItem("selectedEcuId", ecuId);
    onEcuSelect(ecuId);
  };

  // Pagination functions
  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // Slicing the data to display only the current page
  const slicedData = ecus.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  if (isLoading) {
    return (
      <Paper
        sx={{
          borderRadius: "16px",
          padding: "1.5rem",
          width: "auto",
          height: "fit-content",
          boxShadow: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "590px",
        }}
      >
        <CircularProgress size={40} />
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper
        sx={{
          borderRadius: "16px",
          padding: "1.5rem",
          width: "auto",
          height: "fit-content",
          boxShadow: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "590px",
        }}
      >
        <Alert severity="error">
          Error loading ECUs: {error.message || 'Unknown error occurred'}
        </Alert>
      </Paper>
    );
  }

  // Table component
  return (
    <Paper
      sx={{
        borderRadius: "16px 0 0 16px",
        padding: "1.5rem 0 1.5rem 1.5rem",
        width: "auto",
        height: "590px",
        boxShadow: "none",
      }}
    >
      <Typography
        gutterBottom
        sx={{ fontSize: "18px", fontWeight: 700, fontFamily: "Inter" }}
      >
        ECU List
      </Typography>

      <TableContainer sx={{}}>
        <Table
          size="small"
          aria-label="ECU Table"
          sx={{ borderCollapse: "collapse" }}
        >
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontFamily: "Inter",
                  fontWeight: 600,
                  padding: "8px 16px 8px 0",
                }}
              >
                Name
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Inter",
                  fontWeight: 600,
                  padding: "8px 16px",
                }}
              >
                Vulnerabilities
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Inter",
                  fontWeight: 600,
                  padding: "8px 0 8px 16px",
                }}
              >
                Security Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {slicedData.map((ecu) => (
              <TableRow
                key={ecu.id}
                sx={{
                  borderBottom: "none",
                  cursor: "pointer",
                  backgroundColor:
                    selectedEcuId == ecu.id
                      ? "#f2f7fb" 
                      : "inherit",
                }}
                className="hover:bg-[#f2f7fb] transition duration-200"
                onClick={() => handleRowClick(ecu.id)}
              >
                <TableCell sx={{ padding: "8px 16px 10px 0" }}>
                  {ecu.name}
                </TableCell>
                <TableCell sx={{ padding: "8px 16px", textAlign: "center" }}>
                  {ecu.vulnerabilityCount}
                </TableCell>
                {/* Security Status */}
                {/* Styling the security status based on the severity */}
                <TableCell
                  sx={{ padding: "8px 0 10px 16px", textAlign: "center" }}
                >
                  <div
                    className={`inline-block px-3 py-1 text-sm rounded-full
                    ${ecu.securityStatus.toLowerCase() === "low"
                        ? "bg-[#E4F9E6]"
                        : ecu.securityStatus.toLowerCase() === "medium"
                          ? "bg-[#FFE7AE]"
                          : ecu.securityStatus.toLowerCase() === "high"
                            ? "bg-[#FED9D2]"
                            : ""
                      }`}
                  >
                    {ecu.securityStatus}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/*  Pagination component */}
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={ecus.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ECUTable;
