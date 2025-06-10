import React from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import CreateNewPassword from "./pages/auth/CreateNewPassword";
import VerifyOTP from "./pages/auth/VerifyOTP";

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={Login} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/create-new-password" component={CreateNewPassword} />
      <Route path="/verify-otp" component={VerifyOTP} />
    </Router>
  );
};

export default App;
