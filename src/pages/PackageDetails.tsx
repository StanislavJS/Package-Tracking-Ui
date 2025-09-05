import { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getPackage,
  getAllowedStatuses,
  updateStatus,
} from "../api/packageService";
import type { Package, PackageStatus } from "../types/package";
import toast from "react-hot-toast";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Chip,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";

export default function PackageDetails() {
  const { id } = useParams<{ id: string }>();
  const [pkg, setPkg] = useState<Package | null>(null);
  const [allowedStatuses, setAllowedStatuses] = useState<PackageStatus[]>([]);
  const [loading, setLoading] = useState(true);

  // Для модалки
  const [openDialog, setOpenDialog] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<PackageStatus | null>(null);

  const loadData = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const packageData = await getPackage(Number(id));
      setPkg(packageData);
      const statuses = await getAllowedStatuses(Number(id));
      setAllowedStatuses(statuses);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load package");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadData();
  }, [id, loadData]);

  const confirmStatusChange = (newStatus: PackageStatus) => {
    setPendingStatus(newStatus);
    setOpenDialog(true);
  };

  const handleConfirm = async () => {
    if (!pkg || !pendingStatus) return;
    try {
      await updateStatus(pkg.id, pendingStatus);
      toast.success(`Status changed to ${pendingStatus}`);
      await loadData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    } finally {
      setOpenDialog(false);
      setPendingStatus(null);
    }
  };

  const handleCancel = () => {
    setOpenDialog(false);
    setPendingStatus(null);
  };

  // Цвета для Chip и TimelineDot (только допустимые MUI значения)
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

  if (loading) return <p>Loading...</p>;
  if (!pkg) return <p>Package not found</p>;

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        📦 Package {pkg.trackingNumber}
      </Typography>

      <Paper sx={{ padding: 2, marginBottom: 3 }}>
        <Typography
          component="div"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <strong>Status:</strong>
          <Chip label={pkg.status} color={getStatusColor(pkg.status)} />
        </Typography>
        <Typography>
          <strong>Sender:</strong> {pkg.senderName} ({pkg.senderAddress},{" "}
          {pkg.senderPhone})
        </Typography>
        <Typography>
          <strong>Recipient:</strong> {pkg.recipientName} ({pkg.recipientAddress},{" "}
          {pkg.recipientPhone})
        </Typography>
      </Paper>

      {/* Кнопки смены статуса */}
      {allowedStatuses.length > 0 ? (
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h6">Change Status</Typography>
          {allowedStatuses.map((status) => (
            <Button
              key={status}
              variant="contained"
              color="primary"
              onClick={() => confirmStatusChange(status)}
              sx={{ marginRight: 1, marginTop: 1 }}
            >
              {status}
            </Button>
          ))}
        </Box>
      ) : (
        <Typography>No further status changes allowed.</Typography>
      )}

      {/* Timeline истории */}
      <Typography variant="h6" gutterBottom>
        Status History
      </Typography>
      <Timeline position="right">
        {pkg.history
          .slice()
          .reverse()
          .map((h, index) => (
            <TimelineItem key={h.id}>
              <TimelineSeparator>
                <TimelineDot color={getStatusColor(h.status)} />
                {index !== pkg.history.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="body1">
                  <strong>{h.status}</strong>
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(h.changedAt).toLocaleString()}
                </Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
      </Timeline>

      <Button component={Link} to="/" sx={{ marginTop: 2 }}>
        ⬅ Back to list
      </Button>

      {/* Модальное окно подтверждения */}
      <Dialog open={openDialog} onClose={handleCancel}>
        <DialogTitle>Confirm Status Change</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to change the status to{" "}
            <strong>{pendingStatus}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
