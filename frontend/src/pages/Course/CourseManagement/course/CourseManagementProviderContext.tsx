import {
  createContext,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  useContext,
  useMemo,
  useState,
  useEffect
} from "react";

import { useCourseContext } from "../../CourseProviderContext";
import type { Option } from "../../types";

interface CourseManagementContextType {
  courseNameOptions: Option[];
  courseNameFilter: string;
  setCourseNameFilter: Dispatch<SetStateAction<string>>;
  courseDepartmentFilter: string;
  setCourseDepartmentFilter: Dispatch<SetStateAction<string>>;
  courseClassificationFilter: string;
  setCourseClassificationFilter: Dispatch<SetStateAction<string>>;
  clearFilter: () => void;
}

const CourseManagementContext = createContext<
  CourseManagementContextType | undefined
>(undefined);

export const CourseManagementProvider = ({ children }: PropsWithChildren) => {
  // Get context with more defensive coding
  const context = useCourseContext();
  const courseData = context?.courseData || [];
  
  const [courseNameFilter, setCourseNameFilter] = useState<string>("");
  const [courseDepartmentFilter, setCourseDepartmentFilter] =
    useState<string>("");
  const [courseClassificationFilter, setCourseClassificationFilter] =
    useState<string>("");
  
  // Use state for course options to avoid direct filtering in useMemo
  const [courseNameOptions, setCourseNameOptions] = useState<Option[]>([]);
  
  // Move the filtering logic to useEffect to handle courseData changes safely
  useEffect(() => {
    // Safeguard against courseData not being an array
    if (!Array.isArray(courseData)) {
      setCourseNameOptions([]);
      return;
    }
    
    try {
      const filtered = courseData.filter((course) => {
        const matchesDept =
          courseDepartmentFilter && courseDepartmentFilter !== "all"
            ? course.department === courseDepartmentFilter
            : true;
        const matchesClass =
          courseClassificationFilter && courseClassificationFilter !== "all"
            ? course.classification === courseClassificationFilter
            : true;

        return matchesDept && matchesClass;
      });

      const options = filtered.map((course) => ({
        value: course.id,
        label: course.name,
      }));
      
      setCourseNameOptions(options);
    } catch (error) {
      console.error("Error filtering course data:", error);
      setCourseNameOptions([]);
    }
  }, [courseData, courseDepartmentFilter, courseClassificationFilter]);

  const clearFilter = () => {
    setCourseNameFilter("");
    setCourseDepartmentFilter("");
    setCourseClassificationFilter("");
  };

  const contextValue = useMemo(
    () => ({
      courseNameOptions,
      courseNameFilter,
      setCourseNameFilter,
      courseDepartmentFilter,
      setCourseDepartmentFilter,
      courseClassificationFilter,
      setCourseClassificationFilter,
      clearFilter,
    }),
    [
      courseNameOptions,
      courseNameFilter,
      courseDepartmentFilter,
      courseClassificationFilter,
    ],
  );

  return (
    <CourseManagementContext.Provider value={contextValue}>
      {children}
    </CourseManagementContext.Provider>
  );
};

export const useCourseManagementContext = () => {
  const context = useContext(CourseManagementContext);
  if (!context) {
    throw new Error(
      "useCourseManagementContext must be used within a CourseManagementProvider",
    );
  }
  return context;
};
