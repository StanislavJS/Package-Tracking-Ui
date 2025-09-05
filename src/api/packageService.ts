import axios from "axios";
import type { Package, PackageStatus } from "../types/package";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5259";

export const getPackages = async (): Promise<Package[]> => {
  const res = await axios.get<Package[]>(`${API_BASE_URL}/api/packages`);
  return res.data;
};

export const getPackage = async (id: number): Promise<Package> => {
  const res = await axios.get<Package>(`${API_BASE_URL}/api/packages/${id}`);
  return res.data;
};

export const createPackage = async (
  pkg: Omit<
    Package,
    "id" | "trackingNumber" | "status" | "createdAt" | "history"
  >
): Promise<Package> => {
  const res = await axios.post<Package>(`${API_BASE_URL}/api/packages`, pkg);
  return res.data;
};

export const getAllowedStatuses = async (id: number): Promise<PackageStatus[]> => {
  const res = await axios.get<PackageStatus[]>(
    `${API_BASE_URL}/api/packages/${id}/allowed-statuses`
  );
  return res.data;
};

export const updateStatus = async (
  id: number,
  status: PackageStatus
): Promise<Package> => {
  const res = await axios.put<Package>(
    `${API_BASE_URL}/api/packages/${id}/status`,
    { status }
  );
  return res.data;
};
