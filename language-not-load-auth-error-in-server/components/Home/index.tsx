import { FC } from "react";
import { useRouter } from "next/router";
import { Table, Group, Button } from "@mantine/core";
import { useTranslation } from "next-i18next";

const elements = [
  { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
  { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
  { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
  { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
  { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
];

const HomeComponent: FC = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation("home");

  const onChangeLanguage = (locale: "en" | "th") => {
    router.push(router.pathname, router.asPath, { locale });
    i18n.changeLanguage(locale);
  };

  const rows = elements.map((element) => (
    <tr key={element.name}>
      <td>{element.position}</td>
      <td>{element.name}</td>
      <td>{element.symbol}</td>
      <td>{element.mass}</td>
    </tr>
  ));

  return (
    <>
      <Group spacing={0}>
        <Button size='xs' variant="outline" onClick={() => onChangeLanguage('th')}>TH</Button>
        <Button size='xs' variant="outline" onClick={() => onChangeLanguage('en')}>EN</Button>
      </Group>

      <Table>
        <thead>
          <tr>
            <th>{t("position")}</th>
            <th>{t("name")}</th>
            <th>{t("symbol")}</th>
            <th>{t("atomic_maxx")}</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
};

export default HomeComponent;
