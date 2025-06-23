import type {Course} from "../pages/Course/types.ts";

/**
 * This interface extends CourseTypes to include a list of participants.
 * It is used to represent a course with its participants.
 */
export interface UserTypes {
    id: string;
    firstName: string;
    lastName: string;
}

interface CourseParticipant {
    id: string;
    user: UserTypes;
}

export interface CourseDocuments {
    id: string;
    documentName: string;
}

/**
 * This interface combines CourseTypes with UserTypes to represent a full course
 * with its participants.
 */
export interface CourseFullTypes extends Course {
    courseParticipants: CourseParticipant[];
    courseDocuments: CourseDocuments[];
}

export interface CourseRequestTypes {
    courseId: string;
    userId: string;
}

export interface CourseParticipantTypes {
    id: string;
    user: UserTypes;
    course: Course;
}