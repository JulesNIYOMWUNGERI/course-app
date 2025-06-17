import { memo } from "react";

import DeleteParticipantBtn from "./DeleteParticipantBtn";
import type { Participant } from "../../../types";

export default memo(({ participant }: { participant: Participant }) => {
  return (
    <>
      <div className="action-buttons">
        <DeleteParticipantBtn participant={participant} />
      </div>
    </>
  );
});
