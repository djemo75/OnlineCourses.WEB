import { Box } from "@mui/material";
import classNames from "classnames";
import { ReactNode } from "react";
import { FC } from "react";
import styles from "./index.module.scss";

type Props = {
  url: string;
  icon: ReactNode;
  bgColor?: string;
  text: string;
  className?: string;
};

const SocialMediaShareButton: FC<Props> = ({
  url,
  icon,
  bgColor = "lightgray",
  text,
  className,
}) => {
  const handleClick = () => {
    window.open(url, "_blank", "height=500px,width=500px");
  };

  return (
    <Box
      className={classNames(styles.root, className)}
      onClick={handleClick}
      bgcolor={bgColor}
    >
      {icon} <Box className={styles.text}>{text}</Box>
    </Box>
  );
};

export default SocialMediaShareButton;
