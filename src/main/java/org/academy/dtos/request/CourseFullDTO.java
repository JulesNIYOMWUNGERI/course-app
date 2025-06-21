package org.academy.dtos.request;

import java.util.List;
import java.util.UUID;
import org.academy.dtos.response.CourseParticipantsUserDTO;

public record CourseFullDTO(
    UUID id,
    String name,
    Integer numberOfParticipants,
    String classification,
    String department,
    List<String> participantsGroup,
    List<CourseParticipantsUserDTO> courseParticipants) {}
