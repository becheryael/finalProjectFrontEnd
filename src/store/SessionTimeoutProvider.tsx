import { useState, useEffect, useContext } from "react";
import useIdleTimer from "../hooks/use-IdleTimer";
import { useLocation } from "react-router-dom";
import { newToken } from "../services/apiServices";
import { AxiosError } from "axios";
import Modal from "../components/UI/Modal";
import AuthContext from "./auth-context";
import { jwtDecode } from "jwt-decode";

const IDLE_TIMEOUT = 1 * 5 * 1000;
const MODAL_COUNTDOWN = 1 * 5 * 1000;
const TO_MILLISECONDS = 1000;
const TEN_MINUTES = 600000;

const EXEMPTED_PATHS = ["/login", "/"];

export const SessionTimeoutProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [countdownTimer, setCountdownTimer] = useState<NodeJS.Timeout>();
  const location = useLocation();
  const authCtx = useContext(AuthContext);
  const isExemptedRoute = EXEMPTED_PATHS.includes(location.pathname);

  //   const [isRefreshLoading, setIsRefreshLoading] = useState(false);

  const [isIdle, setIsIdle] = useState(false);


    const timer = setTimeout(() => {
         
    }, TEN_MINUTES)

  const calculateRemainingTime = () => {
    const exiprationTime = localStorage.getItem("expirationTime");
    if (!exiprationTime) return 0;
    return new Date(exiprationTime).getTime() - Date.now();
  };


  const handleRefresh = async () => {
    //   setIsRefreshLoading(true);
    try {
      const res = await newToken(authCtx.token!);
      const decodedToken = jwtDecode(res.data.token);
      const tokenExpiration = decodedToken.exp;
      const expirationTime = new Date(tokenExpiration! * TO_MILLISECONDS);
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
        expirationTime.toISOString()
      );
    } catch (error) {
      const axiosError = error as AxiosError;
      alert(`${axiosError.message}. You will need to sign in again.`);
      authCtx.logout();
    }
    // setIsRefreshLoading(false);
  };

  useEffect(() => {
    if (!authCtx.isLoggedIn) return;

    const checkInterval = setInterval(() => {
      const remaining = calculateRemainingTime();
      if (remaining <= 0) {
        authCtx.logout();
      }
    }, 60000);

    return () => clearInterval(checkInterval);
  }, [authCtx.isLoggedIn]);

  //   const refreshToken = async () => {
  //     try {
  //       const res = await newToken(authCtx.token!);
  //       localStorage.setItem("token", res.data.token);
  //     } catch (error) {
  //       const axiosError = error as AxiosError;
  //       alert(`${axiosError.message}. You will need to sign in again.`);
  //       authCtx.logout();
  //     }
  //   };

  useIdleTimer({
    idleTime: IDLE_TIMEOUT,
    onIdle: () => {
      console.log(location.pathname);
      console.log(isExemptedRoute);

      if (isExemptedRoute) return;
      const remainingTime = calculateRemainingTime();
      if (remainingTime < MODAL_COUNTDOWN) {
        authCtx.logout();
      } else {
        setShowModal(true);
      }
      //   const timer = setTimeout(() => {
      //     logout();
      //   }, MODAL_COUNTDOWN);
      //   setCountdownTimer(timer);
    },
    onActive: () => {
      if (isExemptedRoute) return;

      const remainingTime = calculateRemainingTime();
      if (remainingTime > 0 && remainingTime < 5 * 60 * 1000) {
        handleRefresh();
      }

      if (showModal) setShowModal(false);
    }
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showModal) {
      timer = setTimeout(() => {
        authCtx.logout();
        setShowModal(false);
      }, MODAL_COUNTDOWN);
    }
    return () => clearTimeout(timer);
  }, [showModal]);

  //   useEffect(() => {
  //     if (isExemptedRoute && showModal) {
  //       setShowModal(false);
  //       clearTimeout(countdownTimer);
  //     }
  //   }, [location.pathname]);

  const handleContinue = () => {
    handleRefresh();
    clearTimeout(countdownTimer);
    // setShowModal(false);
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
      {/* {isRefreshLoading &&         <Modal
          title="Loading"
          onConfirm={handleContinue}
          confirmTxt="I'm still here"
        />} */}
    </>
  );
};
