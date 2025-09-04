import axios from "axios";
import type { Package, PackageStatus } from "../types/package";

// ⚡️ Укажи свой backend URL
const API_URL = "http://localhost:5259/api/packages";

export async function getPackages(): Promise<Package[]> {
  const { data } = await axios.get(API_URL);
  return data;
}

export async function getPackage(id: number): Promise<Package> {
  const { data } = await axios.get(`${API_URL}/${id}`);
  return data;
}

export async function createPackage(pkg: Omit<Package, "id" | "trackingNumber" | "status" | "createdAt" | "history">): Promise<Package> {
  const { data } = await axios.post(API_URL, pkg);
  return data;
}

export async function getAllowedStatuses(id: number): Promise<PackageStatus[]> {
  const { data } = await axios.get(`${API_URL}/${id}/allowed-statuses`);
  return data;
}

export async function updateStatus(id: number, newStatus: PackageStatus): Promise<Package> {
  const { data } = await axios.put(`${API_URL}/${id}/status`, { newStatus });
  return data;
}
