import Requests from "../../components/Requests/Requests";
import NavBar from "../../components/NavBar/NavBar";
// @ts-ignore
import styles from "./MainPage.module.css";

const MainPage = () => {
  return (
    <>
      <NavBar />
      <div className={styles.requests}>
        <h2>Your Requests</h2>
        <Requests />
      </div>
    </>
  );
};

export default MainPage;
