import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
// @ts-ignore
import styles from "./NavBar.module.css";
// @ts-ignore
import profileImg from '../../assets/media/images/profile.png'

const NavBar = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const logoutHandler = () => {
    authCtx.logout();
    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 0);
  };

  return (
    <nav className={styles["nav-bar"]}>
      <img src={profileImg} className={styles["profile-picture"]}></img>
      <h1>main page haha</h1>
      <button onClick={logoutHandler}>Sign out</button>
    </nav>
  );
};

export default NavBar;
