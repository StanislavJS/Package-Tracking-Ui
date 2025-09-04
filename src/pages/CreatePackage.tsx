import { useState } from "react";
import { createPackage } from "../api/packageService";
import { useNavigate } from "react-router-dom";

export default function CreatePackage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    senderName: "",
    senderAddress: "",
    senderPhone: "",
    recipientName: "",
    recipientAddress: "",
    recipientPhone: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPackage(form);
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>➕ Create Package</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(form).map((key) => (
          <div key={key}>
            <input
              type="text"
              name={key}
              placeholder={key}
              value={(form as never)[key]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
