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

const avatarArray = [
  { name: "koala", src: koalaAvatar },
  { name: "deer", src: deerAvatar },
  { name: "raccoon", src: raccoonAvatar },
  { name: "beaver", src: beaverAvatar }
];

const Avatars = (props: avatarProps) => {
  const { setAvatar, avatar } = props;

  const ChangeAvatar = (event: React.MouseEvent<HTMLElement>) => {
    const id = (event.target as Element).id;
    setAvatar(id);
  };

  return (
    <div className={styles.images}>
      {avatarArray.map((avatarItem) => (
        <img
          src={avatarItem.src}
          alt={avatarItem.name}
          id={avatarItem.name}
          onClick={ChangeAvatar}
          className={
            avatar === avatarItem.name
              ? styles["chosen-avatar"]
              : styles["avatar"]
          }
        />
      ))}
    </div>
  );
};

export default Avatars;
