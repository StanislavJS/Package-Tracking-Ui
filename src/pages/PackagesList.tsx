import { useEffect, useState } from "react";
import { getPackages } from "../api/packageService";
import type { Package, PackageStatus } from "../types/package";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Chip,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
} from "@mui/material";

export default function PackagesList() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<PackageStatus | "All">("All");

  useEffect(() => {
    getPackages().then(setPackages);
  }, []);

  // Фильтрация
  const filteredPackages = packages.filter((p) => {
    const matchesSearch = p.trackingNumber
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "All" ? true : p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Цвета для Chip (как в PackageDetails)
  const getStatusColor = (
    status: PackageStatus
  ): "default" | "primary" | "success" | "error" | "warning" | "info" => {
    switch (status) {
      case "Created":
        return "primary";
      case "Sent":
        return "info";
      case "Accepted":
        return "success";
      case "Returned":
        return "warning";
      case "Canceled":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        📦 Packages
      </Typography>

      {/* Панель фильтров */}
      <Box sx={{ display: "flex", gap: 2, marginBottom: 3 }}>
        <TextField
          label="Search by tracking number"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as PackageStatus | "All")
          }
          displayEmpty
        >
          <MenuItem value="All">All statuses</MenuItem>
          <MenuItem value="Created">Created</MenuItem>
          <MenuItem value="Sent">Sent</MenuItem>
          <MenuItem value="Accepted">Accepted</MenuItem>
          <MenuItem value="Returned">Returned</MenuItem>
          <MenuItem value="Canceled">Canceled</MenuItem>
        </Select>

        <Button
          component={Link}
          to="/create"
          variant="contained"
          color="primary"
        >
          ➕ Create Package
        </Button>
      </Box>

      {/* Таблица */}
      {filteredPackages.length === 0 ? (
        <Typography>No packages found.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tracking #</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Sender</TableCell>
                <TableCell>Recipient</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPackages.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>{p.trackingNumber}</TableCell>
                  <TableCell>
                    <Chip label={p.status} color={getStatusColor(p.status)} />
                  </TableCell>
                  <TableCell>{p.senderName}</TableCell>
                  <TableCell>{p.recipientName}</TableCell>
                  <TableCell>
                    {new Date(p.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      component={Link}
                      to={`/packages/${p.id}`}
                      variant="outlined"
                      size="small"
                    >
                      🔍 View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
