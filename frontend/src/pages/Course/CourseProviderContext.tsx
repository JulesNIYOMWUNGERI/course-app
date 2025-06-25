import {
    createContext,
    type Dispatch,
    type PropsWithChildren,
    type SetStateAction, useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import type {Course, Participant} from "./types";
import {useToast} from "../../contexts/ToastProvider.tsx";
import {CourseApi} from "../../api/CoursesApi.tsx";
import type {CourseParticipantTypes} from "../../utils/CourseTypes.ts";
import {useLocation} from "react-router-dom";

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
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [courseData, setCourseData] = useState<Course[]>([]);
    const [participants, setParticipants] = useState<Participant[]>([]);

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
    const fetchParticipants = useCallback(async () => {
        const data = await CourseApi.fetchAllParticipants();
        const allParticipants: Participant[] = data.map((participant: CourseParticipantTypes) => ({
                id: participant.id,
                userId: participant.user.id,
                name: `${participant.user.firstName} ${participant.user.lastName}`,
                courseId: participant.course.id,
            })
        );
        setParticipants(allParticipants);
    }, [])

    useEffect(() => {
        fetchCourses();
        fetchParticipants();
    }, [location.pathname]);

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