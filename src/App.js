import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import CreateNewPassword from "./pages/auth/CreateNewPassword";
import VerifyOTP from "./pages/auth/VerifyOTP";
import ProviderManagement from './pages/ProviderManagement'

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/create-new-password" element={<CreateNewPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/provider-management" element={<ProviderManagement />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
