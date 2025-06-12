/**
 * Dashboard Component
 * Main dashboard view that displays overview of (ECU information, components, and CVEs)
 * Uses RTK Query for data fetching with automatic caching and revalidation
 */
import { useState } from "react";
import { useGetECUsQuery, useGetCVEsQuery, useGetComponentsByEcuIdQuery } from "../features/api/apiSlice";
import ChartDataLabels from "chartjs-plugin-datalabels";
import ECUTable from "../components/ECUTable";
import ComponentTable from "../components/ComponentTable";
import CVETable from "../components/CVETable";

import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Stack,
  CircularProgress,
} from "@mui/material";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js plugins
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const Dashboard = () => {
  // State for selected ECU
  const [selectedEcuId, setSelectedEcuId] = useState(1);

  // Data fetching hooks
  const { 
    data: ecus = [], 
    error: ecuError, 
    isLoading: isLoadingEcus 
  } = useGetECUsQuery();
  
  const { 
    data: components = [], 
    isLoading: isLoadingComponents,
    isFetching: isFetchingComponents,
    error: componentsError
  } = useGetComponentsByEcuIdQuery(selectedEcuId);
  
  const { 
    data: cve = null,
    isLoading: isLoadingCVE,
    isFetching: isFetchingCVE,
    error: cveError
  } = useGetCVEsQuery(selectedEcuId);

  // Loading state for the entire dashboard
  const isLoading = isLoadingEcus || isLoadingComponents || isLoadingCVE;

  // Calculate total vulnerabilities count
  const ecuCount = ecus?.length || 0;
  const totalVulnerabilities = ecus.reduce(
    (acc, ecu) => acc + ecu.vulnerabilityCount,
    0
  );

  // Calculate data that will be used for the pie chart (security status)
  const statusCounts = ecus.reduce((acc, ecu) => {
    acc[ecu.securityStatus] = (acc[ecu.securityStatus] || 0) + 1;
    return acc;
  }, {});

  // Pie chart configuration and styling
  const pieData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: "Security Status",
        data: Object.values(statusCounts),
        backgroundColor: ["#FDD05C", "#FF9C2F", "#E64A18"],
        borderWidth: 0,
      },
    ],
  };

  const pieOptions = {
    responsive: false,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          usePointStyle: true,
          font: { size: 12 },
          pointStyle: "circle",
          padding: 10,
          boxWidth: 8,
          boxHeight: 8,
        },
      },
    },
    datalabels: {
      color: "#ffffff",
      formatter: (value) => value,
      font: {
        weight: "bold",
        size: 14,
        color: "white",
      },
    },
  };

  // Getting selected Edu (used for fetching components and cves data)
  const handleEcuSelect = (id) => {
    setSelectedEcuId(id);
  };

  // Summary cards data
  const summaryCards = [
    { title: "Total ECUs", count: ecuCount },
    { title: "Total Components", count: components.length },
    { title: "Total Vulnerabilities", count: totalVulnerabilities },
  ];

  if (isLoading) {
    return (
      <Container
        maxWidth={false}
        sx={{
          maxWidth: "1600px",
          bgcolor: "#F4F4F5",
          padding: "24px",
          margin: "0 12rem",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={60} />
      </Container>
    );
  }

  if (ecuError) {
    return (
      <Container
        maxWidth={false}
        sx={{
          maxWidth: "1600px",
          bgcolor: "#F4F4F5",
          padding: "24px",
          margin: "0 12rem",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography color="error" variant="h6">
          Error loading dashboard data. Please try again later.
        </Typography>
      </Container>
    );
  }

  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: "1600px",
        bgcolor: "#F4F4F5",
        padding: "24px",
        margin: "0 12rem",
      }}
    >
      {/* Summary Section */}
      <Stack
        sx={{
          bgcolor: "#FEFFFE",
          borderRadius: "16px",
          padding: "1.5rem",
          width: "100%",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Inter",
            fontSize: "20px",
            fontWeight: "700",
            marginBottom: "1rem",
          }}
          align="left"
        >
          Cybersecurity Monitoring Dashboard
        </Typography>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems="center"
        >
          {/* Summary Cards */}
          {summaryCards.map((item, index) => (
            <Card
              key={index}
              sx={{
                bgcolor: "#DDECFC",
                boxShadow: 0,
                borderRadius: "10px",
                width: "220px",
                height: "100px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <CardContent sx={{ padding: "14px 18px" }}>
                <Typography
                  sx={{
                    fontSize: "24px",
                    fontWeight: 700,
                    fontFamily: "Inter",
                  }}
                  align="left"
                >
                  {item.count}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: 500,
                    fontFamily: "Inter",
                  }}
                  align="left"
                >
                  {item.title}
                </Typography>
              </CardContent>
            </Card>
          ))}

          {/* Security Status Pie Chart */}
          <Box
            sx={{
              bgcolor: "#FEFFFE",
              borderRadius: "10px",
              width: "220px",
              height: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "8px",
            }}
          >
            <Pie
              data={pieData}
              options={pieOptions}
              plugins={[ChartDataLabels]}
              width={200}
              height={200}
            />
          </Box>
        </Stack>
      </Stack>

      {/* Data Tables Section */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={3} mt={3}>
        <ECUTable 
          ecus={ecus} 
          onEcuSelect={handleEcuSelect} 
          isLoading={isLoadingEcus} 
          error={ecuError}
        />
        <Stack spacing={2} sx={{ flex: 1 }}>
          <ComponentTable 
            components={components} 
            isLoading={isLoadingComponents || isFetchingComponents}
            error={componentsError}
          />
          <CVETable 
            cves={cve ? [cve] : []} 
            isLoading={isLoadingCVE || isFetchingCVE}
            error={cveError}
          />
        </Stack>
      </Stack>
    </Container>
  );
};

export default Dashboard;
