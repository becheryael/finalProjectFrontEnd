import AuthInput from "../../components/AuthInputs/AuthInput";
import validator from "validator";
import { forgotPassword } from "../../services/userApiServices";
import { useState } from "react";
import { AxiosError } from "axios";
import { StatusCodes } from "http-status-codes";
//@ts-ignore
import styles from "./ForgotPasswordPage.module.css";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const mainBtnClasses = !emailIsValid
    ? `${styles["main-button"]} ${styles["disabled-main-button"]}`
    : styles["main-button"];

  const sendResetEmail = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await forgotPassword(email);
      console.log(res);
      if (res.status === StatusCodes.OK) {
        setIsSuccess(true);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      console.log(axiosError);
      const errorMessage = axiosError.response?.data as string;
      if (errorMessage) {
        setError(errorMessage);
      }
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.page}>
      <div className={styles["header-container"]}>
        <h1 className={styles.header}>Forgot Password</h1>
        {!isSuccess && (
          <p>Enter your email and a change password link will be sent to you</p>
        )}
      </div>
      {!isSuccess ? (
        <div className={styles.container}>
          <AuthInput
            inputTitle="Email"
            inputType="email"
            inputValue={email}
            errorText="Please enter a valid email."
            setIsValid={setEmailIsValid}
            setInput={setEmail}
            checkIsValid={(value) => validator.isEmail(value)}
          />
          {isLoading && <p>Loading...</p>}
          {error && <p className={styles.error}>{error}</p>}
          <button className={mainBtnClasses} onClick={sendResetEmail}>
            Submit
          </button>
        </div>
      ) : (
        <div>
          <h2>Email sent successfully.</h2>
          <p>Check your inbox and spam folders.</p>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
