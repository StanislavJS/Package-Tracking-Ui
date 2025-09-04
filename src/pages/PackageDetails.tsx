import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getPackage,
  getAllowedStatuses,
  updateStatus,
} from "../api/packageService";
import type { Package, PackageStatus } from "../types/package";

export default function PackageDetails() {
  const { id } = useParams<{ id: string }>();
  const [pkg, setPkg] = useState<Package | null>(null);
  const [allowedStatuses, setAllowedStatuses] = useState<PackageStatus[]>([]);
  const [loading, setLoading] = useState(true);

  // Загружаем посылку + доступные статусы
  const loadData = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const packageData = await getPackage(Number(id));
      setPkg(packageData);
      const statuses = await getAllowedStatuses(Number(id));
      setAllowedStatuses(statuses);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  // Смена статуса
  const handleStatusChange = async (newStatus: PackageStatus) => {
    if (!pkg) return;

    const confirmChange = window.confirm(
      `Change status from "${pkg.status}" to "${newStatus}"?`
    );
    if (!confirmChange) return;

    try {
      await updateStatus(pkg.id, newStatus);
      await loadData(); // перезагрузить данные после обновления
    } catch (err) {
      alert("Failed to update status");
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!pkg) return <p>Package not found</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>📦 Package {pkg.trackingNumber}</h1>

      <p>
        <strong>Status:</strong> {pkg.status}
      </p>
      <p>
        <strong>Sender:</strong> {pkg.senderName} ({pkg.senderAddress},{" "}
        {pkg.senderPhone})
      </p>
      <p>
        <strong>Recipient:</strong> {pkg.recipientName} ({pkg.recipientAddress},{" "}
        {pkg.recipientPhone})
      </p>

      {/* Кнопки смены статуса */}
      {allowedStatuses.length > 0 ? (
        <div style={{ margin: "20px 0" }}>
          <h3>Change Status</h3>
          {allowedStatuses.map((status) => (
            <button
              key={status}
              onClick={() => handleStatusChange(status)}
              style={{
                marginRight: "10px",
                padding: "6px 12px",
                cursor: "pointer",
              }}
            >
              {status}
            </button>
          ))}
        </div>
      ) : (
        <p>No further status changes allowed.</p>
      )}

      {/* История статусов */}
      <h3>Status History</h3>
      <ul>
        {pkg.history
          .slice()
          .reverse()
          .map((h) => (
            <li key={h.id}>
              <strong>{h.status}</strong> —{" "}
              {new Date(h.changedAt).toLocaleString()}
            </li>
          ))}
      </ul>

      <Link to="/">⬅ Back to list</Link>
    </div>
  );
}
