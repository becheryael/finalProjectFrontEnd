import { useState, useRef } from "react";
import { Link } from "react-router";
import validator from "validator";
import AuthInput, { AuthInputHandle } from "../AuthInputs/AuthInput";
// @ts-ignore
import styles from "./AuthForm.module.css";

interface authFormProps {
  isNewUser: boolean;
  email: string;
  password: string;
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

const AuthForm = (props: authFormProps) => {
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
    name
  } = props;
  let buttonText: string;
  let passwordError: string;
  let footerText: string;
  let footerBtnText: string;
  const MIN_PASSWORD_LENGTH = 7;
  const PERSONAL_NUM_LENGTH = 7;

  const [nameIsValid, setNameIsValid] = useState(false);
  const [personalNumIsValid, setPersonalNumIsValid] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [passwordIsValid, setPasswordIsValid] = useState(false);

  const nameRef = useRef<AuthInputHandle>(null);
  const emailRef = useRef<AuthInputHandle>(null);
  const passwordRef = useRef<AuthInputHandle>(null);
  const personalNumRef = useRef<AuthInputHandle>(null);

  if (isNewUser) {
    buttonText = "Sign Up";
    passwordError = `Password must contain at least ${MIN_PASSWORD_LENGTH} characters`;
    footerText = "Already have an account? Sign in here.";
    footerBtnText = "Sign in!";
  } else {
    buttonText = "Sign In";
    passwordError = "Please enter your password";
    footerText = "Don't have an account? Sign up now!";
    footerBtnText = "Create account";
  }

  let formIsValid =
    emailIsValid &&
    passwordIsValid &&
    (nameIsValid || !isNewUser) &&
    (personalNumIsValid || !isNewUser);

  const UIChange = () => {
    handlePageChange();
    nameRef.current?.resetInput();
    emailRef.current?.resetInput();
    passwordRef.current?.resetInput();
    personalNumRef.current?.resetInput();
    setError("");
  };

  const passwordValidity = (value: string) => {
    if (
      (value !== "" && !isNewUser) ||
      (value.length >= MIN_PASSWORD_LENGTH && isNewUser)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const credentialsClasses = isNewUser
    ? styles.credentials
    : `${styles["credentials"]} ${styles["credentials-sign-in"]}`;

  const mainBtnClasses = !formIsValid
    ? `${styles["main-button"]} ${styles["disabled-main-button"]}`
    : styles["main-button"];

  return (
    <div className={styles.container}>
      <div className={credentialsClasses}>
        {isNewUser && (
          <AuthInput
            inputTitle="Name"
            inputType="text"
            inputValue={name}
            errorText="Please enter your name."
            setIsValid={setNameIsValid}
            setInput={setName}
            checkIsValid={(value) => value !== ""}
            ref={nameRef}
          />
        )}
        {isNewUser && (
          <AuthInput
            inputTitle="Personal Number"
            inputType="text"
            inputValue={personalNum}
            errorText={`Your personal number must have exactly ${PERSONAL_NUM_LENGTH} digits.`}
            setIsValid={setPersonalNumIsValid}
            setInput={setPersonalNum}
            checkIsValid={(value) => value.length === PERSONAL_NUM_LENGTH}
            ref={personalNumRef}
            isNumOnly={true}
          />
        )}
        <AuthInput
          inputTitle="Email"
          inputType="email"
          inputValue={email}
          errorText="Please enter a valid email."
          setIsValid={setEmailIsValid}
          setInput={setEmail}
          checkIsValid={(value) => validator.isEmail(value)}
          ref={emailRef}
        />
        <AuthInput
          inputTitle="Password"
          inputValue={password}
          errorText={passwordError}
          setIsValid={setPasswordIsValid}
          setInput={setPassword}
          checkIsValid={passwordValidity}
          ref={passwordRef}
          isPassword={true}
        />
        {error && <p className={styles.error}>{error}</p>}
        {!isNewUser && (
          <Link className={styles["forgot-password"]} to="/forgot-password">
            Forgot Password?
          </Link>
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
        {isLoading && <p>Loading...</p>}
      </div>
      <div className={styles.footer}>
        <h3>{footerText}</h3>
        <button onClick={UIChange}>{footerBtnText}</button>
      </div>
    </div>
  );
};

export default AuthForm;
