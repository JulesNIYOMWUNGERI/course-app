import { memo } from "react";

import DeleteCourseBtn from "./DeleteCourseBtn";
import OpenCourseBtn from "./OpenCourseBtn";
import type { Course } from "../../../types";

export default memo(({ course }: { course: Course }) => {
  return (
    <div className="action-buttons">
      <OpenCourseBtn course={course} />
      <DeleteCourseBtn course={course} />
    </div>
  );
});
