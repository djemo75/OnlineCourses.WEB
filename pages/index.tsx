import type { NextPage } from "next";
import Head from "next/head";
import AppLayout from "@src/shared/components/AppLayout";
import { APP_NAME } from "@src/shared/components/AppLogo";
import HomePage from "@src/components/HomePage";

const Home: NextPage = () => {
  return (
    <AppLayout noPadding>
      <Head>
        <title>{`${APP_NAME} - Home`}</title>
      </Head>

      <HomePage />
    </AppLayout>
  );
};

export default Home;
