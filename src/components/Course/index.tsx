import { Box } from "@mui/material";
import CustomTabs from "@src/shared/components/CustomTabs";
import { motion } from "framer-motion";
import CourseDetails from "./CourseDetails";
import CourseLessons from "./CourseLessons";
import CourseRatings from "./CourseRatings";
import CourseRatingStatistic from "./CourseRatingStatistic";

const animateCotainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Course = () => {
  return (
    <motion.div variants={animateCotainer} initial="initial" animate="animate">
      <Box maxWidth={1080} margin="auto">
        <CourseDetails />

        <Box mt={4}>
          <CustomTabs
            tabs={[
              { label: "Course Content", content: <CourseLessons /> },
              {
                label: "Customer Reviews",
                content: (
                  <>
                    <CourseRatingStatistic />
                    <CourseRatings />
                  </>
                ),
              },
            ]}
          />
        </Box>
      </Box>
    </motion.div>
  );
};

export default Course;
