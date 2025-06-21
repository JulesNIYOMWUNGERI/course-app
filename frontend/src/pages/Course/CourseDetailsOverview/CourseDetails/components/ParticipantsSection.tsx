import React, {useMemo, useState} from "react";
import {IoMdAdd} from "react-icons/io";

import ParticipantsTable from "./ParticipantsTable";
import {useLanguage} from "../../../../../contexts/LanguageProviderContext";
import {useUserContext} from "../../../../../contexts/UserProviderContext";
import type {User} from "../../../../Administration/user/types";
import Dropdown from "../../../components/Dropdown/Dropdown";
import {useCourseDetailsContext} from "../CourseDetailsProvider";
import {useToast} from "../../../../../contexts/ToastProvider.tsx";
import {CourseApi} from "../../../../../api/CoursesApi.tsx";
import {FaSpinner} from "react-icons/fa";

const ParticipantsSection = () => {
    const {users} = useUserContext();
    const {t} = useLanguage();
    const {currentCourseDetails, participants, fetchSingleCourse} = useCourseDetailsContext();
    const [loading, setLoading] = useState(false);
    const {showToast} = useToast();

    const [newParticipant, setNewParticipant] = useState("");

    const currentCourseParticipants = useMemo(() => {
        return participants.filter(
            (participant) => participant.courseId === currentCourseDetails?.id,
        );
    }, [participants, currentCourseDetails]);

    const participantOptions = useMemo(() => {
        return users
            .filter(
                (user: User) =>
                    !currentCourseParticipants.some((p) => p.userId === user.id),
            )
            .map((user: User) => ({
                label: `${user.firstName} ${user.lastName}`,
                value: JSON.stringify({
                    id: user.id,
                    name: `${user.firstName} ${user.lastName}`,
                }),
            }));
    }, [users, currentCourseParticipants]);

    const handleAddParticipant = async () => {
        const parsedParticipant = JSON.parse(newParticipant);
        if (!currentCourseDetails?.id) {
            showToast(t("invalidCourseId"), "error");
            return;
        }
        await CourseApi.addCourseParticipant(currentCourseDetails.id, parsedParticipant.id, setLoading, showToast);
        await fetchSingleCourse(currentCourseDetails?.id);
        setNewParticipant("");
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
        setNewParticipant(e.target.value);

    return (
        <section className="info-card">
            <h3 className="card-title">{t("participants")}</h3>

            <div className="participants-container">
                <ParticipantsTable participants={currentCourseParticipants}/>
                <div className="add-item-container">
                    <Dropdown
                        options={participantOptions}
                        value={newParticipant}
                        onChange={handleSelectChange}
                        placeholder={t("newParticipant")}
                    />
                    <button className="add-button" onClick={handleAddParticipant}>
                        {loading ? (
                            <FaSpinner className="spinner" size={18}/>
                        ) : (
                            <>
                                <IoMdAdd size={18}/>
                                {t("add")}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ParticipantsSection;
