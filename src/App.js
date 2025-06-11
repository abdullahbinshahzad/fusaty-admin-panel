import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import CreateNewPassword from "./pages/auth/CreateNewPassword";
import VerifyOTP from "./pages/auth/VerifyOTP";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/create-new-password" element={<CreateNewPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
      </Routes>
    </Router>
  );
};

export default App;
