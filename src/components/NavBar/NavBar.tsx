import AuthContext from "../../store/auth-context";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { logoutUser } from "../../services/userApiServices";
import { AxiosError } from "axios";
// @ts-ignore
import styles from "./NavBar.module.css";
//@ts-ignore
import beaverAvatar from "../../assets/media/images/beaver-avatar.png";
//@ts-ignore
import deerAvatar from "../../assets/media/images/deer-avatar.png";
//@ts-ignore
import koalaAvatar from "../../assets/media/images/koala-avatar.png";
//@ts-ignore
import raccoonAvatar from "../../assets/media/images/raccoon-avatar.png";

const AVATARS: Record<string, string> = {
  koala: koalaAvatar,
  deer: deerAvatar,
  beaver: beaverAvatar,
  raccoon: raccoonAvatar,
};

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const authCtx = useContext(AuthContext);
  const avatar = authCtx.userInfo.avatar;

  const profileHandler = () => {
    navigate("/profile");
  };

  const managerPageHandler = () => {
    navigate("/main/manage-requests");
  };

  const userPageHandler = () => {
    navigate("/main/my-requests");
  };

  const logoutHandler = async () => {
    try {
      logoutUser(authCtx.token!);
      authCtx.logout();
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage = axiosError.response?.data as string;
      alert(errorMessage);
    }
  };

  const managarPageBtn =
    location.pathname === "/main/manage-requests"
      ? `${styles["current-page"]} ${styles["nav-bar-button"]}`
      : `${styles["nav-bar-button"]}`;

  const myPageBtn =
    location.pathname === "/main/my-requests"
      ? `${styles["current-page"]} ${styles["nav-bar-button"]}`
      : `${styles["nav-bar-button"]}`;

  return (
    <nav className={styles["nav-bar"]}>
      <div className={styles["start-container"]}>
        <img
          src={AVATARS[avatar!]}
          alt={avatar!}
          className={styles["profile-picture"]}
          onClick={profileHandler}
        />
        <div className={styles["btns-container"]}>
          {authCtx.isManager && (
            <button className={managarPageBtn} onClick={managerPageHandler}>
              Control Requests
            </button>
          )}
          {authCtx.isManager && (
            <button className={myPageBtn} onClick={userPageHandler}>
              See my Requests
            </button>
          )}
        </div>
      </div>
      <button className={styles["nav-bar-button"]} onClick={logoutHandler}>
        Sign out
      </button>
    </nav>
  );
};

export default NavBar;
