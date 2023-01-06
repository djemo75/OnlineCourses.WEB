import { Box, Button } from "@mui/material";
import styles from "./CourseLessonsPlaylist.module.scss";
import { FC } from "react";
import { useCourseLessonPageContext } from "@src/contexts/courseLessonPageContext";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { formatDuration } from "@src/shared/api/utils/formatDuration";
import classNames from "classnames";
import { useRouter } from "next/router";
import { ROUTES } from "@src/constants/routes";
import { FavoriteItemType } from "@src/shared/api/types/favorite";
import FavoriteButton from "@src/shared/components/FavoriteButton";

type Props = {};

const CourseLessonsPlaylist: FC<Props> = () => {
  const router = useRouter();
  const context = useCourseLessonPageContext();
  const { courseLessons, changeFavoriteCourseLesson } = context;
  const currentLesson = context.currentLesson!;

  const handleViewLesson = (lessonId: string) => () => {
    router.replace(
      ROUTES.viewCourseLesson
        .replace(":id", router.query.courseId as string)
        .replace(":lessonId", lessonId)
    );
    // TO-DO find workaround to fetch next lesson without reloading new page -> fetch on client-side with useEffect
  };

  const handleGoCourseDetails = () => {
    router.push(
      ROUTES.viewCourse.replace(":id", router.query.courseId as string)
    );
  };
  return (
    <Box className={styles.root}>
      <Box className={styles.topActionBar}>
        <Button variant="outlined" onClick={handleGoCourseDetails}>
          Course Details
        </Button>

        <FavoriteButton
          isFavorite={currentLesson.favorite}
          itemId={currentLesson.id}
          itemType={FavoriteItemType.COURSE_LESSON}
          onAddFavorite={() => changeFavoriteCourseLesson(true)}
          onRemoveFavorite={() => changeFavoriteCourseLesson(false)}
        />
      </Box>
      <Box className={styles.playlist}>
        {courseLessons.map((lesson, index) => (
          <Box
            key={index}
            className={classNames(styles.playlistItem, {
              [styles.activePlaylistItem]: lesson.id === currentLesson.id,
            })}
            onClick={handleViewLesson(lesson.id)}
          >
            <PlayCircleIcon />
            <Box className={styles.playlistItemTitle}>{lesson.title}</Box>{" "}
            <Box className={styles.playlistItemDuration}>
              {formatDuration(lesson.duration)}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CourseLessonsPlaylist;
