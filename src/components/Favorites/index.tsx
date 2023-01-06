import { Grid, Box, Typography } from "@mui/material";
import { useFavoritesPageContext } from "@src/contexts/favoritesPageContext";
import CustomTabs from "@src/shared/components/CustomTabs";
import FavoriteCoursesLessons from "./FavoriteCourseLessons";
import FavoriteCourses from "./FavoriteCourses";
import styles from "./index.module.scss";

const Favorites = () => {
  const { favoriteCourses, favoriteCourseLessons } = useFavoritesPageContext();

  return (
    <Box maxWidth={1080} margin="auto">
      <Typography variant="h4" gutterBottom>
        Favorites
      </Typography>
      <Box mb={2}>
        Add to Favorites and make lists according to your preferences. At the
        moment you can only add courses and lessons
      </Box>
      <Box mt={4}>
        <CustomTabs
          tabs={[
            {
              label: `Courses (${favoriteCourses.length})`,
              content: <FavoriteCourses />,
            },
            {
              label: `Course Lessons (${favoriteCourseLessons.length})`,
              content: <FavoriteCoursesLessons />,
            },
          ]}
          className={styles.tabs}
        />
      </Box>
    </Box>
  );
};

export default Favorites;
