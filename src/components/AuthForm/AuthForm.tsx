// @ts-ignore
import styles from "./AuthForm.module.css";

interface credentialsProps {
  isNewUser: boolean;
  email: undefined | string;
  password: undefined | string;
  handlePageChange: () => void;
  handleSubmit: () => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  error: null | string;
  isLoading: boolean;
}

const Credentials = (props: credentialsProps) => {
  const {
    isNewUser,
    email,
    password,
    handlePageChange,
    setEmail,
    setPassword,
    handleSubmit,
    error,
    isLoading
  } = props;
  let header: string;
  let buttonText: string;
  let footerText: string;
  let footerBtnText: string;

  if (isNewUser) {
    header = "Welcome to BAM headquarters!";
    buttonText = "Sign Up";
    footerText = "Already have an account? Sign in here.";
    footerBtnText = "Sign in!";
  } else {
    header = "Welcome back to BAM headquarters";
    buttonText = "Sign In";
    footerText = "Don't have an account? Sign up now!";
    footerBtnText = "Create account";
  }

  return (
    <div className={styles.container}>
      <div className={styles.authTop}>
        <h1 className={styles.header}>{header}</h1>

        <div className={styles.credentials}>
          <label>Email</label>
          <input
            type="text"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
          {error && <p>{error}</p>}
          {!isLoading && <button onClick={handleSubmit}>{buttonText}</button>}
          {isLoading && <p>loading...</p>}
        </div>
      </div>
      <div className={styles.footer}>
        <h3>{footerText}</h3>
        <button onClick={handlePageChange}>{footerBtnText}</button>
      </div>
    </div>
  );
};

export default Credentials;
