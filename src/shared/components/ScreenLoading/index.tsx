import { Box, LinearProgress } from "@mui/material";
import styles from "./index.module.scss";

const ScreenLoading = () => {
  return (
    <Box className={styles.root}>
      <LinearProgress />
    </Box>
  );
};

export default ScreenLoading;
