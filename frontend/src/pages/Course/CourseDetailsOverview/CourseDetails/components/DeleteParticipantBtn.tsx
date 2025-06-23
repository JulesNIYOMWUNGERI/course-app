import {MdDelete} from "react-icons/md";

import type {Participant} from "../../../types";
import {CourseApi} from "../../../../../api/CoursesApi.tsx";
import {useToast} from "../../../../../contexts/ToastProvider.tsx";
import {FaSpinner} from "react-icons/fa";
import {useCallback, useState} from "react";
import {useCourseDetailsContext} from "../CourseDetailsProvider.tsx";
import {useLanguage} from "../../../../../contexts/LanguageProviderContext.tsx";

const DeleteParticipantBtn = ({participant}: {
    participant: Participant;
}) => {
    const {fetchSingleCourse} = useCourseDetailsContext();
    const {showToast} = useToast();
    const [loading, setLoading] = useState(false);
    const {t} = useLanguage();

    const handleDeleteParticipant = useCallback(async () => {
        await CourseApi.removeCourseParticipant(participant.id, setLoading, showToast);
        await fetchSingleCourse(participant.courseId);
        showToast(t("participantRemoved"), "success");
    }, []);

    return (
        <button className="action-btn" onClick={handleDeleteParticipant}>
            {loading ? (
                <FaSpinner size={20} className="animate-spin"/>
            ) : (
                <MdDelete size={20}/>
            )}
        </button>
    );
};

export default DeleteParticipantBtn;
