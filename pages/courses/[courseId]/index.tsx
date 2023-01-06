import type { GetServerSideProps, NextPage } from "next";
import AppLayout from "@src/shared/components/AppLayout";
import CoursePage from "@src/components/Course";
import Head from "next/head";
import { APP_NAME } from "@src/shared/components/AppLogo";
import { CourseResponse } from "@src/shared/api/types/course";
import Error from "next/error";
import { CoursePageProvider } from "@src/contexts/coursePageContext";
import { CourseLessonResponse } from "@src/shared/api/types/courseLesson";
import { RatingStatisticResponse } from "@src/shared/api/types/courseStatistic";
import { RatingResponse } from "@src/shared/api/types/rating";
import { OnlineCoursesClient } from "@src/shared/api/services/onlineCourses";
import { NextApiClient } from "@src/shared/api/services/nextApiClient";

type Props = {
  course: CourseResponse;
  courseLessons: CourseLessonResponse[];
  ratingStatistic: RatingStatisticResponse;
  ratings: RatingResponse[];
  hasError: boolean;
};

const Course: NextPage<Props> = ({
  course,
  courseLessons,
  ratingStatistic,
  ratings,
  hasError,
}) => {
  if (hasError) {
    return <Error statusCode={503} />;
  }

  return (
    <AppLayout>
      <Head>
        <title>{`${APP_NAME} - ${course.title}`}</title>
      </Head>

      <CoursePageProvider
        value={{ course, courseLessons, ratingStatistic, ratings }}
      >
        <CoursePage />
      </CoursePageProvider>
    </AppLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const courseId = context.params!.courseId as string;

  const { cookies } = context.req;

  try {
    const nextApiClient = new NextApiClient(cookies.accessToken);
    const backendClient = new OnlineCoursesClient(cookies.accessToken);

    const coursePromise = nextApiClient.getCourse(courseId);
    const courseLessonsPromise = nextApiClient.getCourseLessons(courseId);
    const ratingStatisticPromise = backendClient.getRatingStatistic(courseId);
    const ratingsPromise = backendClient.getRatings(courseId);

    const [
      courseResponse,
      courseLessonsResponse,
      ratingStatisticResponse,
      ratingsResponse,
    ] = await Promise.all([
      coursePromise,
      courseLessonsPromise,
      ratingStatisticPromise,
      ratingsPromise,
    ]);

    return {
      props: {
        course: courseResponse,
        courseLessons: courseLessonsResponse.items,
        ratingStatistic: ratingStatisticResponse,
        ratings: ratingsResponse,
        hasError: false,
      },
    };
  } catch (err) {
    return { props: { hasError: true } };
  }
};

export default Course;
