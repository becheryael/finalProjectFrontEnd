import AuthPage from "./Pages/AuthPage/AuthPage";
import MainPage from "./Pages/MainPage/MainPage";
import LandingPage from "./Pages/LandingPage/LandingPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage/ResetPasswordPage";
import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./store/auth-context";

const App = () => {
  const authCtx = useContext(AuthContext);

  return (
    <Routes>
      {authCtx.isLoggedIn ? (
        <>
          <Route path="/main/*" element={<MainPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="*"
            element={<Navigate to="/main/my-requests" replace />}
          />
        </>
      ) : (
        <>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordPage />}
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      )}
    </Routes>
  );
};

export default App;
