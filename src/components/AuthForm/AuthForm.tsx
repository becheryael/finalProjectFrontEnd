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
  personalNum: string;
  handlePageChange: () => void;
  handleSubmit: () => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setName: (value: string) => void;
  setError: (value: string) => void;
  setPersonalNum: (value: string) => void;
  error: null | string;
  isLoading: boolean;
}

const AuthForm = (props: signInProps) => {
  const {
    isNewUser,
    email,
    password,
    personalNum,
    handlePageChange,
    setEmail,
    setPassword,
    setName,
    setPersonalNum,
    setError,
    handleSubmit,
    error,
    isLoading,
    name,
  } = props;
  let buttonText: string;
  let passwordError: string;
  let footerText: string;
  let footerBtnText: string;
  const minPasswordLength = 7;
  const personalNumLength = 7;
  const [isShowPassword, setIsShowPassword] = useState(false);

  const {
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value !== "");

  const {
    isValid: enteredPersonalNumIsValid,
    hasError: personalNumInputHasError,
    valueChangeHandler: personalNumChangeHandler,
    inputBlurHandler: personalNumBlurHandler,
    reset: resetPersonalNumInput,
  } = useInput((value) => value.length === personalNumLength);

  const {
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => validator.isEmail(value));

  const {
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
    buttonText = "Sign Up";
    passwordError = `Password must contain at least ${minPasswordLength} characters`;
    footerText = "Already have an account? Sign in here.";
    footerBtnText = "Sign in!";
  } else {
    buttonText = "Sign In";
    passwordError = "Please enter your password";
    footerText = "Don't have an account? Sign up now!";
    footerBtnText = "Create account";
  }

  let formIsValid =
    enteredEmailIsValid &&
    enteredPasswordIsValid &&
    (enteredNameIsValid || !isNewUser) &&
    (enteredPersonalNumIsValid || !isNewUser);

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    nameChangeHandler(event);
  };

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    emailChangeHandler(event);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    passwordChangeHandler(event);
  };

  const handlePersonalNum = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalNum(event.target.value);
    personalNumChangeHandler(event);
  };

  const UIChange = () => {
    handlePageChange();
    resetEmailInput();
    resetNameInput();
    resetPasswordInput();
    resetPersonalNumInput();
    resetPersonalNumInput();
    setError('')
  };

  const emailInputClasses = emailInputHasError
    ? `${styles["input"]} ${styles["invalid-input"]}`
    : styles["input"];

  const passwordInputClasses = passwordInputHasError
    ? `${styles["input"]} ${styles["invalid-input"]}`
    : styles["input"];

  const mainBtnClasses = !formIsValid
    ? `${styles["main-button"]} ${styles["disabled-main-button"]}`
    : styles["main-button"];

  const nameInputClasses = nameInputHasError
    ? `${styles["input"]} ${styles["invalid-input"]}`
    : styles["input"];

  const personalNumInputClasses = personalNumInputHasError
    ? `${styles["input"]} ${styles["invalid-input"]}`
    : styles["input"];

  const credentialsClasses = isNewUser
    ? styles.credentials
    : `${styles["credentials"]} ${styles["credentials-sign-in"]}`;

  const toggelShowPassword = () => {
    setIsShowPassword((prevIsShow) => !prevIsShow);
  };

  return (
    <div className={styles.container}>
      <div className={credentialsClasses}>
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
              <p className={styles["error-text"]}>Please enter your name.</p>
            )}
            <label>Personal Number</label>
            <input
              className={personalNumInputClasses}
              type="text"
              onChange={(event) => handlePersonalNum(event)}
              onBlur={personalNumBlurHandler}
              value={personalNum}
            />
            {personalNumInputHasError && (
              <p className={styles["error-text"]}>
                Your personal number must have exactly {personalNumLength}{" "}
                digits.
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
        {error && <p className={styles.error}>{error}</p>}
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
      <div className={styles.footer}>
        <h3>{footerText}</h3>
        <button onClick={UIChange}>{footerBtnText}</button>
      </div>
    </div>
  );
};

export default AuthForm;
