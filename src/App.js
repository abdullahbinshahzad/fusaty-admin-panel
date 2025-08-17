import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { store } from "./store/store";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import CreateNewPassword from "./pages/auth/CreateNewPassword";
import VerifyOTP from "./pages/auth/VerifyOTP";
import UserManagement from './pages/UserManagement'
import ProviderManagement from './pages/ProviderManagement'
import OrderManagement from './pages/OrderManagement' 
import CategoryManagement from './pages/CategoryManagement'
import RatingManagement from './pages/RatingManagement'
import PaymentManagement from './pages/PaymentManagement'

// New wrapper to access Redux state
const AppContent = () => {
  const language = useSelector((state) => state.language.language);
  return (
    <div className={language === 'ar' ? 'arabic-font' : ''}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/create-new-password" element={<CreateNewPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/provider-management" element={<ProviderManagement />} />
          <Route path="/order-management" element={<OrderManagement />} />
          <Route path="/category-management" element={<CategoryManagement />} />
          <Route path="/ratings-management" element={<RatingManagement />} />
          <Route path="/payment-management" element={<PaymentManagement />} />
        </Routes>
      </Router>
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
