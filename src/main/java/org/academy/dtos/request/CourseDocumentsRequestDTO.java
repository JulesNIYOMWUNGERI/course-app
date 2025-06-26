package org.academy.dtos.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

public record CourseDocumentsRequestDTO(
        @Valid @NotNull(message = "Upload file name is required") String fileName,
        @Valid @NotNull(message = "File type is required") String fileType,
        @Valid @NotNull(message = "File content is required") byte[] content) {
}
