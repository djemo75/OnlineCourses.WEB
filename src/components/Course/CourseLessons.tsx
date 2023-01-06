import { Box, Typography } from "@mui/material";
import { useCoursePageContext } from "@src/contexts/coursePageContext";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import styles from "./CourseLessons.module.scss";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useRouter } from "next/router";
import { formatDuration } from "@src/shared/api/utils/formatDuration";
import { motion } from "framer-motion";
import { ROUTES } from "@src/constants/routes";

const animateItem = {
  initial: { opacity: 0, translateX: 270 },
  animate: { opacity: 1, translateX: 0, transition: { delay: 0.2 } },
};

const CourseLessons = () => {
  const router = useRouter();
  const context = useCoursePageContext();
  const lessons = context.courseLessons;

  const handleViewLesson = (lessonId: string) => () => {
    router.push(
      ROUTES.viewCourseLesson
        .replace(":id", router.query.courseId as string)
        .replace(":lessonId", lessonId)
    );
  };

  return (
    <motion.div variants={animateItem}>
      {lessons.map((lesson) => (
        <Box
          key={lesson.id}
          className={styles.lesson}
          onClick={handleViewLesson(lesson.id)}
        >
          <Box className={styles.lessonTitle}>{lesson.title}</Box>
          <Box className={styles.lessonDuration}>
            {formatDuration(lesson.duration)}
          </Box>
          <Box className={styles.lessonViewIcon}>
            <KeyboardArrowRightIcon />
          </Box>
        </Box>
      ))}
      {!lessons.length ? (
        <Box className={styles.noData}>
          <TextSnippetIcon />
          No lessons added yet!
        </Box>
      ) : null}
    </motion.div>
  );
};

export default CourseLessons;
