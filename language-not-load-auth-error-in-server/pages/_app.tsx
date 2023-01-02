import App, { AppProps, AppContext } from "next/app";
import Head from "next/head";
import { appWithTranslation } from "next-i18next";
import { MantineProvider } from "@mantine/core";
import "dayjs/locale/th";

import { GetCurrentUserService } from "../services/user.service/get-current-user";
import { CookieUtil } from "../utils/cookie.util";
import { AuthProvider } from "../contexts";
import { RouterTransition } from "../components/RouterTransition";

function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Worldician</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "light",
          defaultGradient: { from: "violet", to: "pink", deg: 45 },
          primaryColor: "violet",
          datesLocale: "th",
          primaryShade: 6,
          defaultRadius: "sm",
        }}
      >
        <RouterTransition />
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </MantineProvider>
    </>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const { res, req, pathname } = appContext.ctx;

  if (res) {
    try {
      const cookies = CookieUtil.toMap(req?.headers.cookie);
      if (!cookies.has(CookieUtil.ACCESS_TOKEN) && pathname !== "/login") {
        res.writeHead(302, { Location: "/login" });
        res.end();

        return { ...appProps };
      }

      const getUser = new GetCurrentUserService();
      await getUser.request(cookies.get(CookieUtil.ACCESS_TOKEN));

      if (pathname === "/login") {
        res.writeHead(302, { Location: "/" });
        res.end();
      }
    } catch (error) {
      if (pathname !== "/login") {
        res.writeHead(302, { Location: "/login" });
        res.end();
      }
    }
  }

  return { ...appProps };
};

export default appWithTranslation(MyApp);
