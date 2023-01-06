import { Box, Button, Chip, Grid, IconButton, Typography } from "@mui/material";
import { APP_NAME } from "@src/shared/components/AppLogo";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LanguageIcon from "@mui/icons-material/Language";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import FlagIcon from "@mui/icons-material/Flag";
import Image from "next/image";
import Photo from "../../assets/homepage-photo-2.jpeg";
import WeeklyHoursPhoto from "../../assets/homepage-weekly-hours.png";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { ROUTES } from "@src/constants/routes";
import styles from "./HowToStartSection.module.scss";
import { FC, ReactNode } from "react";

type InfoCardProps = {
  number: number;
  icon: ReactNode;
  title: string;
  content: string;
};

const InfoCard: FC<InfoCardProps> = ({ number, icon, title, content }) => {
  return (
    <Box className={styles.infoCard}>
      <Box className={styles.number}>{number}</Box>
      <Box className={styles.icon}>{icon}</Box>
      <Box className={styles.title}>{title}</Box>
      <Box className={styles.content}>{content}</Box>
    </Box>
  );
};

const infoCards = [
  {
    icon: <PersonAddIcon />,
    title: "Create an Account",
    content:
      "Find you need to create an account. You can do this by clicking the Login button above.",
  },
  {
    icon: <LanguageIcon />,
    title: "Select Technology",
    content:
      "Select the technology you want to learn. Any technology you want is available.",
  },
  {
    icon: <GpsFixedIcon />,
    title: "Choose Your Level",
    content:
      "Find out your level and choose it. Get only the right courses for you.",
  },
  {
    icon: <FlagIcon />,
    title: "Ready to Start",
    content:
      "You can start your courses by planning online lessons. You are ready now.",
  },
];

const HowToStartSection = () => {
  return (
    <Box className={styles.root}>
      <Box className={styles.container}>
        <Box className={styles.leftPart}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
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
                  transition: { delay: 0.75 },
                }}
                viewport={{ once: true }}
              >
                <Box className={styles.info1}>
                  <Box className={styles.icon}>
                    <DoneAllIcon />
                  </Box>
                  <Box className={styles.content}>
                    <Box className={styles.contentNumber}>The best learn</Box>
                    <Box className={styles.contentText}>124 best teachers</Box>
                  </Box>
                </Box>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{
                  opacity: 1,
                  transition: { delay: 0.3 },
                }}
                viewport={{ once: true }}
              >
                <Box className={styles.info2}>
                  <Box className={styles.icon}>
                    <FavoriteIcon />
                  </Box>
                  <Box className={styles.content}>
                    <Box className={styles.contentText}>Pricing</Box>
                    <Box className={styles.contentHours}>FREE</Box>
                    <Box>
                      {`All available courses are free. Don't waste time and choose one.`}
                    </Box>
                  </Box>
                </Box>
              </motion.div>
            </Box>
          </motion.div>
        </Box>

        <Box className={styles.rightPart}>
          <Grid container spacing={8}>
            {infoCards.map((card, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{
                    opacity: 1,
                    transition: {
                      delay: 0.5 + index * 0.25,
                    },
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <InfoCard
                    number={index + 1}
                    icon={card.icon}
                    title={card.title}
                    content={card.content}
                  />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default HowToStartSection;
