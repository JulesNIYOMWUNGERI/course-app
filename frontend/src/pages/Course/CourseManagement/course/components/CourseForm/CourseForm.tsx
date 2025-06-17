import { useEffect, useRef, useState } from "react";

import BasicDataSection from "./BasicDataSection/BasicDataSection";
import ClassificationSection from "./ClassificationSection/ClassificationSection";
import DepartmentSection from "./DepartmentSection/DepartmentSection";
import ParticipantGroupSection from "./ParticipantGroupSection/ParticipantGroupSection";
import type { Course } from "../../../../types";
import type { FormErrors } from "../../types";
import ButtonSection from "./ButtonSection/ButtonSection";
import { useCourseContext } from "../../../../CourseProviderContext";
import { useCourseManagementContext } from "../../CourseManagementProviderContext";
import "./CourseForm.css";

const CourseForm = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const { courseNameFilter, clearFilter } = useCourseManagementContext();

  const { courseData, setCourseData } = useCourseContext();

  const [formErrors, setFormErrors] = useState<FormErrors>({
    courseName: "",
    numberOfParticipants: "",
    participantGroups: "",
  });

  const populateForm = (course: Course) => {
    if (!formRef.current) return;
    formRef.current.courseName.value = course.name;
    formRef.current.classification.value = course.classification;
    formRef.current.department.value = course.department;
    formRef.current.numberOfParticipants.value =
      course.numberOfParticipants.toString();

    const checkboxes = formRef.current.querySelectorAll<HTMLInputElement>(
      'input[name="participantGroups"]',
    );

    checkboxes.forEach((checkbox) => {
      checkbox.checked = course.participantGroups.includes(checkbox.value);
    });
  };

  const getCheckedParticipantGroups = (): string[] => {
    const checkboxes = formRef.current?.querySelectorAll<HTMLInputElement>(
      'input[name="participantGroups"]:checked',
    );
    return checkboxes ? Array.from(checkboxes).map((cb) => cb.value) : [];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
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
      errors.numberOfParticipants =
        "Number of participants must be a positive number.";
      hasError = true;
    }

    if (participantGroups.length === 0) {
      errors.participantGroups = "Select at least one participant group.";
      hasError = true;
    }

    setFormErrors(errors);

    if (hasError) return;

    const course: Course = {
      id: courseNameFilter || crypto.randomUUID(),
      name: courseName,
      classification: form.classification.value,
      department: form.department.value,
      participantGroups,
      numberOfParticipants,
    };

    if (courseNameFilter) {
      setCourseData((prev) =>
        prev.map((c) => (c.id === courseNameFilter ? course : c)),
      );
    } else {
      setCourseData((prev) => [...prev, course]);
    }

    handleCancel();
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
    const matchedCourse = courseData.find(
      (course: Course) => course.id === courseNameFilter,
    );

    if (matchedCourse) {
      populateForm(matchedCourse);
    }
  }, [courseNameFilter]);

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="course-form">
      <BasicDataSection formErrors={formErrors} />

      <ClassificationSection />

      <DepartmentSection />

      <ParticipantGroupSection formErrors={formErrors} />

      <ButtonSection onCancel={handleCancel} />
    </form>
  );
};

export default CourseForm;
