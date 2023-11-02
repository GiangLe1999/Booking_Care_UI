import { FC } from "react";

interface Props {
  src: string;
  alt: string;
}

const UserAvatar: FC<Props> = ({ src, alt }): JSX.Element => {
  return (
    <img
      className="h-full w-full rounded-full object-cover object-center"
      src={src ? src : "/assets/images/default-avatar.png"}
      alt={alt}
    />
  );
};

export default UserAvatar;
