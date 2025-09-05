---
## 📂 `package-tracking-ui/README.md`

# 📦 Package Tracking UI

Frontend application for the **Package Tracking System** (test task for IDT internship).
Built with **React, TypeScript, Vite** and styled using **Material UI**.
---

## ✨ Features

- 📋 List of packages in a responsive **Material UI Table**
- 🔍 Filtering by tracking number and status
- 🟢 Color indicators for package statuses
- 📦 Package details page with:
  - Status history in **Timeline**
  - Change status with confirmation **modal dialog**
- ➕ Create package form with validation (React Hook Form + Yup)
- ✅ Toast notifications (React Hot Toast)

---

## 🛠 Tech Stack

- **React 18 + TypeScript**
- **Vite** as build tool
- **React Router v6** for navigation
- **Material UI (MUI)** for UI components
- **React Hook Form + Yup** for forms & validation
- **React Hot Toast** for notifications
- **Axios** for API requests

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/package-tracking-ui.git
cd package-tracking-ui
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

The app will be available at:
👉 `http://localhost:5173/`

---

## 🔗 API Integration

This frontend connects to the **Package Tracking API** (ASP.NET Core backend).
Make sure the backend is running locally on `http://localhost:5259` or update the API base URL in:

```
src/api/packageService.ts
```

---

## 📂 Project Structure

```
src/
 ├── api/              # API service (Axios)
 ├── pages/            # App pages (PackagesList, PackageDetails, CreatePackage)
 ├── types/            # TypeScript types
 ├── App.tsx           # Routes
 ├── main.tsx          # Entry point
```

---

## 📸 Screenshots

### Package List

![Packages List](docs/packages-list.png)

### Package Details

![Package Details](docs/package-details.png)

### Create Package Form

![Create Package](docs/create-package.png)

---

## ✅ To Do / Nice to Have

- Add animations with **Framer Motion**
- Dark mode support
- Deploy demo to Vercel

---

## 📄 License

MIT License

```

---
```
