import {
  Avatar,
  Box,
  Button,
  Grid,
  LinearProgress,
  Rating,
  Typography,
} from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import styles from "./CourseRatings.module.scss";
import { useCoursePageContext } from "@src/contexts/coursePageContext";
import { FC } from "react";
import { motion } from "framer-motion";
import { RatingResponse } from "@src/shared/api/types/rating";
import moment from "moment";
import { useAuthContext } from "@src/contexts/authContext";
import { OnlineCoursesClient } from "@src/shared/api/services/onlineCourses";
import { toast } from "react-toastify";

const animateItem = {
  initial: { opacity: 0, translateX: 270 },
  animate: { opacity: 1, translateX: 0, transition: { delay: 0.2 } },
};

type RatingStatisticRowProps = {
  data: RatingResponse;
};

const RatingCard: FC<RatingStatisticRowProps> = ({ data }) => {
  const { userData } = useAuthContext();
  const { fetchRatings, fetchRatingStatistic } = useCoursePageContext();

  const handleDelete = async () => {
    try {
      const client = new OnlineCoursesClient();
      await client.deleteRating(data.itemId);
      await Promise.all([fetchRatingStatistic(), fetchRatings()]);
    } catch (error) {
      toast.error("An error occurred while deleting rating");
    }
  };

  return (
    <Box className={styles.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <Box className={styles.cardHeader}>
            <Avatar
              className={styles.avatar}
              alt={data.user.name}
              src={data.user.picture}
              imgProps={{ referrerPolicy: "no-referrer" }}
            />
            <Box className={styles.info}>
              <Box className={styles.userName}>
                {data.user.name}
                {userData?.id === data.userId && (
                  <Button
                    className={styles.deleteButton}
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                )}
              </Box>
              <Box className={styles.date}>
                {moment(data.createdAt).format("MMM Do, YYYY")}
              </Box>
            </Box>
          </Box>
          <Box className={styles.cardContent}>{data.comment}</Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box className={styles.centeredColumn}>
            <Box className={styles.averageRating}>
              <Box className={styles.value}>{data.value}</Box>
            </Box>

            <Rating
              value={data.value}
              icon={<StarRoundedIcon fontSize="inherit" />}
              emptyIcon={<StarOutlineRoundedIcon fontSize="inherit" />}
              size="large"
              readOnly
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const CourseRatings = () => {
  const { ratings } = useCoursePageContext();
  return (
    <motion.div variants={animateItem}>
      {ratings.map((rating, index) => (
        <RatingCard data={rating} key={index} />
      ))}
    </motion.div>
  );
};

export default CourseRatings;
