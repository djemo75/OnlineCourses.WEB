import { Box } from "@mui/material";
import { ROUTES } from "@src/constants/routes";
import { useFavoritesPageContext } from "@src/contexts/favoritesPageContext";
import { useRouter } from "next/router";
import FavoriteCard from "./FavoriteCard";

const FavoriteCoursesLessons = () => {
  const router = useRouter();
  const { favoriteCourseLessons, removeFavoriteCourseLesson } =
    useFavoritesPageContext();

  const handleView = (courseId: string, lessonId: string) => {
    router.push(
      ROUTES.viewCourseLesson
        .replace(":id", courseId)
        .replace(":lessonId", lessonId)
    );
  };

  return (
    <Box>
      {favoriteCourseLessons.map((favoriteCourseLesson, index) => (
        <FavoriteCard
          name={favoriteCourseLesson.title}
          averageRating={favoriteCourseLesson.averageRating}
          onClickView={() =>
            handleView(favoriteCourseLesson.courseId, favoriteCourseLesson.id)
          }
          onClickRemove={() =>
            removeFavoriteCourseLesson(favoriteCourseLesson.id)
          }
          key={index}
        />
      ))}
      {favoriteCourseLessons.length === 0 && "No data"}
    </Box>
  );
};

export default FavoriteCoursesLessons;
