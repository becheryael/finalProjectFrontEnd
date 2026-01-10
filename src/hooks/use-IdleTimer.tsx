import { useEffect, useRef, useState } from "react";

const useIdleTimer = ({
  idleTime = 1 * 15 * 1000,
  onIdle,
  onActive
}: {
  idleTime?: number;
  onIdle: () => void;
  onActive: () => void;
}) => {
  const onIdleRef = useRef(onIdle);
  const onActiveRef = useRef(onActive);

  useEffect(() => {
    onIdleRef.current = onIdle;
    onActiveRef.current = onActive;
  }, [onIdle, onActive]);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isIdle, setIsIdle] = useState(false);

  const resetTimer = () => {
    clearTimeout(timeoutRef.current!);
    timeoutRef.current = setTimeout(() => {
      setIsIdle(true);
      onIdleRef.current();
    }, idleTime);
  };

  const handleActivity = () => {
    if (isIdle) {
      setIsIdle(false);
      onActiveRef.current();
    }
    resetTimer();
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "scroll", "click"];
    events.forEach((event) => window.addEventListener(event, handleActivity));

    resetTimer();

    return () => {
      clearTimeout(timeoutRef.current!);
      events.forEach((event) =>
        window.removeEventListener(event, handleActivity)
      );
    };
  }, []);
};

export default useIdleTimer;
