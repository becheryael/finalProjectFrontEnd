import { useState, useEffect, useContext } from "react";
import useIdleTimer from "../hooks/use-IdleTimer";
import { useLocation } from "react-router-dom";
import { newToken } from "../services/userApiServices";
import { AxiosError } from "axios";
import Modal from "../components/UI/Modal";
import AuthContext from "./auth-context";
import { jwtDecode } from "jwt-decode";

const IDLE_TIMEOUT = 1 * 5 * 1000;
const MODAL_COUNTDOWN = 1 * 10 * 1000;
const TO_MILLISECONDS = 1000;
const TEN_MINUTES = 600000;

const EXEMPTED_PATHS = ["/login", "/"];

export const SessionTimeoutProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  // const [showModal, setShowModal] = useState(false);
  // const [countdownTimer, setCountdownTimer] = useState<NodeJS.Timeout>();
  // const location = useLocation();
  // const authCtx = useContext(AuthContext);
  // const isExemptedRoute = EXEMPTED_PATHS.includes(location.pathname);

  // useIdleTimer({
  //   idleTime: IDLE_TIMEOUT,
  //   onIdle: () => {
  //     console.log(location.pathname);
  //     console.log(isExemptedRoute);

  //     if (isExemptedRoute) return;

  //       setShowModal(true);
  //       const timer = setTimeout(() => {
  //         setShowModal(false);
  //         authCtx.logout();
  //       }, MODAL_COUNTDOWN);
  //       setCountdownTimer(timer);
  //   },
  //   onActive: () => {
  //     if (isExemptedRoute) return;

  //     if (showModal) {
  //       setShowModal(false);
  //       clearTimeout(countdownTimer);
  //     }
  //   }
  // });

  // const handleRefresh = async () => {
  //   console.log('in handleRefresh');
  //   setShowModal(false);
  //   const getNewTokenTimer = setTimeout(()=> {
  //   console.log(location.pathname);
  //   console.log(isExemptedRoute);
  //   if (isExemptedRoute) return;
  //   console.log('in set timeout')
  //   handleRefresh()
  // }, 5000)
  //   try {
  //     const res = await newToken(authCtx.token!);
  //     const decodedToken = jwtDecode(res.data.token);
  //     const tokenExpiration = decodedToken.exp;
  //     const expirationTime = new Date(tokenExpiration! * TO_MILLISECONDS);
  //     const user = {
  //       name: authCtx.userInfo.name!,
  //       personalNum: authCtx.userInfo.personalNum!,
  //       email: authCtx.userInfo.email!,
  //       avatar: authCtx.userInfo.avatar!
  //     };
  //     console.log(res)
  //     authCtx.login(
  //       res.data.token,
  //       user,
  //       authCtx.userId!,
  //       expirationTime.toISOString()
  //     );
  //   } catch (error) {
  //     const axiosError = error as AxiosError;
  //     alert(`${axiosError.message}. You will need to sign in again.`);
  //     authCtx.logout();
  //     console.log(axiosError)
  //   }
  //       clearTimeout(getNewTokenTimer);
  // };

  // const handleContinue = () => {
  //   handleRefresh();
  //   clearTimeout(countdownTimer);
  // };

  return (
    <>
      {children}
      {/* {showModal && (
        <Modal
          title="Session about to expire."
          onConfirm={handleContinue}
          message={`You have been inactive for a long time. Are you still there? :(`}
          confirmTxt="I'm still here"
        />
      )} */}
    </>
  );
};
