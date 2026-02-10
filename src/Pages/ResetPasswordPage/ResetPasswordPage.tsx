import AuthInput from "../../components/AuthInputs/AuthInput";
import AuthContext from "../../store/auth-context";
import { resetPassword } from "../../services/userApiServices";
import { useState, useContext } from "react";
import { AxiosError } from "axios";
import { useParams } from "react-router";
import { jwtDecode } from "jwt-decode";
import { StatusCodes } from "http-status-codes";
//@ts-ignore
import styles from "./ResetPasswordPage.module.css";

const MILLISECONDS_IN_SECOND = 1000;
// MICHAL: במקום ההערה פשוט תכתבי
// 2 * MILLISECONDS_IN_SECOND
const SUCCESS_TIMER = 2000; // 2 seconds
const MIN_PASSWORD_LENGTH = 7;

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [confirmPasswordIsValid, setConfirmPasswordIsValid] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);

  const { token } = useParams();

  // MICHAL: בשביל ייעול, תעטפי בuseMemo
  // MICHAL: למה זה let?
  let formIsValid = passwordIsValid && confirmPasswordIsValid;

  const mainBtnClasses = !formIsValid
    ? `${styles["main-button"]} ${styles["disabled-main-button"]}`
    : styles["main-button"];

  const handlePasswordReset = async () => {
    if (password !== confirmPassword) {
      alert("Make sure the password you entered is the same in both fields.");
      return;
    }
    if (token === undefined) {
      alert("invalid link.");
      return;
    }
    setIsLoading(true);
    setError("");

    try {
      const res = await resetPassword(token, password);
      setIsLoading(false);
      if (res.status === StatusCodes.OK) {
        const decodedToken = jwtDecode(res.data.token);
        const tokenExpiration = decodedToken.exp;
        const expirationTime = new Date(tokenExpiration! * MILLISECONDS_IN_SECOND);
        setIsSuccess(true);
        setTimeout(() => {
          authCtx.login(
            res.data.token,
            res.data.user,
            res.data.user._id,
            res.data.user.isManager,
            expirationTime.toISOString()
          );
        }, SUCCESS_TIMER);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage = axiosError.response?.data as string;
      if (errorMessage) {
        setError(errorMessage);
      } else {
        setError("Unable to reset password. Try again.");
      }
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.page}>
      <div className={styles["header-container"]}>
        <h1 className={styles.header}>Reset Password</h1>
      </div>
      <div className={styles.container}>
        <AuthInput
          inputTitle="Password"
          inputValue={password}
          errorText={`Password must contain at least ${MIN_PASSWORD_LENGTH} characters`}
          setIsValid={setPasswordIsValid}
          setInput={setPassword}
          checkIsValid={(value) => value.length >= MIN_PASSWORD_LENGTH}
          isPassword={true}
        />
        <AuthInput
          inputTitle="Confirm Password"
          inputValue={confirmPassword}
          errorText={`Password must contain at least ${MIN_PASSWORD_LENGTH} characters`}
          setIsValid={setConfirmPasswordIsValid}
          setInput={setConfirmPassword}
          checkIsValid={(value) => value.length >= MIN_PASSWORD_LENGTH}
          isPassword={true}
        />
        {isLoading && <p>Loading...</p>}
        {isSuccess && (
          <p className={styles.success}>Password changed successfully!</p>
        )}
        {error && <p className={styles.error}>{error}</p>}
        <button className={mainBtnClasses} onClick={handlePasswordReset}>
          Save
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
