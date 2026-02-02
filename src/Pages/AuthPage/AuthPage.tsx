import AuthContext from "../../store/auth-context";
import AuthForm from "../../components/AuthForm/AuthForm";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, createUser } from "../../services/userApiServices";
import { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { StatusCodes } from "http-status-codes";
// @ts-ignore
import styles from "./AuthPage.module.css";

const TO_MILLISECONDS = 1000;

const AuthPage = () => {
  const navigate = useNavigate();
  let header: string;

  const [isNewUser, setIsNewUser] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [personalNum, setPersonalNum] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  const handlePageChange = () => {
    setIsNewUser((prevIsNewUser) => !prevIsNewUser);
    setEmail("");
    setPassword("");
    setName("");
    setPersonalNum("");
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError("");
    try {
      let res;
      if (!isNewUser) {
        res = await loginUser(email, password);
      } else {
        res = await createUser(email, password, personalNum, name);
      }
      if (res.status === StatusCodes.CREATED || res.status === StatusCodes.OK) {
        const decodedToken = jwtDecode(res.data.token);
        const tokenExpiration = decodedToken.exp;
        const expirationTime = new Date(tokenExpiration! * TO_MILLISECONDS);
        authCtx.login(
          res.data.token,
          res.data.user,
          res.data.user._id,
          res.data.user.manager,
          expirationTime.toISOString()
        );
        navigate("/main", { replace: true });
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage = axiosError.response?.data as string;
      if (errorMessage) {
        if (errorMessage.includes("ENOTFOUND")) {
          setError("Unable to connect. Check your internet.");
        } else {
          setError(errorMessage);
        }
      } else if (isNewUser) {
        setError(
          "Unable to create account. Make sure all your information is correct and try again."
        );
      } else {
        setError("Unable to login. Try again or create an account.");
      }
    }
    setIsLoading(false);
  };

  if (isNewUser) {
    header = "Welcome to BAM HQ!";
  } else {
    header = "Welcome back to BAM HQ!";
  }

  return (
    <main
      className={isNewUser ? styles["main-sign-up"] : styles["main-sign-in"]}
    >
      <h1 className={styles.header}>{header}</h1>
      <AuthForm
        isNewUser={isNewUser}
        email={email}
        password={password}
        name={name}
        personalNum={personalNum}
        handlePageChange={handlePageChange}
        setEmail={setEmail}
        setPassword={setPassword}
        setPersonalNum={setPersonalNum}
        setName={setName}
        setError={setError}
        handleSubmit={handleSubmit}
        error={error}
        isLoading={isLoading}
      />
    </main>
  );
};

export default AuthPage;
