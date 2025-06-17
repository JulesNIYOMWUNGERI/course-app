import { memo } from "react";

import type { User } from "../types";
import DeleteUserBtn from "./DeleteUserBtn";
import EditUserBtn from "./EditUserBtn";

export default memo(({ user }: { user: User }) => {
  return (
    <>
      <div className="action-buttons">
        <EditUserBtn user={user} />
        <DeleteUserBtn user={user} />
      </div>
    </>
  );
});
