import { Link } from "react-router-dom";
// @ts-ignore
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <main className={styles["landing-page"]}>
      <h1>Welcome!</h1>
      <p>
        This is going to be your new favorite website for every need you will
        ever have. You can do so much right here so get exited. aaahh!! I'm
        exited about how great it will be. You can make requests like whiteining
        and blackening and hacking and you can hack the governtment and other
        institutions! have fun don't let anyone stop you. You are the best!
        whooo
      </p>
      <p>
        To start your new journey you can sign in or sign up below! you will be
        amazed at the beutifule UI UX experince! and the spelling mistakes that
        I won't fix hahahaahha
      </p>
      <Link to={"/login"} className={styles["auth-btn"]}>
        Log In / Sign Up
      </Link>
    </main>
  );
};

export default LandingPage;
