import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import { logoutUser } from "../../services/userApiServices";
import { AxiosError } from "axios";
// @ts-ignore
import styles from "./NavBar.module.css";
//@ts-ignore
import beaverAvatar from "../../assets/media/images/beaverAvatar.png";
//@ts-ignore
import deerAvatar from "../../assets/media/images/deerAvatar.png";
//@ts-ignore
import koalaAvatar from "../../assets/media/images/koalaAvatar.png";
//@ts-ignore
import raccoonAvatar from "../../assets/media/images/raccoonAvatar.png";

const NavBar = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const avatar = authCtx.userInfo.avatar;

  const profileHandler = () => {
    navigate("/profile");
  };

  const logoutHandler = async () => {
    try {
      const res = logoutUser(authCtx.token!);
      console.log(res);
      authCtx.logout();
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
      const errorMessage = axiosError.response?.data as string;
      alert(errorMessage);
    }
  };

  return (
    <nav className={styles["nav-bar"]}>
      {avatar === "koala" && (
        <img
          src={koalaAvatar}
          className={styles["profile-picture"]}
          onClick={profileHandler}
        />
      )}
      {avatar === "deer" && (
        <img
          src={deerAvatar}
          className={styles["profile-picture"]}
          onClick={profileHandler}
        />
      )}
      {avatar === "beaver" && (
        <img
          src={beaverAvatar}
          className={styles["profile-picture"]}
          onClick={profileHandler}
        />
      )}
      {avatar === "raccoon" && (
        <img
          src={raccoonAvatar}
          className={styles["profile-picture"]}
          onClick={profileHandler}
        />
      )}
      <button onClick={logoutHandler}>Sign out</button>
    </nav>
  );
};

export default NavBar;
