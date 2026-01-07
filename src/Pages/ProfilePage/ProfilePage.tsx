import { useContext, useState, useRef } from "react";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { InputHandle } from "../../components/UserInfoField/UserInfoField";
import AuthContext from "../../store/auth-context";
import { editUser } from "../../services/apiServices";
import ProfileForm from "../../components/ProfileForm/ProfileForm";

const ProfilePage = () => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const id = authCtx.userId;
  const token = authCtx.token;
  const [isEdit, setIsEdit] = useState(false);
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
      const res = await editUser(
        name!,
        personalNum!,
        email!,
        avatar!,
        id!,
        token!
      );
      if (res.status === 200) {
        authCtx.edit(name!, personalNum!, email!, avatar!);
      }
    } catch (error) {
      handleUndo();
      const axiosError = error as AxiosError;
      console.log(axiosError);
      const errorMessage = axiosError.response?.data as string;
      const errorArray = errorMessage.split(" ");
      console.log(errorArray);
      if (errorArray.includes("duplicate")) {
        const index = errorArray.indexOf("key:");
        if (errorArray.includes("personalNum:")) {
          errorArray[index + 2] = "Personal number";
        }
        const returnError = `${errorArray[index + 2]} ${
          errorArray[index + 3]
        } already exists in database.`;
        setError(returnError);
        setIsLoading(false);
        setIsEdit(false);
        return;
      }
      if (errorMessage) {
        setError(errorMessage);
      } else {
        setError(
          "Unable to make changes. make sure all your informaion in correct."
        );
      }
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
    navigate("/main");
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
