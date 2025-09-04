import { useEffect, useState } from "react";
import { getPackages } from "./api/packageService";
import type { Package } from "./types/package";

function App() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPackages()
      .then(setPackages)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>📦 Package Tracking</h1>
      <ul>
        {packages.map((p) => (
          <li key={p.id}>
            <strong>{p.trackingNumber}</strong> — {p.status} (from {p.senderName} to {p.recipientName})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
