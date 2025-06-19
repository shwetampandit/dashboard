/**
 * CVETable Component
 * Displays a table of CVEs (Common Vulnerabilities and Exposures) with their details
 * Shows CVE ID, description, and severity level with color-coded indicators
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
  CircularProgress,
  Alert,
} from "@mui/material";

// Severity color mapping for consistent styling
const SEVERITY_COLORS = {
  low: "bg-[#E4F9E6]",
  medium: "bg-[#FFE7AE]",
  high: "bg-[#FED9D2]",
};

const CVETable = ({ cves, isLoading, error }) => {
  if (isLoading) {
    return (
      <Paper
        sx={{
          borderRadius: "0 0 16px 0",
          padding: "0 1.5rem 1.5rem 0",
          width: "auto",
          height: "fit-content",
          boxShadow: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "220px",
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
          borderRadius: "0 0 16px 0",
          padding: "0 1.5rem 1.5rem 0",
          width: "auto",
          height: "fit-content",
          boxShadow: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "220px",
        }}
      >
        <Alert severity="error">
          Error loading CVEs: {error.message || 'Unknown error occurred'}
        </Alert>
      </Paper>
    );
  }

  return (
    <Paper
      sx={{
        borderRadius: "0 0 16px 0",
        padding: "1.5rem 1.5rem 5rem 0",
        width: "auto",
        height: "220px",
        boxShadow: "none",
      }}
    >
      <TableContainer sx={{ padding: "10px",borderRadius: "16px", backgroundColor: "#f2f7fb"}}>
        <Table
          size="small"
          aria-label="CVE Table"
          sx={{ borderCollapse: "collapse" }}
        >
          <TableHead>
            <TableRow>
              <TableCell
                colSpan={2}
                sx={{
                  fontSize: "18px",
                  fontWeight: 700,
                  fontFamily: "Inter",
                  padding: "8px 16px 16px 0"
                }}
              >
                Recently Detected CVEs
              </TableCell>
              <TableCell
                sx={{
                  fontFamily: "Inter",
                  fontWeight: 600,
                  padding: "8px 0 8px 16px",
                }}
              >
                Severity
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cves?.map((cve) => (
              <TableRow 
                key={cve.id} 
                sx={{ borderBottom: "none" }}
                className="hover:bg-[#f2f7fb] transition duration-200"
              >
                <TableCell 
                  sx={{ 
                    padding: "8px 16px 10px 0",
                    whiteSpace: "nowrap",
                  }}
                >
                  {cve.cveId}
                </TableCell>
                <TableCell 
                  sx={{ 
                    padding: "8px 16px",
                    textAlign: "left",
                  }}
                >
                  {cve.description}
                </TableCell>
                <TableCell
                  sx={{ 
                    padding: "8px 0 10px 16px",
                    textAlign: "center"
                  }}
                >
                  <div
                    className={`inline-block px-3 py-1 text-sm rounded-full ${
                      SEVERITY_COLORS[cve.severity.toLowerCase()] || ""
                    }`}
                  >
                    {cve.severity}
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

export default CVETable;
