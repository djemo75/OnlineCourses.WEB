import { Box, Typography } from "@mui/material";
import { useCourseLessonPageContext } from "@src/contexts/courseLessonPageContext";
import InnerHTML from "@src/shared/components/InnerHTML";
import styles from "./LessonDetails.module.scss";
import moment from "moment";

const LessonDetails = () => {
  const context = useCourseLessonPageContext();
  const currentLesson = context.currentLesson!;
  const getYoutubeVideoId = () => {
    const url = new URL(currentLesson.videoUrl);
    return url.searchParams.get("v");
  };
  return (
    <Box className={styles.root}>
      <Box className={styles.videoContainer}>
        <Box className={styles.fluidVideoWrapper}>
          <iframe
            src={`https://www.youtube.com/embed/${getYoutubeVideoId()}?origin=http://localhost`}
            title={currentLesson.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Box>
      </Box>
      <Typography variant="h6" className={styles.title}>
        {currentLesson.title}
      </Typography>

      <Box className={styles.createdAt}>
        {moment(currentLesson.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
      </Box>
      <Box className={styles.description}>
        <InnerHTML html={currentLesson.description} />
      </Box>
    </Box>
  );
};

export default LessonDetails;
