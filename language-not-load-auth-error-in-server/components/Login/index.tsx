import { FC } from "react";
import { TextInput, Grid, Text, Button, Container } from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons";
import { useTranslation } from "next-i18next";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";

import { useAuth } from "../../contexts";
import { useLoading } from "../../hooks";
import packageJson from "../../package.json";

interface LoginForm {
  email: string;
  password: string;
}

const LoginComponent: FC = () => {
  const { t } = useTranslation(["login", "common"]);
  const { onLogin } = useAuth();
  const { loading, startLoading, stopLoading } = useLoading();
  const form = useForm<LoginForm>({
    initialValues: { email: "admin@worldician.com", password: "12345678" },
    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : t("login:error.email_invalid"),
      password: (value) => (value ? null : t("login:error.password_required")),
    },
  });

  const onSubmitLogin = async ({ email, password }: LoginForm) => {
    startLoading();
    const loggedInResult = await onLogin(email, password);
    if (loggedInResult) {
      showNotification({ message: loggedInResult, color: "red" });
      stopLoading();
    }
  };

  return (
    <Container size="xs" sx={{ height: "100vh" }}>
      <Grid justify="center" align="center" sx={{ height: "100%" }}>
        <Grid.Col xs={11}>
          <form onSubmit={form.onSubmit(onSubmitLogin)}>
            <Text size={40} variant="gradient" weight="bold" align="center">
              {t("login:login_title")}
            </Text>
            <TextInput
              withAsterisk
              size="md"
              my="sm"
              disabled={loading}
              icon={<IconAt size={18} />}
              label={t("common:email")}
              placeholder={t("common:email")}
              {...form.getInputProps("email")}
            />
            <TextInput
              withAsterisk
              type="password"
              size="md"
              disabled={loading}
              icon={<IconLock size={18} />}
              label={t("common:password")}
              placeholder={t("common:password")}
              {...form.getInputProps("password")}
            />
            <Button fullWidth loading={loading} type="submit" mt="lg" size="md">
              {t("common:login")}
            </Button>
            <Text align="center" size="sm" mt="xs">
              © 2023 Woldician, {t("common:version")} {packageJson.version}
            </Text>
          </form>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default LoginComponent;
