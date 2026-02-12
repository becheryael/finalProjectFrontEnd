//@ts-ignore
import beaverAvatar from "../../assets/media/images/beaver-avatar.png";
//@ts-ignore
import deerAvatar from "../../assets/media/images/deer-avatar.png";
//@ts-ignore
import koalaAvatar from "../../assets/media/images/koala-avatar.png";
//@ts-ignore
import raccoonAvatar from "../../assets/media/images/raccoon-avatar.png";
//@ts-ignore
import styles from "./Avatars.module.css";

interface avatarProps {
  setAvatar: (value: string) => void;
  avatar: string;
}

const Avatars = (props: avatarProps) => {
  const { setAvatar, avatar } = props;

  const ChangeAvatar = (event: React.MouseEvent<HTMLElement>) => {
    const id = (event.target as Element).id;
    setAvatar(id);
  };

  return (
    <div className={styles.images}>
      {/* MICHAL: הייתי עושה מערך חיות ועושה עליו map כדי ליצור את זה */}
      <img
        src={koalaAvatar}
        alt="koala"
        id="koala"
        onClick={ChangeAvatar}
        className={
          avatar === "koala" ? styles["chosen-avatar"] : styles["avatar"]
        }
      />
      <img
        src={deerAvatar}
        alt="deer"
        id="deer"
        onClick={ChangeAvatar}
        className={
          avatar === "deer" ? styles["chosen-avatar"] : styles["avatar"]
        }
      />
      <img
        src={raccoonAvatar}
        alt="raccoon"
        id="raccoon"
        onClick={ChangeAvatar}
        className={
          avatar === "raccoon" ? styles["chosen-avatar"] : styles["avatar"]
        }
      />
      <img
        src={beaverAvatar}
        alt="beaver"
        id="beaver"
        onClick={ChangeAvatar}
        className={
          avatar === "beaver" ? styles["chosen-avatar"] : styles["avatar"]
        }
      />
    </div>
  );
};

export default Avatars;
