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
    PARTICIPANT_STORE,
} from "./constants";
import type {Course, Participant} from "./types";
import {useToast} from "../../contexts/ToastProvider.tsx";
import {CourseApi} from "../../api/CoursesApi.tsx";

interface CourseManagementContextType {
    courseData: Course[];
    setCourseData: Dispatch<SetStateAction<Course[]>>;
    participants: Participant[];
    setParticipants: Dispatch<SetStateAction<Participant[]>>;
    loading: boolean;
    fetchCourses: () => Promise<void>;
}

const CourseContext = createContext<CourseManagementContextType | undefined>(
    undefined,
);

export const CourseProviderContext = ({children}: PropsWithChildren) => {
    const {showToast} = useToast();
    const [loading, setLoading] = useState(true);
    const [courseData, setCourseData] = useState<Course[]>([]);
    const [participants, setParticipants] = useState<Participant[]>(() => {
        const storedParticipants = localStorage.getItem(PARTICIPANT_STORE);
        return storedParticipants ? JSON.parse(storedParticipants) : [];
    });

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const data = await CourseApi.fetchAllCourses();
            setCourseData(data);
        } catch (error) {
            showToast("Failed to fetch courses", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);


    useEffect(() => {
        localStorage.setItem(PARTICIPANT_STORE, JSON.stringify(participants));
    }, [participants]);

    const contextValue = useMemo(
        () => ({
            courseData,
            setCourseData,
            participants,
            setParticipants,
            loading,
            fetchCourses,
        }),
        [courseData, participants, loading],
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
