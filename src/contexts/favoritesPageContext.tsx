import { OnlineCoursesClient } from "@src/shared/api/services/onlineCourses";
import { CourseResponse } from "@src/shared/api/types/course";
import { CourseLessonResponse } from "@src/shared/api/types/courseLesson";
import { createContext, FC, ReactNode, useContext, useState } from "react";
import { toast } from "react-toastify";

type State = {
  favoriteCourses: CourseResponse[];
  favoriteCourseLessons: CourseLessonResponse[];
};

type FavoritesPageContext = {
  removeFavoriteCourse: (courseId: string) => Promise<void>;
  removeFavoriteCourseLesson: (lessonId: string) => Promise<void>;
} & State;

const initialValues = {
  favoriteCourses: [],
  favoriteCourseLessons: [],
};

export const FavoritesPageContext = createContext<FavoritesPageContext>(
  initialValues as unknown as FavoritesPageContext
);

type ProviderProps = {
  value: State;
  children: ReactNode;
};

export const FavoritesPageProvider: FC<ProviderProps> = ({
  value,
  children,
}) => {
  const [state, setState] = useState<State>(value);

  const removeFavoriteCourse = async (courseId: string) => {
    const client = new OnlineCoursesClient();
    try {
      await client.removeFavorite(courseId);

      setState((prevState) => ({
        ...prevState,
        favoriteCourses: prevState.favoriteCourses.filter(
          (item) => item.id !== courseId
        ),
      }));
    } catch (error) {
      toast.error("An error occurred while removing from favorite list");
    }
  };

  const removeFavoriteCourseLesson = async (lessonId: string) => {
    const client = new OnlineCoursesClient();
    try {
      await client.removeFavorite(lessonId);

      setState((prevState) => ({
        ...prevState,
        favoriteCourseLessons: prevState.favoriteCourseLessons.filter(
          (item) => item.id !== lessonId
        ),
      }));
    } catch (error) {
      toast.error("An error occurred while adding to favorite list");
    }
  };

  return (
    <FavoritesPageContext.Provider
      value={{
        ...state,
        removeFavoriteCourse,
        removeFavoriteCourseLesson,
      }}
    >
      {children}
    </FavoritesPageContext.Provider>
  );
};

export const useFavoritesPageContext = () => useContext(FavoritesPageContext);
