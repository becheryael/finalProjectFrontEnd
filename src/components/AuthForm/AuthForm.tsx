import useInput from "../../hooks/use-input";
import React, { useState } from "react";
import validator from "validator";
// @ts-ignore
import styles from "./AuthForm.module.css";
// @ts-ignore
import openEyeImage from "../../assets/media/images/open-eye.png";
// @ts-ignore
import closedEyeImage from "../../assets/media/images/closed-eye.png";

interface signInProps {
  isNewUser: boolean;
  email: undefined | string;
  password: undefined | string;
  name: string;
  handlePageChange: () => void;
  handleSubmit: () => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setName: (value: string) => void;
  error: null | string;
  isLoading: boolean;
}

const SignIn = (props: signInProps) => {
  const {
    isNewUser,
    email,
    password,
    handlePageChange,
    setEmail,
    setPassword,
    handleSubmit,
    error,
    isLoading,
    name,
    setName,
  } = props;
  let header: string;
  let buttonText: string;
  let footerText: string;
  let footerBtnText: string;
  let passwordError: string;
  const minPasswordLength = 7;
  const [isShowPassword, setIsShowPassword] = useState(false);

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => validator.isEmail(value));

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => {
    if (
      (value !== "" && !isNewUser) ||
      (value.length >= minPasswordLength && isNewUser)
    ) {
      return true;
    } else {
      return false;
    }
  });

  if (isNewUser) {
    header = "Welcome to BAM headquarters!";
    buttonText = "Sign Up";
    footerText = "Already have an account? Sign in here.";
    footerBtnText = "Sign in!";
    passwordError = `Password must contain at least ${minPasswordLength} characters`;
  } else {
    header = "Welcome back to BAM headquarters";
    buttonText = "Sign In";
    footerText = "Don't have an account? Sign up now!";
    footerBtnText = "Create account";
    passwordError = "Please enter your password";
  }

  let formIsValid =
    enteredEmailIsValid && enteredPasswordIsValid && (enteredNameIsValid || !isNewUser);

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    emailChangeHandler(event);
  };

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    emailChangeHandler(event);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    passwordChangeHandler(event);
  };

  const UIChange = () => {
    handlePageChange();
    resetEmailInput();
    resetNameInput();
    resetPasswordInput();
  };

  const emailInputClasses = emailInputHasError
    ? `${styles["input"]} ${styles["invalid-input"]}`
    : styles["input"];

  const passwordInputClasses = passwordInputHasError
    ? `${styles["input"]} ${styles["invalid-input"]} ${styles["password"]}`
    : styles["input"];

  const mainBtnClasses = !formIsValid
    ? styles["disabled-main-button"]
    : styles["main-button"];

  const nameInputClasses = nameInputHasError
    ? `${styles["input"]} ${styles["invalid-input"]}`
    : styles["input"];

  const toggelShowPassword = () => {
    setIsShowPassword((prevIsShow) => !prevIsShow);
  };

  return (
    <div className={styles.container}>
      <div className={styles["auth-top"]}>
        <h1 className={styles.header}>{header}</h1>
        <div className={styles.credentials}>
          {isNewUser && (
            <>
              <label>Name</label>
              <input
                className={nameInputClasses}
                type="text"
                onChange={(event) => handleName(event)}
                onBlur={nameBlurHandler}
                value={name}
              />
              {nameInputHasError && (
                <p className={styles["error-text"]}>
                  Please enter your name.
                </p>
              )}
            </>
          )}
          <label>Email</label>
          <input
            className={emailInputClasses}
            type="email"
            onChange={(event) => handleEmail(event)}
            onBlur={emailBlurHandler}
            value={email}
          />
          {emailInputHasError && (
            <p className={styles["error-text"]}>Please enter a valid email.</p>
          )}
          <div className={styles["password-container"]}>
            <label>Password</label>
            <img
              src={isShowPassword ? openEyeImage : closedEyeImage}
              alt="open eye"
              onClick={toggelShowPassword}
              className={styles["eye-image"]}
            />
          </div>
          <input
            className={passwordInputClasses}
            type={isShowPassword ? "text" : "password"}
            onChange={(event) => handlePassword(event)}
            onBlur={passwordBlurHandler}
            value={password}
          />
          {passwordInputHasError && (
            <p className={styles["error-text"]}>{passwordError}</p>
          )}
          {!isLoading && (
            <button
              onClick={handleSubmit}
              disabled={!formIsValid}
              className={mainBtnClasses}
            >
              {buttonText}
            </button>
          )}
          {isLoading && <p>loading...</p>}
        </div>
      </div>
      <div className={styles.footer}>
        <h3>{footerText}</h3>
        <button onClick={UIChange}>{footerBtnText}</button>
      </div>
    </div>
  );
};

export default SignIn;
