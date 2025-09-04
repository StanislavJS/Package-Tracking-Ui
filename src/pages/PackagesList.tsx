import { useEffect, useState } from "react";
import { getPackages } from "../api/packageService";
import type { Package, PackageStatus } from "../types/package";
import { Link } from "react-router-dom";

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

  return (
    <div style={{ padding: "20px" }}>
      <h1>📦 Packages</h1>

      {/* Панель фильтров */}
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Search by tracking number"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as PackageStatus | "All")}
          style={{ padding: "5px" }}
        >
          <option value="All">All statuses</option>
          <option value="Created">Created</option>
          <option value="Sent">Sent</option>
          <option value="Accepted">Accepted</option>
          <option value="Returned">Returned</option>
          <option value="Canceled">Canceled</option>
        </select>

        <Link to="/create" style={{ marginLeft: "20px" }}>
          ➕ Create Package
        </Link>
      </div>

      {/* Таблица */}
      {filteredPackages.length === 0 ? (
        <p>No packages found.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>Tracking #</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Sender</th>
              <th style={thStyle}>Recipient</th>
              <th style={thStyle}>Created</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPackages.map((p) => (
              <tr key={p.id}>
                <td style={tdStyle}>{p.trackingNumber}</td>
                <td style={tdStyle}>{p.status}</td>
                <td style={tdStyle}>{p.senderName}</td>
                <td style={tdStyle}>{p.recipientName}</td>
                <td style={tdStyle}>
                  {new Date(p.createdAt).toLocaleDateString()}
                </td>
                <td style={tdStyle}>
                  <Link to={`/packages/${p.id}`}>🔍 View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const thStyle: React.CSSProperties = {
  borderBottom: "2px solid #ccc",
  padding: "8px",
};

const tdStyle: React.CSSProperties = {
  borderBottom: "1px solid #eee",
  padding: "8px",
};
