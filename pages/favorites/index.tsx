import type { GetServerSideProps, NextPage } from "next";
import AppLayout from "@src/shared/components/AppLayout";
import FavoritesPage from "@src/components/Favorites";
import Head from "next/head";
import { APP_NAME } from "@src/shared/components/AppLogo";
import { CourseResponse } from "@src/shared/api/types/course";
import Error from "next/error";
import { CourseLessonResponse } from "@src/shared/api/types/courseLesson";
import { NextApiClient } from "@src/shared/api/services/nextApiClient";
import { FavoritesPageProvider } from "@src/contexts/favoritesPageContext";
import { ROUTES } from "@src/constants/routes";

type Props = {
  favoriteCourses: CourseResponse[];
  favoriteCourseLessons: CourseLessonResponse[];
  hasError: boolean;
};

const Course: NextPage<Props> = ({
  favoriteCourses,
  favoriteCourseLessons,
  hasError,
}) => {
  if (hasError) {
    return <Error statusCode={503} />;
  }

  return (
    <AppLayout>
      <Head>
        <title>{`${APP_NAME} - Favorites`}</title>
      </Head>

      <FavoritesPageProvider value={{ favoriteCourses, favoriteCourseLessons }}>
        <FavoritesPage />
      </FavoritesPageProvider>
    </AppLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { cookies } = context.req;

  if (!cookies.accessToken) {
    return {
      redirect: {
        permanent: false,
        destination: ROUTES.home,
      },
    };
  }

  try {
    const nextApiClient = new NextApiClient(cookies.accessToken);

    const favoriteCoursesPromise = nextApiClient.getFavoriteCourses();
    const favoriteCourseLessonsPromise =
      nextApiClient.getFavoriteCourseLessons();

    const [favoriteCoursesResponse, favoriteCourseLessonsResponse] =
      await Promise.all([favoriteCoursesPromise, favoriteCourseLessonsPromise]);

    return {
      props: {
        favoriteCourses: favoriteCoursesResponse,
        favoriteCourseLessons: favoriteCourseLessonsResponse,
        hasError: false,
      },
    };
  } catch (err) {
    return { props: { hasError: true } };
  }
};

export default Course;
