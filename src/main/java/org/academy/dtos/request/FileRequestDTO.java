package org.academy.dtos.request;

import jakarta.ws.rs.core.MediaType;
import org.jboss.resteasy.reactive.PartType;
import org.jboss.resteasy.reactive.RestForm;
import org.jboss.resteasy.reactive.multipart.FileUpload;

public record FileRequestDTO(
        @RestForm
        @PartType(MediaType.APPLICATION_OCTET_STREAM)
        FileUpload file
) {
}
