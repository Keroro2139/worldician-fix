import { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import HomeComponent from "../components/Home";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale ?? "en", [
        "common",
        "home",
      ])),
    },
  };
};

const IndexPage: NextPage = () => {
  return <HomeComponent />;
};

export default IndexPage;
