import { Routes, Route } from "react-router-dom";
import PackagesList from "./pages/PackagesList";
import PackageDetails from "./pages/PackageDetails";
import CreatePackage from "./pages/CreatePackage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PackagesList />} />
      <Route path="/packages/:id" element={<PackageDetails />} />
      <Route path="/create" element={<CreatePackage />} />
    </Routes>
  );
}

export default App;
