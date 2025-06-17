import { MdDelete } from "react-icons/md";

import { useCourseContext } from "../../../CourseProviderContext";
import type { Participant } from "../../../types";

const DeleteParticipantBtn = ({
  participant,
}: {
  participant: Participant;
}) => {
  const { setParticipants } = useCourseContext();

  const handleDeleteParticipant = () => {
    setParticipants((prevParticipants) =>
      prevParticipants.filter((p) => p.id !== participant.id),
    );
  };

  return (
    <>
      <button className="action-btn" onClick={handleDeleteParticipant}>
        <MdDelete size={20} />
      </button>
    </>
  );
};

export default DeleteParticipantBtn;
