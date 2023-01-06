import { OnlineCoursesClient } from "@src/shared/api/services/onlineCourses";
import { CourseResponse } from "@src/shared/api/types/course";
import { CourseLessonResponse } from "@src/shared/api/types/courseLesson";
import { RatingStatisticResponse } from "@src/shared/api/types/courseStatistic";
import { RatingResponse } from "@src/shared/api/types/rating";
import { createContext, FC, ReactNode, useContext, useState } from "react";

type State = {
  course: CourseResponse;
  courseLessons: CourseLessonResponse[];
  ratingStatistic: RatingStatisticResponse;
  ratings: RatingResponse[];
};

type CoursePageContext = {
  changeFavoriteCourse: (favoriteValue: boolean) => void;
  fetchRatings: () => Promise<void>;
  fetchRatingStatistic: () => Promise<void>;
} & State;

const initialValues = {
  course: null,
  courseLessons: [],
  ratings: [],
};

export const CoursePageContext = createContext<CoursePageContext>(
  initialValues as unknown as CoursePageContext
);

type ProviderProps = {
  value: State;
  children: ReactNode;
};

export const CoursePageProvider: FC<ProviderProps> = ({ value, children }) => {
  const [state, setState] = useState<State>(value);

  const changeFavoriteCourse = (favoriteValue: boolean) => {
    setState((prevState) => ({
      ...prevState,
      course: { ...prevState.course, favorite: favoriteValue },
    }));
  };

  const fetchRatings = async () => {
    const client = new OnlineCoursesClient();
    const ratings = await client.getRatings(state.course.id);
    setState((prevState) => ({ ...prevState, ratings }));
  };

  const fetchRatingStatistic = async () => {
    const client = new OnlineCoursesClient();
    const ratingStatistic = await client.getRatingStatistic(state.course.id);
    setState((prevState) => ({ ...prevState, ratingStatistic }));
  };

  return (
    <CoursePageContext.Provider
      value={{
        ...state,
        changeFavoriteCourse,
        fetchRatings,
        fetchRatingStatistic,
      }}
    >
      {children}
    </CoursePageContext.Provider>
  );
};

export const useCoursePageContext = () => useContext(CoursePageContext);
