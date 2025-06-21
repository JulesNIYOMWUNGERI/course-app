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
import {FILE_STORE} from "./constants";
import type {FileType, Participant} from "./types";
import {useNavigate, useParams} from "react-router-dom";
import type {CourseFullTypes} from "../../../../utils/CourseTypes.ts";
import {CourseApi} from "../../../../api/CoursesApi.tsx";

interface CourseDetailsContextType {
    participants: Participant[];
    setParticipants: Dispatch<SetStateAction<Participant[]>>;
    courseFiles: FileType[];
    setCourseFiles: Dispatch<SetStateAction<FileType[]>>;
    currentCourseDetails: CourseFullTypes | null;
    fetchSingleCourse: (courseId: string) => Promise<CourseFullTypes | null>;
    loading: boolean;
}

const CourseDetailsContext = createContext<
    CourseDetailsContextType | undefined
>(undefined);

export const CourseDetailsProviderContext = ({
                                                 children,
                                             }: PropsWithChildren) => {
    const router = useNavigate()
    const [loading, setLoading] = useState(true);
    const {id} = useParams<{ id: string }>();
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [courseFiles, setCourseFiles] = useState<FileType[]>(() => {
        const storedFiles = localStorage.getItem(FILE_STORE);
        return storedFiles ? JSON.parse(storedFiles) : [];
    });

    const [currentCourseDetails, setCurrentCourseDetails] = useState<CourseFullTypes | null>(null);

    const fetchSingleCourse = useCallback(async (courseId: string): Promise<CourseFullTypes | null> => {
        setLoading(true);
        try {
            const course = await CourseApi.getCourseId(courseId, setLoading);
            if (!course || course.length === 0) {
                router("/course/overview");
                return null;
            }
            const singleCourse = Array.isArray(course) ? course[0] : course;
            setCurrentCourseDetails(singleCourse);

            const mappedParticipants: Participant[] = singleCourse.courseParticipants.map((participant) => (
                {
                    id: participant.id,
                    userId: participant.user.id,
                    name: `${participant.user.firstName} ${participant.user.lastName}`,
                    courseId: singleCourse.id
                }));
            setParticipants(mappedParticipants);
            return singleCourse;
        } catch (error) {
            console.error("Error fetching course details:", error);
            return null;
        } finally {
            setLoading(false);
        }
    }, [id])

    useEffect(() => {
        if (id) {
            fetchSingleCourse(id);
        }
    }, [id, fetchSingleCourse]);

    const contextValue = useMemo(
        () => ({
            participants,
            setParticipants,
            courseFiles,
            setCourseFiles,
            currentCourseDetails,
            fetchSingleCourse,
            loading
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
