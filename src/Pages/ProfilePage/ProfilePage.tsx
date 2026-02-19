import ProfileForm from "../../components/ProfileForm/ProfileForm";
import AuthContext from "../../store/auth-context";
import parseAPIError from "../../helperFunctions/parseAPIError";
import { useContext, useState, useRef } from "react";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { InputHandle } from "../../components/UserInfoField/UserInfoField";
import { editUser } from "../../services/userApiServices";
import { StatusCodes } from "http-status-codes";

const ProfilePage = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const { token } = authCtx;
  const [isEdit, setIsEdit] = useState(false);
  // MICHAL: כל הstates האלה לא צריכים להיות כאן אלא בתוך הform עצמו. תשלחי את הערכים שלהם בפונקציות שצריכות אותם.
  const [name, setName] = useState(authCtx.userInfo.name);
  const [personalNum, setPersonalNum] = useState(authCtx.userInfo.personalNum);
  const [avatar, setAvatar] = useState(authCtx.userInfo.avatar);
  const [email, setEmail] = useState(authCtx.userInfo.email);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const nameRef = useRef<InputHandle>(null);
  const personalNumRef = useRef<InputHandle>(null);
  const emailRef = useRef<InputHandle>(null);

  const handleSave = async () => {
    if (
      name === authCtx.userInfo.name &&
      personalNum === authCtx.userInfo.personalNum &&
      email === authCtx.userInfo.email &&
      avatar === authCtx.userInfo.avatar
    ) {
      setIsEdit(false);
      setError("");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const res = await editUser(name!, personalNum!, email!, avatar!, token!);
      if (res.status === StatusCodes.OK) {
        authCtx.edit(name!, personalNum!, email!, avatar!);
      }
    } catch (error) {
      handleUndo();
      const axiosError = error as AxiosError;
      const errorMessage = axiosError.response?.data as string;
      const returnError = parseAPIError(errorMessage);
      if (returnError) {
        setError(returnError);
        return;
      }
      if (errorMessage) {
        setError(errorMessage);
        return;
      }
      setError(
        "Unable to make changes. make sure all your informaion in correct."
      );
    }
    setIsLoading(false);
    setIsEdit(false);
  };

  const handleUndo = () => {
    setName(authCtx.userInfo.name);
    setPersonalNum(authCtx.userInfo.personalNum);
    setEmail(authCtx.userInfo.email);
    setAvatar(authCtx.userInfo.avatar);
    nameRef.current?.resetInput();
    emailRef.current?.resetInput();
    personalNumRef.current?.resetInput();
    setError("");
    setIsEdit(false);
  };

  const handlePageChange = () => {
    handleUndo();
    navigate("/main/my-requests");
  };

  return (
    <ProfileForm
      handleSave={handleSave}
      handleUndo={handleUndo}
      handlePageChange={handlePageChange}
      error={error}
      isLoading={isLoading}
      isEdit={isEdit}
      setIsEdit={setIsEdit}
      name={name!}
      personalNum={personalNum!}
      email={email!}
      setName={setName}
      setPersonalNum={setPersonalNum}
      setEmail={setEmail}
      nameRef={nameRef}
      personalNumRef={personalNumRef}
      emailRef={emailRef}
      avatar={avatar!}
      setAvatar={setAvatar}
    />
  );
};

export default ProfilePage;
