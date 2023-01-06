import type { GetServerSideProps, NextPage } from "next";
import AppLayout from "@src/shared/components/AppLayout";
import CourseLessonPage from "@src/components/CourseLesson";
import Head from "next/head";
import { APP_NAME } from "@src/shared/components/AppLogo";
import Error from "next/error";
import { CourseLessonResponse } from "@src/shared/api/types/courseLesson";
import { CourseLessonPageProvider } from "@src/contexts/courseLessonPageContext";
import { NextApiClient } from "@src/shared/api/services/nextApiClient";

type Props = {
  courseLessons: CourseLessonResponse[];
  currentLesson: CourseLessonResponse;
  hasError: boolean;
};

const CourseLesson: NextPage<Props> = ({
  courseLessons,
  currentLesson,
  hasError,
}) => {
  if (hasError) {
    return <Error statusCode={503} />;
  }

  return (
    <AppLayout>
      <Head>
        <title>{`${APP_NAME} - ${currentLesson.title}`}</title>
      </Head>

      <CourseLessonPageProvider value={{ courseLessons, currentLesson }}>
        <CourseLessonPage />
      </CourseLessonPageProvider>
    </AppLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const courseId = context.params!.courseId as string;
  const lessonId = context.params!.lessonId as string;

  const { cookies } = context.req;

  try {
    const nextApiClient = new NextApiClient(cookies.accessToken || "");

    const courseLessonsPromise = nextApiClient.getCourseLessons(courseId);

    const [courseLessonsResponse] = await Promise.all([courseLessonsPromise]);

    return {
      props: {
        courseLessons: courseLessonsResponse.items,
        currentLesson: courseLessonsResponse.items.find(
          (l: CourseLessonResponse) => l.id === lessonId
        )!,
        hasError: false,
      },
    };
  } catch (err) {
    return { props: { hasError: true } };
  }
};

export default CourseLesson;
