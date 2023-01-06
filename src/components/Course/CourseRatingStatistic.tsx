import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Rating,
  Typography,
} from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import styles from "./CourseRatingStatistic.module.scss";
import { useCoursePageContext } from "@src/contexts/coursePageContext";
import { FC, useState } from "react";
import { motion } from "framer-motion";
import { useAuthContext } from "@src/contexts/authContext";
import AddRatingModal from "./AddRatingModal";

const animateItem = {
  initial: { opacity: 0, translateX: 270 },
  animate: { opacity: 1, translateX: 0, transition: { delay: 0.2 } },
};

type RatingStatisticRowProps = {
  number: number;
  percentage: number;
};

const RatingStatisticRow: FC<RatingStatisticRowProps> = ({
  number,
  percentage,
}) => {
  return (
    <Box className={styles.ratingStatisticRow}>
      <Box className={styles.icon}>
        <StarRoundedIcon />
      </Box>
      <Box className={styles.number}>{number}</Box>
      <Box className={styles.progressBar}>
        <LinearProgress variant="determinate" value={percentage} />
      </Box>
      <Box className={styles.percentage}>{percentage}%</Box>
    </Box>
  );
};

const CourseRatingStatistic = () => {
  const { userData } = useAuthContext();
  const { ratingStatistic, ratings } = useCoursePageContext();
  const [ratingModalVisible, setRatingModalVisible] = useState(false);

  const handleOpenReviewModal = () => {
    if (hasReview || !userData) return;
    setRatingModalVisible(true);
  };

  const hasReview = ratings.some(({ userId }) => userId === userData?.id);

  const getAdditionalText = () => {
    if (!userData)
      return "Please Login to share your opinion about the course!";

    return hasReview
      ? "You have already shared your opinion"
      : "You can share your opinion about the course from the button below.";
  };

  return (
    <motion.div variants={animateItem}>
      <Box className={styles.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography className={styles.cardTitle}>
              Rating information
            </Typography>
            <Box className={styles.randomRating}>{getAdditionalText()}</Box>
            <Box mt={2}>
              {userData && !hasReview && (
                <Button variant="outlined" onClick={handleOpenReviewModal}>
                  Write Review
                </Button>
              )}
              <AddRatingModal
                visible={ratingModalVisible}
                onClose={() => setRatingModalVisible(false)}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <RatingStatisticRow
              number={5}
              percentage={ratingStatistic.fivePercentage}
            />
            <RatingStatisticRow
              number={4}
              percentage={ratingStatistic.fourPercentage}
            />
            <RatingStatisticRow
              number={3}
              percentage={ratingStatistic.threePercentage}
            />
            <RatingStatisticRow
              number={2}
              percentage={ratingStatistic.twoPercentage}
            />
            <RatingStatisticRow
              number={1}
              percentage={ratingStatistic.onePercentage}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box className={styles.centeredColumn}>
              <Box className={styles.averageRating}>
                <Box className={styles.value}>
                  {ratingStatistic.averageRating}
                </Box>
                <Box className={styles.text}>out of 5</Box>
              </Box>

              <Rating
                value={ratingStatistic.averageRating}
                icon={<StarRoundedIcon fontSize="inherit" />}
                emptyIcon={<StarOutlineRoundedIcon fontSize="inherit" />}
                size="large"
                readOnly
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </motion.div>
  );
};

export default CourseRatingStatistic;
