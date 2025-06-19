package org.academy.dtos.request;

import jakarta.validation.constraints.*;

import java.util.List;

import org.eclipse.microprofile.openapi.annotations.media.Schema;

@Schema(name = "CourseRequest", description = "Request payload for creating a course")
public record CourseRequestDTO(
        @NotBlank(message = "Course name is required")
        @Size(max = 100, message = "Course name must not exceed 100 characters")
        @Schema(
                description = "Name of the course",
                example = "Introduction to Java",
                required = true)
        String name,
        @NotNull(message = "Number of participants is required")
        @Min(value = 1, message = "There must be at least 1 participant")
        @Max(value = 1000, message = "Too many participants")
        @Schema(description = "Total number of participants", example = "25", required = true)
        Integer numberOfParticipants,
        @NotBlank(message = "Classification is required")
        @Schema(description = "Course classification", example = "Technical", required = true)
        String classification,
        @NotBlank(message = "Department is required")
        @Schema(description = "Department offering the course", example = "Java", required = true)
        String department,
        @NotNull(message = "Participants group list is required")
        @Size(min = 1, message = "At least one participant must be added")
        @Schema(
                description = "List of participant names",
                required = true,
                example = "[\"Developers\", \"Managers\"]")
        List<String> participantsGroup) {
}
