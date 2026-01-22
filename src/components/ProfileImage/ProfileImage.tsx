//@ts-ignore
import styles from './ProfileImage.module.css'
//@ts-ignore
import beaverAvatar from "../../assets/media/images/beaver-avatar.png";
//@ts-ignore
import deerAvatar from "../../assets/media/images/deer-avatar.png";
//@ts-ignore
import koalaAvatar from "../../assets/media/images/koala-avatar.png";
//@ts-ignore
import raccoonAvatar from "../../assets/media/images/raccoon-avatar.png";

interface imageProps {
  setIsEditImage: (value: boolean) => void;
  isEditPage: boolean;
  avatar: string
}

const ProfileImage = (props: imageProps) => {
  const { setIsEditImage, isEditPage, avatar } = props;
  
  const handleImageChange = () => {
    setIsEditImage(true);
  };
  
  return (
    <>
      <div className={styles["image-container"]}>
        {avatar === "koala" && <img src={koalaAvatar} />}
        {avatar === "deer" && <img src={deerAvatar} />}
        {avatar === "beaver" && <img src={beaverAvatar} />}
        {avatar === "raccoon" && <img src={raccoonAvatar} />}
        {isEditPage && (
          <button onClick={handleImageChange} className={styles["avatar-btn"]}>
            Change Avatar
          </button>
        )}
      </div>
    </>
  );
};

export default ProfileImage;
