import { Box, Icon, Typography } from "@mui/material";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import styles from "./index.module.scss";

export const APP_NAME = "Online-Library";

const AppLogo = () => {
  return (
    <Box className={styles.appLogo}>
      <Icon color="inherit" className={styles.logoIcon}>
        <LocalLibraryIcon />
      </Icon>
      <Typography variant="h6">{APP_NAME}</Typography>
    </Box>
  );
};

export default AppLogo;
