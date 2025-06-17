import { useMemo, useState } from "react";
import { IoMdAdd } from "react-icons/io";

import ParticipantsTable from "./ParticipantsTable";
import { useLanguage } from "../../../../../contexts/LanguageProviderContext";
import { useUserContext } from "../../../../../contexts/UserProviderContext";
import type { User } from "../../../../Administration/user/types";
import Dropdown from "../../../components/Dropdown/Dropdown";
import { useCourseContext } from "../../../CourseProviderContext";
import { useCourseDetailsContext } from "../CourseDetailsProvider";

const ParticipantsSection = () => {
  const { users } = useUserContext();
  const { t } = useLanguage();
  const { currentCourseDetails } = useCourseDetailsContext();
  const { participants, setParticipants } = useCourseContext();

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

  const handleAddParticipant = () => {
    const parsedParticipant = JSON.parse(newParticipant);
    setParticipants((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        userId: parsedParticipant.id,
        name: parsedParticipant.name,
        courseId: currentCourseDetails?.id ?? "",
      },
    ]);

    setNewParticipant("");
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setNewParticipant(e.target.value);

  return (
    <section className="info-card">
      <h3 className="card-title">{t("participants")}</h3>

      <div className="participants-container">
        <ParticipantsTable participants={currentCourseParticipants} />
        <div className="add-item-container">
          <Dropdown
            options={participantOptions}
            value={newParticipant}
            onChange={handleSelectChange}
            placeholder={t("newParticipant")}
          />
          <button className="add-button" onClick={handleAddParticipant}>
            <IoMdAdd size={18} />
            {t("add")}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ParticipantsSection;
