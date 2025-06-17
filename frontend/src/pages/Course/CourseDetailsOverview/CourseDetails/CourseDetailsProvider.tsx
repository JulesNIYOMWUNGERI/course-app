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
import { FILE_STORE, PARTICIPANT_STORE } from "./constants";
import type { FileType, Participant } from "./types";
import { useParams } from "react-router-dom";
import { useCourseContext } from "../../CourseProviderContext";
import type { Course } from "../../types";

interface CourseDetailsContextType {
  participants: Participant[];
  setParticipants: Dispatch<SetStateAction<Participant[]>>;
  courseFiles: FileType[];
  setCourseFiles: Dispatch<SetStateAction<FileType[]>>;
  currentCourseDetails: Course | null;
}

const CourseDetailsContext = createContext<
    CourseDetailsContextType | undefined
>(undefined);

export const CourseDetailsProviderContext = ({
                                               children,
                                             }: PropsWithChildren) => {
  const { courseData } = useCourseContext();
  const { id } = useParams<{ id: string }>();
  const [participants, setParticipants] = useState<Participant[]>(() => {
    const storedParticipants = localStorage.getItem(PARTICIPANT_STORE);
    return storedParticipants ? JSON.parse(storedParticipants) : [];
  });
  const [courseFiles, setCourseFiles] = useState<FileType[]>(() => {
    const storedFiles = localStorage.getItem(FILE_STORE);
    return storedFiles ? JSON.parse(storedFiles) : [];
  });

  const [currentCourseDetails] = useState<Course | null>(() => {
    return courseData.find((course) => course?.id === id) || null;
  });

  useEffect(() => {
    localStorage.setItem(PARTICIPANT_STORE, JSON.stringify(participants));
  }, [participants]);

  const contextValue = useMemo(
      () => ({
        participants,
        setParticipants,
        courseFiles,
        setCourseFiles,
        currentCourseDetails
      }),
      [participants, courseFiles]
  );

  useEffect(() => {
    localStorage.setItem(FILE_STORE, JSON.stringify(courseFiles));
  }, [courseFiles]);

  return (
      <CourseDetailsContext.Provider value={contextValue}>
        {children}
      </CourseDetailsContext.Provider>
  );
};

export const useCourseDetailsContext = () => {
  const context = useContext(CourseDetailsContext);
  if (!context) {
    throw new Error(
        "useCourseDetailsContext must be used within a CourseDetailsProviderContext"
    );
  }
  return context;
};
