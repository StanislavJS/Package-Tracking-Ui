export type PackageStatus = "Created" | "Sent" | "Accepted" | "Returned" | "Canceled";

export interface StatusHistory {
  id: number;
  status: PackageStatus;
  changedAt: string;
}

export interface Package {
  id: number;
  trackingNumber: string;
  senderName: string;
  senderAddress: string;
  senderPhone: string;
  recipientName: string;
  recipientAddress: string;
  recipientPhone: string;
  status: PackageStatus;
  createdAt: string;
  history: StatusHistory[];
}
