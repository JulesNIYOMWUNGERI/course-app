package org.academy.dtos.response;

import java.util.List;
import java.util.UUID;

public record CourseDTO(
        UUID id,
        String name,
        Integer numberOfParticipants,
        String classification,
        String department,
        List<String> participantsGroup) {
}
