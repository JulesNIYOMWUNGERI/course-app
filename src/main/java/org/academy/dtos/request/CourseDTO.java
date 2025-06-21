package org.academy.dtos.request;

import jakarta.ws.rs.core.MediaType;
import org.jboss.resteasy.reactive.PartType;
import org.jboss.resteasy.reactive.RestForm;
import org.jboss.resteasy.reactive.multipart.FileUpload;

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

