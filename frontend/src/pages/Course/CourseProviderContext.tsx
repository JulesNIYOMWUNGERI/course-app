import {
  createContext,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  COURSES_STORAGE_KEY,
  defaultCourseData,
  PARTICIPANT_STORE,
} from "./constants";
import type { Course, Participant } from "./types";

interface CourseManagementContextType {
  courseData: Course[];
  setCourseData: Dispatch<SetStateAction<Course[]>>;
  participants: Participant[];
  setParticipants: Dispatch<SetStateAction<Participant[]>>;
}

const CourseContext = createContext<CourseManagementContextType | undefined>(
  undefined,
);

export const CourseProviderContext = ({ children }: PropsWithChildren) => {
  const [courseData, setCourseData] = useState<Course[]>(() => {
    const storedCourses = localStorage.getItem(COURSES_STORAGE_KEY);
    return storedCourses ? JSON.parse(storedCourses) : defaultCourseData;
  });
  const [participants, setParticipants] = useState<Participant[]>(() => {
    const storedParticipants = localStorage.getItem(PARTICIPANT_STORE);
    return storedParticipants ? JSON.parse(storedParticipants) : [];
  });

  useEffect(() => {
    localStorage.setItem(PARTICIPANT_STORE, JSON.stringify(participants));
  }, [participants]);

  useEffect(() => {
    localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(courseData));
  }, [courseData]);

  const contextValue = useMemo(
    () => ({
      courseData,
      setCourseData,
      participants,
      setParticipants,
    }),
    [courseData, participants],
  );

  return (
    <CourseContext.Provider value={contextValue}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourseContext = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error(
      "useCourseContext must be used within a CourseProviderContext",
    );
  }
  return context;
};
