import { CourseLessonResponse } from "@src/shared/api/types/courseLesson";
import { createContext, FC, ReactNode, useContext, useState } from "react";

type State = {
  courseLessons: CourseLessonResponse[];
  currentLesson: CourseLessonResponse | null;
};

type CourseLessonPageContext = {
  changeFavoriteCourseLesson: (favoriteValue: boolean) => void;
} & State;

const initialValues = {
  courseLessons: [],
  currentLesson: null,
};

export const CourseLessonPageContext = createContext<CourseLessonPageContext>(
  initialValues as unknown as CourseLessonPageContext
);

type ProviderProps = {
  value: CourseLessonPageContext;
  children: ReactNode;
};

export const CourseLessonPageProvider: FC<ProviderProps> = ({
  value,
  children,
}) => {
  const [state, setState] = useState<State>(value);

  const changeFavoriteCourseLesson = (favoriteValue: boolean) => {
    setState((prevState) => ({
      ...prevState,
      currentLesson: prevState.currentLesson
        ? { ...prevState.currentLesson, favorite: favoriteValue }
        : null,
    }));
  };

  return (
    <CourseLessonPageContext.Provider
      value={{ ...state, changeFavoriteCourseLesson }}
    >
      {children}
    </CourseLessonPageContext.Provider>
  );
};

export const useCourseLessonPageContext = () =>
  useContext(CourseLessonPageContext);
