import {useEffect, useRef, useState} from "react";

import BasicDataSection from "./BasicDataSection/BasicDataSection";
import ClassificationSection from "./ClassificationSection/ClassificationSection";
import DepartmentSection from "./DepartmentSection/DepartmentSection";
import ParticipantGroupSection from "./ParticipantGroupSection/ParticipantGroupSection";
import type {FormErrors} from "../../types";
import ButtonSection from "./ButtonSection/ButtonSection";
import {useCourseContext} from "../../../../CourseProviderContext";
import {useCourseManagementContext} from "../../CourseManagementProviderContext";
import "./CourseForm.css";

interface ApiCourse {
    id: string;
    name: string;
    department: string;
    classification: string;
    participantsGroup?: string[];
    numberOfParticipants: number;
}

const CourseForm = () => {
    const formRef = useRef<HTMLFormElement>(null);

    const {courseNameFilter, clearFilter} = useCourseManagementContext();

    const {courseData} = useCourseContext();

    const [formErrors, setFormErrors] = useState<FormErrors>({
        courseName: "",
        numberOfParticipants: "",
        participantGroups: "",
    });

    const populateForm = (course: ApiCourse) => {
        if (!formRef.current) return;

        formRef.current.courseName.value = course.name || '';
        formRef.current.classification.value = course.classification || 'technical';
        formRef.current.department.value = course.department || 'java';
        formRef.current.numberOfParticipants.value =
            (course.numberOfParticipants || 0).toString();

        const groups = course.participantsGroup || [];

        const checkboxes = formRef.current.querySelectorAll<HTMLInputElement>(
            'input[name="participantGroups"]',
        );

        checkboxes.forEach((checkbox) => {
            checkbox.checked = groups.includes(checkbox.value);
        });
    };

    const handleCancel = () => {
        if (!formRef.current) return;
        formRef.current.reset();
        clearFilter();
        setFormErrors({
            courseName: "",
            numberOfParticipants: "",
            participantGroups: "",
        });
    };

    useEffect(() => {
        if (!courseNameFilter) return;

        const matchedCourse = courseData.find(
            (course: any) => course.id === courseNameFilter,
        ) as ApiCourse | undefined;

        if (matchedCourse) {
            console.log("Selected course for editing:", matchedCourse);
            populateForm(matchedCourse);
        }
    }, [courseNameFilter, courseData]);

    return (
        <form ref={formRef} className="course-form">
            <BasicDataSection formErrors={formErrors}/>

            <ClassificationSection/>

            <DepartmentSection/>

            <ParticipantGroupSection formErrors={formErrors}/>

            <ButtonSection onCancel={handleCancel} formRef={formRef as React.RefObject<HTMLFormElement>}/>
        </form>
    );
};

export default CourseForm;
