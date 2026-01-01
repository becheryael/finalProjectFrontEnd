import AuthContext from "../store/auth-context";
import AuthForm from "../components/AuthForm/AuthForm";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();

  const [isNewUser, setIsNewUser] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState('');
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  const handlePageChange = () => {
    setIsNewUser((prevIsNewUser) => !prevIsNewUser);
    setEmail("");
    setPassword("");
  };

  const handleSubmit = () => {
    setIsLoading(true);

    let uri: string;
    if (isNewUser) {
      uri = "http://localhost:8000/users/create";
    } else {
      uri = "http://localhost:8000/users/login";
    }
    fetch(uri, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          console.log(res.ok);
          return res.json();
        } else {
          return res.json().then((data) => {
            throw new Error(data.error.errors.message);
          });
        }
      })
      .then((data) => {
        authCtx.login(data.token);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      });
  };

  return (
    <AuthForm
      isNewUser={isNewUser}
      email={email}
      password={password}
      name={name}
      handlePageChange={handlePageChange}
      setEmail={setEmail}
      setPassword={setPassword}
      setName={setName}
      handleSubmit={handleSubmit}
      error={error}
      isLoading={isLoading}
    />
  );
};

export default AuthPage;
