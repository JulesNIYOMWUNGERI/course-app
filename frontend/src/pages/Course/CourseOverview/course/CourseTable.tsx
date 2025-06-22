import {useMemo} from "react";

import CourseRowActions from "./components/CourseRowActions";
import {Table} from "../../../../components";
import type {Column} from "../../../../components/Table/types";
import {useLanguage} from "../../../../contexts/LanguageProviderContext";
import {useUserContext} from "../../../../contexts/UserProviderContext";
import {useCourseContext} from "../../CourseProviderContext";
import type {Course, Participant} from "../../types";

interface CourseTableProps {
    showAllCourses: boolean;
}

const CourseTable = ({showAllCourses}: CourseTableProps) => {
    let {t} = useLanguage();
    const {courseData, participants} = useCourseContext();
    const {selectedUserId} = useUserContext();

    const currentUserCourses = useMemo(() => {
        return courseData.filter((course) =>
            participants.some(
                (participant: Participant) =>
                    participant.courseId === course.id &&
                    participant.userId === selectedUserId,
            ),
        );
    }, [selectedUserId, courseData, participants]);

    const courseTableColumns: Column<Course>[] = useMemo(
        () => [
            {key: "name", header: t("courseName"), render: (row) => row.name},
            {
                key: "classification",
                header: t("courseClassification"),
                render: (row) => row.classification,
            },
            {
                key: "department",
                header: t("courseDepartment"),
                render: (row) => row.department,
            },
            {
                key: "participantGroups",
                header: t("courseParticipantGroup"),
                render: (row) => row.participantsGroup.join(", "),
            },
            {
                key: "numberOfParticipants",
                header: t("numberOfParticipants"),
                render: (row) => row.numberOfParticipants,
            },
            {
                key: "actions",
                header: "",
                render: (course) => <CourseRowActions course={course}/>,
            },
        ],
        [t],
    );

    return (
        <Table
            data={showAllCourses ? courseData : currentUserCourses}
            columns={courseTableColumns}
            emptyMessage={
                showAllCourses
                    ? "No courses found yet - please create one."
                    : "No courses found for the current user."
            }
        />
    );
};

export default CourseTable;
