import { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import LoginComponent from "../components/Login";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale ?? "en", [
        "common",
        "login",
      ])),
    },
  };
};

const LoginPage: NextPage = () => {
  return <LoginComponent />;
};

export default LoginPage;
