import { Box, Button, IconButton, Typography } from "@mui/material";
import { APP_NAME } from "@src/shared/components/AppLogo";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ArticleIcon from "@mui/icons-material/Article";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import Image from "next/image";
import Photo from "../../assets/homepage-photo-1.jpeg";
import WeeklyHoursPhoto from "../../assets/homepage-weekly-hours.png";
import styles from "./WhatIsBestSection.module.scss";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { ROUTES } from "@src/constants/routes";

const WhatIsBestSection = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push(ROUTES.courses);
  };

  const handleWatchVideo = () => {
    window.open("https://www.youtube.com/watch?v=zrJqnu3ysWw", "_blank");
  };

  return (
    <Box className={styles.root}>
      <Box className={styles.leftPart}>
        <motion.div
          initial={{ opacity: 0, translateY: -30 }}
          whileInView={{
            opacity: 1,
            translateY: 0,
            transition: { delay: 0.3 },
          }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Box className={styles.openingText}>The best choice</Box>
          <Typography className={styles.title} variant="h2">
            What is the Best Method for You?
          </Typography>
          <Box className={styles.description}>
            You will learn the easiest and most practical way to learn new
            things thanks to {APP_NAME}.
          </Box>
          <Box className={styles.actions}>
            <Button
              variant="contained"
              size="large"
              className={styles.getStartedButton}
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
            <Box className={styles.watchVideoButtonWrapper}>
              <IconButton
                color="primary"
                size="large"
                className={styles.watchVideoButton}
                onClick={handleWatchVideo}
              >
                <PlayArrowIcon />
              </IconButton>
              <Box>Watch video</Box>
            </Box>
          </Box>
        </motion.div>
      </Box>

      <Box className={styles.rightPart}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Box className={styles.imageWrapper}>
            <motion.div
              initial={{ opacity: 0, translateY: -120 }}
              whileInView={{ opacity: 1, translateY: 0 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <Image
                src={Photo}
                className={styles.image}
                alt="cover"
                width="100%"
                height="100%"
                objectFit="cover"
                layout="responsive"
                quality={100}
                priority
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{
                opacity: 1,
                transition: { delay: 0.3 },
              }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <Box className={styles.info1}>
                <Box className={styles.icon}>
                  <ArticleIcon />
                </Box>
                <Box className={styles.content}>
                  <Box className={styles.contentNumber}>110K</Box>
                  <Box className={styles.contentText}>Active Students</Box>
                </Box>
              </Box>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{
                opacity: 1,
                transition: { delay: 0.75 },
              }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <Box className={styles.info2}>
                <Box className={styles.icon}>
                  <DoneAllIcon />
                </Box>
                <Box className={styles.content}>
                  <Box className={styles.contentText}>Weekly Spent Hours</Box>
                  <Box className={styles.contentHours}>36 hrs 46 mins</Box>
                  <Box>
                    <Image
                      src={WeeklyHoursPhoto}
                      className={styles.image}
                      alt="cover"
                      width="100%"
                      height="100%"
                      quality={100}
                      priority
                    />
                  </Box>
                </Box>
              </Box>
            </motion.div>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
};

export default WhatIsBestSection;
