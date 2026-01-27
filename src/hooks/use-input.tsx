import { useReducer } from "react";

type Action =
  | { type: "INPUT"; value: string }
  | { type: "BLUR" }
  | { type: "RESET" };

type State = { isTouched: boolean; value: string };

const inputStateReducer = (state: State, action: Action) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === "BLUR") {
    return { isTouched: true, value: state.value };
  }
  if (action.type === "RESET") {
    return { isTouched: false, value: "" };
  }
  return state;
};

const useInput = (
  validateValue: (value: string) => boolean,
  prevValue?: string
) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, {
    value: prevValue || "",
    isTouched: false
  });

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    dispatch({ type: "INPUT", value: event.target.value });
  };

  const inputBlurHandler = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    dispatch({ type: "BLUR" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return {
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset
  };
};

export default useInput;
