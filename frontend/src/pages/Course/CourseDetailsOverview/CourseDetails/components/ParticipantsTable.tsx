import { useMemo } from "react";

import ParticipantRowActions from "./ParticipantRowActions";
import { Table } from "../../../../../components";
import type { Column } from "../../../../../components/Table/types";
import { useLanguage } from "../../../../../contexts/LanguageProviderContext";
import type { Participant } from "../../../types";

const ParticipantsTable = ({
  participants,
}: {
  participants: Participant[];
}) => {
  const { t } = useLanguage();
  const courseTableColumns: Column<Participant>[] = useMemo(
    () => [
      { key: "name", header: t("participants"), render: (row) => row.name },
      {
        key: "actions",
        header: "",
        render: (participant) => (
          <ParticipantRowActions participant={participant} />
        ),
      },
    ],
    [t],
  );
  return (
    <Table
      data={participants}
      columns={courseTableColumns}
      emptyMessage={t("looksLikeThereAreNoParticipantYet")}
      showPagination={false}
    />
  );
};

export default ParticipantsTable;
