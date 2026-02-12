import { useReducer } from "react";

type Action =
  | { type: "INPUT"; value: string }
  | { type: "BLUR" }
  | { type: "RESET" };

type State = { isTouched: boolean; value: string };

const inputStateReducer = (state: State, action: Action) => {
  if (action.type === "INPUT") {
    // MICHAL: יכולה פשוט לכתוב ...state, changedValue: dflsfj
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
  // MICHAL: prev? or initial?
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
    // MICHAL: אם אין שימוש בו, לא חייב לכתוב את הevent למרות שנקבל אחד
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
