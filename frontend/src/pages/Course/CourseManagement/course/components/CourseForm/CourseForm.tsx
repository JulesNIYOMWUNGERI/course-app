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
import type {Course} from "../../../../types.ts";
import {CourseApi} from "../../../../../../api/CoursesApi.tsx";
import {useToast} from "../../../../../../contexts/ToastProvider.tsx";

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

    const {courseData, fetchCourses} = useCourseContext();

    const { showToast } = useToast();
    const [loading, setLoading] = useState(false);

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

    const getCheckedParticipantGroups = (): string[] => {
        const checkboxes = formRef.current?.querySelectorAll<HTMLInputElement>(
            'input[name="participantGroups"]:checked',
        );
        return checkboxes ? Array.from(checkboxes).map((cb) => cb.value) : [];
    };

    const validateForm = (): Course | null => {
        if (!formRef.current) return null;

        const form = formRef.current;
        const courseName = form.courseName.value.trim();
        const numberOfParticipants = Number(form.numberOfParticipants.value);
        const participantGroups = getCheckedParticipantGroups();

        const errors = {
            courseName: "",
            numberOfParticipants: "",
            participantGroups: "",
        };

        let hasError = false;

        if (!courseName) {
            errors.courseName = "Course name is required.";
            hasError = true;
        }

        if (!numberOfParticipants || numberOfParticipants <= 0) {
            errors.numberOfParticipants = "Number of participants must be a positive number.";
            hasError = true;
        }

        if (participantGroups.length === 0) {
            errors.participantGroups = "Select at least one participant group.";
            hasError = true;
        }

        setFormErrors(errors);

        if (hasError) return null;

        return {
            id: courseNameFilter || crypto.randomUUID(),
            name: courseName,
            classification: form.classification.value,
            department: form.department.value,
            participantsGroup: participantGroups,
            numberOfParticipants,
        };
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

    const handleCourseSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const courseData = validateForm();
        if (!courseData) return;

        setLoading(true);
        try {
            if (courseNameFilter) {
                await CourseApi.updateCourse(
                    courseData.id,
                    courseData,
                    setLoading,
                    showToast
                );
                fetchCourses();
                handleCancel();
            } else {
                await CourseApi.createCourse(
                    courseData,
                    setLoading,
                    showToast
                );
                fetchCourses();
                handleCancel();
            }
        } catch (error) {
            setLoading(false);
            showToast("Something went wrong!")
        }
    };

    return (
        <form onSubmit={handleCourseSubmit} ref={formRef} className="course-form">
            <BasicDataSection formErrors={formErrors}/>

            <ClassificationSection/>

            <DepartmentSection/>

            <ParticipantGroupSection formErrors={formErrors}/>

            <ButtonSection
                onCancel={handleCancel}
                loading={loading}
            />
        </form>
    );
};

export default CourseForm;
