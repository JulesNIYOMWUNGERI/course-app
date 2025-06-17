import { useState } from "react";
import { MdDelete } from "react-icons/md";

import DeleteCourseDialog from "./DeleteCourseDialog";
import type { Course } from "../../../types";

const DeleteCourseBtn = ({ course }: { course: Course }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="action-btn" onClick={() => setOpen(true)}>
        <MdDelete size={20} />
      </button>
      {open && (
        <DeleteCourseDialog course={course} onClose={() => setOpen(false)} />
      )}
    </>
  );
};

export default DeleteCourseBtn;
