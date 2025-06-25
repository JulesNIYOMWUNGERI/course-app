import {useCallback, useMemo, useState} from "react";
import { useLanguage } from "../../../../../contexts/LanguageProviderContext";
import type {ActionButton, Participant} from "../../../types";
import ItemList from "../../../components/ItemList/ItemList.tsx";
import {MdDelete} from "react-icons/md";
import {CourseApi} from "../../../../../api/CoursesApi.tsx";
import {useToast} from "../../../../../contexts/ToastProvider.tsx";
import {useCourseDetailsContext} from "../CourseDetailsProvider.tsx";
import {FaSpinner} from "react-icons/fa";

const ParticipantsTable = ({
  participants,
}: {
  participants: Participant[];
}) => {
  const { t } = useLanguage();
  const {fetchSingleCourse} = useCourseDetailsContext();
  const {showToast} = useToast();
  const [loading, setLoading] = useState(false);

  const handleDeleteParticipant = useCallback(async (participant: Participant) => {
    await CourseApi.removeCourseParticipant(participant.id, setLoading, showToast);
    await fetchSingleCourse(participant.courseId);
    showToast(t("participantRemoved"), "success");
  }, []);

  const participantActions: ActionButton<Participant>[] = useMemo(() => [
    {
      icon: (loading ? (
          <FaSpinner size={20} className="spinner"/>
      ) : (
          <MdDelete size={20}/>
      )),
      label: 'Delete',
      onClick: (row) => handleDeleteParticipant(row),
      variant: 'danger'
    }
  ], []);

  return (
    <ItemList
        sectionTitle="Participants"
        items={participants}
        actions={participantActions}
        emptyMessage={t("looksLikeThereAreNoParticipantYet")}
    />
  );
};

export default ParticipantsTable;
