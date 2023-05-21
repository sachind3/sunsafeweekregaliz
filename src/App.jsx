import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import DownloadPoster from "./pages/DownloadPoster";
import SelectPoster from "./pages/SelectPoster";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="select-poster" element={<SelectPoster />} />
        <Route path="download-poster" element={<DownloadPoster />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}
