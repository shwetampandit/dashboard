/**
 * ComponentTable Component
 * Displays a table of components with their details including name, version, risk score, and mitigation status
 * Uses Material-UI components for consistent styling
 */
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  LinearProgress,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";

// Mitigation status color mapping for consistent styling
const STATUS_COLORS = {
  "mitigated": "bg-[#E4F9E6]",
  "in progress": "bg-[#FFE7AE]",
  "open": "bg-[#FED9D2]",
};

// Risk score color mapping 
const getRiskScoreColor = (score) => {
  if (score <= 33) return "#4CAF50"; 
  if (score <= 66) return "#FE9C27"; 
  return "#2AA666"; 
};

const ComponentTable = ({ components, isLoading, error }) => {
  // Table header configuration
  const tableHeaders = [
    { label: "Name", align: "left" },
    { label: "Version", align: "center" },
    { label: "Risk Score", align: "center" },
    { label: "Mitigation Status", align: "center" },
  ];

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
          minHeight: "200px",
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
          minHeight: "200px",
        }}
      >
        <Alert severity="error">
          Error loading components: {error.message || 'Unknown error occurred'}
        </Alert>
      </Paper>
    );
  }

  return (
    <Paper
      sx={{
        borderRadius: "16px",
        padding: "1.5rem",
        width: "auto",
        height: "fit-content",
        boxShadow: "none",
      }}
    >
      <Typography
        gutterBottom
        sx={{ fontSize: "18px", fontWeight: 700, fontFamily: "Inter" }}
      >
        Components
      </Typography>

      <TableContainer>
        <Table
          size="small"
          aria-label="Components Table"
          sx={{ borderCollapse: "collapse" }}
        >
          <TableHead>
            <TableRow>
              {tableHeaders.map((header, index) => (
                <TableCell
                  key={header.label}
                  sx={{
                    fontFamily: "Inter",
                    fontWeight: 600,
                    padding: index === 0 
                      ? "8px 16px 8px 0"
                      : index === tableHeaders.length - 1
                      ? "8px 0 8px 16px"
                      : "8px 16px",
                    textAlign: header.align,
                    whiteSpace: "nowrap",
                  }}
                >
                  {header.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {components?.map((component) => (
              <TableRow key={component.id} sx={{ borderBottom: "none" }}>
                <TableCell sx={{ padding: "8px 16px 10px 0" }}>
                  {component.name}
                </TableCell>
                <TableCell sx={{ padding: "8px 16px", textAlign: "center" }}>
                  {component.version}
                </TableCell>
                {/* Risk Score */}
                {/* Styling the risk score based progress bar on the score */}
                <TableCell sx={{ padding: "8px 16px", textAlign: "center", width: "200px" }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: '100%', mr: 1 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={component.riskScore} 
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: '#E0E0E0',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: getRiskScoreColor(component.riskScore),
                          },
                        }}
                      />
                    </Box>
                    <Box sx={{ minWidth: 20 }}>
                      <Typography variant="body2" >
                        {`${component.riskScore}`}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                {/* Mitigation Status */}
                {/* Styling the mitigation status based on the status */}
                <TableCell sx={{ padding: "8px 0 10px 16px", textAlign: "center" }}>
                  <div
                    className={`inline-block px-3 py-1 text-sm rounded-full ${
                      STATUS_COLORS[component.mitigationStatus.toLowerCase()] || ""
                    }`}
                  >
                    {component.mitigationStatus}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ComponentTable;
