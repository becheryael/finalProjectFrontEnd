import { useState, RefObject } from "react";
import validator from "validator";
import UserInfoField, { InputHandle } from "../UserInfoField/UserInfoField";
import ProfileImage from "../ProfileImage/ProfileImage";
import Modal from "../UI/Modal";
import Avatars from "../Avatars/Avatars";
//@ts-ignore
import arrowImage from "../../assets/media/images/back-arrow.png";
//@ts-ignore
import styles from "./ProfileForm.module.css";

interface profileFormProps {
  handleSave: () => void;
  handleUndo: () => void;
  handlePageChange: () => void;
  error: null | string;
  isLoading: boolean;
  isEdit: boolean;
  setIsEdit: (value: boolean) => void;
  name: string;
  personalNum: string;
  email: string;
  setName: (value: string) => void;
  setPersonalNum: (value: string) => void;
  setEmail: (value: string) => void;
  nameRef: RefObject<InputHandle | null>;
  personalNumRef: RefObject<InputHandle | null>;
  emailRef: RefObject<InputHandle | null>;
  setAvatar: (value: string) => void;
  avatar: string;
}

const ProfileForm = (props: profileFormProps) => {
  const {
    handleSave,
    handleUndo,
    handlePageChange,
    error,
    isLoading,
    isEdit,
    setIsEdit,
    name,
    personalNum,
    email,
    setName,
    setPersonalNum,
    setEmail,
    nameRef,
    personalNumRef,
    emailRef,
    setAvatar,
    avatar
  } = props;

  const [nameIsValid, setNameIsValid] = useState(true);
  const [personalNumIsValid, setPersonalNumIsValid] = useState(true);
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [isEditImage, setIsEditImage] = useState(false);

  const PERSONAL_NUM_LENGTH = 7;

  let formIsValid =
    emailIsValid &&
    nameIsValid &&
    personalNumIsValid;

  const saveBtnClasses = !formIsValid
    ? `${styles["save-btn"]} ${styles["disabled-save-btn"]}`
    : styles["save-btn"];

  const handleAvatarChange = () => {
    setIsEditImage(false);
  };

  return (
    <>
      <img
        src={arrowImage}
        className={styles["back-arrow"]}
        onClick={handlePageChange}
        alt="back arrow"
      />
      <div className={styles.container}>
        <ProfileImage
          setIsEditImage={setIsEditImage}
          isEditPage={isEdit}
          avatar={avatar}
        />
        {isEditImage && (
          <Modal
            title="Pick your new avatar!"
            confirmTxt="Confirm"
            onConfirm={handleAvatarChange}
            component={<Avatars setAvatar={setAvatar} avatar={avatar} />}
          />
        )}
        <div className={styles["inputs-contianer"]}>
          <UserInfoField
            title="Name"
            inputType="text"
            value={name!}
            errorText="You must enter a name to save changes."
            checkIsValid={(value) => value !== ""}
            setInput={setName}
            setIsValid={setNameIsValid}
            isEdit={isEdit}
            ref={nameRef}
          />
          <UserInfoField
            title="Personal Number"
            inputType="text"
            value={personalNum!}
            errorText={`Your personal number must be exactly ${PERSONAL_NUM_LENGTH} characters to save changes`}
            checkIsValid={(value) => value.length === PERSONAL_NUM_LENGTH}
            setInput={setPersonalNum}
            setIsValid={setPersonalNumIsValid}
            ref={personalNumRef}
            isEdit={isEdit}
            isNumOnly={true}
          />
          <UserInfoField
            title="Email"
            inputType="email"
            value={email!}
            errorText="You must enter a valid email to save changes."
            checkIsValid={(value) => validator.isEmail(value)}
            setInput={setEmail}
            setIsValid={setEmailIsValid}
            ref={emailRef}
            isEdit={isEdit}
          />
        </div>
        {isLoading && <p>loading...</p>}
        {error && <p className={styles.error}>{error}</p>}
        {!isEdit && !isLoading && (
          <button
            className={styles["edit-btn"]}
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        )}
        {isEdit && !isLoading && (
          <>
            <button
              onClick={handleSave}
              disabled={!formIsValid}
              className={saveBtnClasses}
            >
              Save
            </button>
            <p className={styles.undo} onClick={handleUndo}>
              Reverse changes
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default ProfileForm;
