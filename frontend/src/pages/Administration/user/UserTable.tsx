import "./user.css";

import { useMemo } from "react";

import CreateUserBtn from "./components/CreateUserBtn";
import UserRowActions from "./components/UserRowActions";
import type { User } from "./types";
import { Table } from "../../../components";
import type { Column } from "../../../components/Table/types";
import { useLanguage } from "../../../contexts/LanguageProviderContext";
import { useUserContext } from "../../../contexts/UserProviderContext";

export default function UserTable() {
  const { users, loading } = useUserContext();
  let { t } = useLanguage();
  const userTableColumns: Column<User>[] = useMemo(
    () => [
      { key: "id", header: t("userId"), render: (row) => row.id },
      {
        key: "firstName",
        header: t("firstName"),
        render: (row) => row.firstName,
      },
      { key: "lastName", header: t("lastName"), render: (row) => row.lastName },
      {
        key: "actions",
        header: <CreateUserBtn />,
        render: (user) => <UserRowActions user={user} />,
      },
    ],
    [t],
  );

  return (
    <Table
      data={users}
      columns={userTableColumns}
      isLoading={loading}
      emptyMessage="Looks like there are no users yet."
    />
  );
}
