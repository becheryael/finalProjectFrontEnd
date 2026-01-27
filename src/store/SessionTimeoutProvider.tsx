import Modal from "../components/UI/Modal";
import AuthContext from "./auth-context";
import useIdleTimer from "../hooks/use-IdleTimer";
import { useState, useContext, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { newToken } from "../services/userApiServices";
import { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";

const TEN_MINUTES = 600000;
const IDLE_TIMEOUT = TEN_MINUTES;
const MODAL_COUNTDOWN = 1 * 20 * 1000;
const TO_MILLISECONDS = 1000;
const REFRESH_INTERVAL = 10 * 60 * 1000;

const EXEMPTED_PATHS = ["/login", "/", "forgot-password", "reset-password"];

export const SessionTimeoutProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [countdownTimer, setCountdownTimer] = useState<NodeJS.Timeout>();
  const location = useLocation();
  const authCtx = useContext(AuthContext);
  const isExemptedRoute = EXEMPTED_PATHS.includes(location.pathname);

  const handleRefresh = useCallback(async () => {
    if (!authCtx.token || isExemptedRoute) return;

    try {
      const res = await newToken(authCtx.token);
      const decodedToken = jwtDecode(res.data.token);
      const expirationTime = new Date(decodedToken.exp! * TO_MILLISECONDS);

      const user = {
        name: authCtx.userInfo.name!,
        personalNum: authCtx.userInfo.personalNum!,
        email: authCtx.userInfo.email!,
        avatar: authCtx.userInfo.avatar!
      };

      authCtx.login(
        res.data.token,
        user,
        authCtx.userId!,
        authCtx.isManager,
        expirationTime.toISOString()
      );
    } catch (error) {
      const axiosError = error as AxiosError;
      alert(`${axiosError.message}. You will need to sign in again.`);
      authCtx.logout();
    }
  }, [authCtx, isExemptedRoute]);

  useEffect(() => {
    if (!authCtx.token || isExemptedRoute) return;

    const interval = setInterval(() => {
      handleRefresh();
    }, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [authCtx.token, isExemptedRoute, handleRefresh]);

  useIdleTimer({
    idleTime: IDLE_TIMEOUT,
    onIdle: () => {
      if (isExemptedRoute) return;
      setShowModal(true);
      const timer = setTimeout(() => {
        setShowModal(false);
        authCtx.logout();
      }, MODAL_COUNTDOWN);
      setCountdownTimer(timer);
    }
  });

  const handleContinue = () => {
    setShowModal(false);
    handleRefresh();
    if (countdownTimer) clearTimeout(countdownTimer);
  };

  return (
    <>
      {children}
      {showModal && (
        <Modal
          title="Session about to expire."
          onConfirm={handleContinue}
          message={`You have been inactive for a long time. Are you still there? :(`}
          confirmTxt="I'm still here"
        />
      )}
    </>
  );
};
