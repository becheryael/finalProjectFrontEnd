import AuthPage from "./Pages/AuthPage";
import MainPage from "./Pages/MainPage";
import LandingPage from "./Pages/LandingPage";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./store/auth-context";

const App = () => {
  const authCtx = useContext(AuthContext);

  return (
    <Routes>
      {authCtx.isLoggedIn ? (
        <>
          <Route path="/main" element={<MainPage />} />
          <Route path="*" element={<Navigate to="/main" replace />} />
        </>
      ) : (
        <>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      )}
    </Routes>
  );
};

export default App;
