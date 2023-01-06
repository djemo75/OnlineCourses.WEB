import { Box, Chip, Grid, Rating, Typography } from "@mui/material";
import { useCoursePageContext } from "@src/contexts/coursePageContext";
import Image from "next/image";
import styles from "./CourseDetails.module.scss";
import MessageIcon from "@mui/icons-material/Message";
import InnerHTML from "@src/shared/components/InnerHTML";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import {
  getFacebookShareUrl,
  getTwitterShareUrl,
} from "@src/utils/socialMediaShare";
import SocialMediaShareButton from "@src/shared/components/SocialMediaShareButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";
import { FavoriteItemType } from "@src/shared/api/types/favorite";
import FavoriteButton from "@src/shared/components/FavoriteButton";

const animateItem = {
  initial: { opacity: 0, translateY: 70 },
  animate: { opacity: 1, translateY: 0 },
};

const CourseDetails = () => {
  const context = useCoursePageContext();
  const course = context.course!;
  const { changeFavoriteCourse, ratingStatistic } = context;

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={4} md={4}>
        <motion.div variants={animateItem}>
          <Box className={styles.imageContainer}>
            <Image
              src={course.image.fileUrl}
              className={styles.image}
              alt="cover"
              width="100%"
              height="100%"
              objectFit="cover"
              quality={100}
              priority
            />
          </Box>
        </motion.div>
      </Grid>
      <Grid item xs={12} sm={8} md={8}>
        <Box>
          <motion.div variants={animateItem}>
            <Typography variant="h4" className={styles.title}>
              {course.title}
            </Typography>
          </motion.div>

          <motion.div variants={animateItem}>
            <Box className={styles.statistics}>
              <Box className={styles.rating}>
                <Rating
                  value={ratingStatistic.averageRating}
                  icon={<StarRoundedIcon fontSize="inherit" />}
                  emptyIcon={<StarOutlineRoundedIcon fontSize="inherit" />}
                  size="large"
                  readOnly
                />{" "}
                <Box className={styles.ratingValue}>
                  {ratingStatistic.averageRating}
                </Box>
              </Box>

              <Box className={styles.reviews}>
                <MessageIcon />
                <Box className={styles.reviewsValue}>
                  {ratingStatistic.total} Reviews
                </Box>
              </Box>
            </Box>
          </motion.div>

          <motion.div variants={animateItem}>
            <Box className={styles.description}>
              <InnerHTML html={course.description} />
            </Box>
          </motion.div>

          <motion.div variants={animateItem}>
            <Box className={styles.tags}>
              {course.tags.map((tag, index) => (
                <Chip key={index} label={tag} className={styles.tag} />
              ))}
            </Box>
          </motion.div>

          <motion.div variants={animateItem}>
            <Box className={styles.actionArea}>
              <Box className={styles.socialMedias}>
                <SocialMediaShareButton
                  url={getFacebookShareUrl(window.location.href, course.title)}
                  icon={<FontAwesomeIcon icon={faFacebook} />}
                  bgColor="#1e33e6"
                  text="Facebook"
                />

                <SocialMediaShareButton
                  url={getTwitterShareUrl(window.location.href, course.title)}
                  icon={<FontAwesomeIcon icon={faTwitter} />}
                  bgColor="#61c2e2"
                  text="Twitter"
                />
              </Box>

              <FavoriteButton
                size="large"
                isFavorite={course.favorite}
                itemId={course.id}
                itemType={FavoriteItemType.COURSE}
                onAddFavorite={() => changeFavoriteCourse(true)}
                onRemoveFavorite={() => changeFavoriteCourse(false)}
              />
            </Box>
          </motion.div>
        </Box>
      </Grid>
    </Grid>
  );
};

export default CourseDetails;
