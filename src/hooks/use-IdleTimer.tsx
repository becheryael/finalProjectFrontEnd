import { useEffect, useRef, useCallback } from "react";

const useIdleTimer = ({
  idleTime = 600000,
  onIdle
}: {
  idleTime?: number;
  onIdle: () => void;
}) => {
  const resetTimer = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      onIdle();
    }, idleTime);
  }, [idleTime, onIdle]);

  // MICHAL: שימי את זה ראשון
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleActivity = useCallback(() => {
    resetTimer();
  }, [resetTimer]);

  // MICHAL: ואת זה מיד אחרי
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
  }, [handleActivity, resetTimer]);
};

export default useIdleTimer;
