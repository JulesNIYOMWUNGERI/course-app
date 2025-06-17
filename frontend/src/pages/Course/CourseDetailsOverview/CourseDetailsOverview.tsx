import "./CourseDetailsOverview.css";

import CourseDetails from "./CourseDetails/CourseDetails";
import { CourseDetailsProviderContext } from "./CourseDetails/CourseDetailsProvider";

const CourseDetailsOverview = () => {
  return (
    <main className="course-details-overview">
      <CourseDetailsProviderContext>
        <CourseDetails />
      </CourseDetailsProviderContext>
    </main>
  );
};

export default CourseDetailsOverview;
