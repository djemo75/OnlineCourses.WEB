import LessonDetails from "./LessonDetails";
import CourseLessonsPlaylist from "./CourseLessonsPlaylist";
import { Grid, Box } from "@mui/material";

const CourseLesson = () => {
  return (
    <Box maxWidth={1080} margin="auto">
      <Grid container>
        <Grid item xs={12} md={8} borderRight="1px solid #efefef">
          <LessonDetails />
        </Grid>
        <Grid item xs={12} md={4}>
          <CourseLessonsPlaylist />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CourseLesson;
