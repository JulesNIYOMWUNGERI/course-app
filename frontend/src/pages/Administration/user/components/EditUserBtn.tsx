import { useState } from "react";
import { MdEdit } from "react-icons/md";

import { UserDialog } from "../../../../components";
import type { User } from "../types";

export default function EditUserBtn({ user }: { user: User }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="action-btn" onClick={() => setOpen(true)}>
        <MdEdit size={20} />
      </button>
      {open && <UserDialog user={user} onClose={() => setOpen(false)} />}
    </>
  );
}
