import AuthContext from "../store/auth-context";
import Credentials from "../components/AuthForm/AuthForm";
import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const navigate = useNavigate();

  const [isNewUser, setIsNewUser] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  const handlePageChange = () => [
    setIsNewUser((prevIsNewUser) => !prevIsNewUser),
  ];

  const handleSubmit = () => {
    setIsLoading(true);

    let uri: string;
    if (isNewUser) { 
      uri = ''
    } else {
      uri = ''
    }
    fetch(uri, {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then((res) => {
      setIsLoading(false);
      if (res.ok) {
        return res.json()
      } else {
        return res.json().then((data) => {
          setError(data.error.errors.message);
          throw new Error(data.error.errors.message);
        });
      }
    })
    .then((data) => {
      authCtx.login(data.idToken);
      navigate('/', {replace: true});
    })
    .catch((err) => {
      alert(err.message);
    });
  };

  return (
    <Credentials
      isNewUser={isNewUser}
      email={email}
      password={password}
      handlePageChange={handlePageChange}
      setEmail={setEmail}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      error={error}
      isLoading={isLoading}
    />
  );
};

export default AuthPage;
