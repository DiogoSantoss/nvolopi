import { Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Auth from "./components/Auth";
import Login from "./pages/Login";
import Upload from "./pages/Upload";
import Download from "./pages/Download";

const App = () => {
  return (
    <>
      <Navbar />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="70vh"
      >
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          {/* Private routes */}
          <Route element={<Auth />}>
            <Route path="/upload" element={<Upload />} />
            <Route path="/download" element={<Download />} />
          </Route>
          {/* Catch all routes */}
          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      </Box>
      <Footer />
    </>
  );
};

export default App;
