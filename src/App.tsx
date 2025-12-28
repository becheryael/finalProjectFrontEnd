import AuthPage from "./Pages/AuthPage";
import MainPage from "./Pages/MainPage";
import "./App.css";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./store/auth-context";

const App = () => {
  const authCtx = useContext(AuthContext);

  return (
    <Routes>
      {authCtx.isLoggedIn ? (
        <>
          <Route path="/" element={<MainPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<AuthPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      )}
    </Routes>
  );
};

export default App;
