import UserRequests from "../../components/UserRequests/UserRequests";
import NavBar from "../../components/NavBar/NavBar";
import AuthContext from "../../store/auth-context";
import ManagerRequests from "../../components/ManagerRequests/ManagerRequests";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useContext } from "react";
// @ts-ignore
import styles from "./MainPage.module.css";

const MainPage = () => {
  const authCtx = useContext(AuthContext);
  const location = useLocation();

  return (
    <>
      <NavBar />
      <div className={styles.requests}>
        {location.pathname === "/main/my-requests" && (
          <h2>Hey {authCtx.userInfo.name}, Your Requests</h2>
        )}
        {location.pathname === "/main/manage-requests" && (
          <h2>All User Requests</h2>
        )}
        <Routes>
          <Route path="/my-requests" element={<UserRequests />} />
          {authCtx.isManager && (
            <Route path="/manage-requests" element={<ManagerRequests />} />
          )}
          <Route path="*" element={<Navigate to="/my-requests" replace />} />
        </Routes>
      </div>
    </>
  );
};

export default MainPage;
