import { useState } from "react";
import { MdDelete } from "react-icons/md";

import { DeleteDialog } from "../../../../components";
import type { User } from "../types";

export default function DeleteUserBtn({ user }: { user: User }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="action-btn" onClick={() => setOpen(true)}>
        <MdDelete size={20} />
      </button>
      {open && <DeleteDialog user={user} onClose={() => setOpen(false)} />}
    </>
  );
}
