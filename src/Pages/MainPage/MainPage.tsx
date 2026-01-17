import UserRequests from "../../components/UserRequests/UserRequests";
import NavBar from "../../components/NavBar/NavBar";
import AuthContext from "../../store/auth-context";
import { useContext, useState } from "react";
// @ts-ignore
import styles from "./MainPage.module.css";
import ManagerRequests from "../../components/ManagerRequests/ManagerRequests";

const MainPage = () => {
  const authCtx = useContext(AuthContext);
  const [isManagerPage, setIsManagerPage] = useState(false);
  return (
    <>
      <NavBar
        setIsManagerPage={setIsManagerPage}
        isManagerPage={isManagerPage}
      />
      <div className={styles.requests}>
        {!isManagerPage && <h2>Hey {authCtx.userInfo.name}, Your Requests</h2>}
        {isManagerPage && <h2>All User Requests</h2>}
        {!isManagerPage && <UserRequests />}
        {isManagerPage && <ManagerRequests />}
      </div>
    </>
  );
};

export default MainPage;
