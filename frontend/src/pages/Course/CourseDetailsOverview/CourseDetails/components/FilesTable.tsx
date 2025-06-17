import { useMemo } from "react";
import type { FileType } from "../types";
import { useLanguage } from "../../../../../contexts/LanguageProviderContext";
import type { Column } from "../../../../../components/Table/types";
import { Table } from "../../../../../components";
import FileRowActions from "./FileRowActions";

const FilesTable = ({ courseFiles }: { courseFiles: FileType[] }) => {
    const { t } = useLanguage();
    const courseTableColumns: Column<FileType>[] = useMemo(
        () => [
            { key: "name", header: t("files"), render: (row) => row.name },
            {
                key: "actions",
                header: "",
                render: (file) => <FileRowActions file={file} />,
            },
        ],
        [t]
    );

    return (
        <Table
            data={courseFiles}
            columns={courseTableColumns}
            emptyMessage="Looks like there are no files yet."
            showPagination={false}
        />
    );
};

export default FilesTable;
