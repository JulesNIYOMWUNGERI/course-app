package org.academy.dtos.request;

import jakarta.validation.constraints.NotNull;
import jakarta.ws.rs.core.MediaType;
import org.jboss.resteasy.reactive.PartType;
import org.jboss.resteasy.reactive.RestForm;
import org.jboss.resteasy.reactive.multipart.FileUpload;

public record CourseDocumentsRequestDTO(
    @NotNull(message = "Upload file is required")
        @RestForm
        @PartType(MediaType.APPLICATION_OCTET_STREAM)
        FileUpload file) {}
