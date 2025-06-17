import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import type { Course } from "../../../types";

const OpenCourseBtn = ({ course }: { course: Course }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/course/details/${course.id}`);
  };

  return (
    <button onClick={handleNavigation} className="action-btn">
      <IoMdSearch size={20} />
    </button>
  );
};

export default OpenCourseBtn;
