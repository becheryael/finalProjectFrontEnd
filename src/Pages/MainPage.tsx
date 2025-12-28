import { useContext } from "react";
import AuthContext from "../store/auth-context";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const logoutHandler = () => {
    authCtx.logout();
    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 0);
  };

  return (
    <>
      <h1>main page haha</h1>
      <button onClick={logoutHandler}>Sign out</button>
    </>
  );
};

export default MainPage;
