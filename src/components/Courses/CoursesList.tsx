import {
  Grid,
  Typography,
  CircularProgress,
  LinearProgress,
  Box,
} from "@mui/material";
import { FC } from "react";
import { CourseResponse } from "../../shared/api/types/course";
import ScreenLoading from "../../shared/components/ScreenLoading";
import CoursesListItem from "./CoursesListItem";

type Props = {
  courses: CourseResponse[];
  loading: boolean;
  total: number;
  changeFavoriteCourse: (courseId: string, favoriteValue: boolean) => void;
};

const CoursesList: FC<Props> = ({ courses, loading, changeFavoriteCourse }) => {
  return (
    <>
      {loading && <ScreenLoading />}
      <Typography variant="h4" gutterBottom>
        Collections
      </Typography>
      <Grid container spacing={2} mt={1}>
        {courses.length === 0 && (
          <Grid item xs={12}>
            <Box textAlign="center">No data</Box>
          </Grid>
        )}
        {courses.map((course) => (
          <Grid key={course.id} item xs={12} sm={6} md={4} lg={3}>
            <CoursesListItem
              course={course}
              changeFavoriteCourse={changeFavoriteCourse}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default CoursesList;
