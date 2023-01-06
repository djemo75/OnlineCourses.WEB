import type { NextPage } from "next";
import AppLayout from "../../src/shared/components/AppLayout";
import CoursesPage from "../../src/components/Courses";
import Head from "next/head";
import { APP_NAME } from "../../src/shared/components/AppLogo";

const Courses: NextPage = () => {
  return (
    <AppLayout>
      <Head>
        <title>{`${APP_NAME} - Courses`}</title>
      </Head>

      <CoursesPage />
    </AppLayout>
  );
};

export default Courses;
