import { Box } from "@mui/material";
import { ROUTES } from "@src/constants/routes";
import { useFavoritesPageContext } from "@src/contexts/favoritesPageContext";
import { useRouter } from "next/router";
import FavoriteCard from "./FavoriteCard";

const FavoriteCourses = () => {
  const router = useRouter();
  const { favoriteCourses, removeFavoriteCourse } = useFavoritesPageContext();

  const handleView = (courseId: string) => {
    router.push(ROUTES.viewCourse.replace(":id", courseId));
  };

  return (
    <Box>
      {favoriteCourses.map((favoriteCourse, index) => (
        <FavoriteCard
          name={favoriteCourse.title}
          averageRating={favoriteCourse.averageRating}
          imageUrl={favoriteCourse.image.fileUrl}
          onClickView={() => handleView(favoriteCourse.id)}
          onClickRemove={() => removeFavoriteCourse(favoriteCourse.id)}
          key={index}
        />
      ))}
      {favoriteCourses.length === 0 && "No data"}
    </Box>
  );
};

export default FavoriteCourses;
