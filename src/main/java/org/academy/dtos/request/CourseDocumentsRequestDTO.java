package org.academy.dtos.request;

import jakarta.validation.constraints.NotNull;

public record CourseDocumentsRequestDTO(
    @NotNull(message = "Upload file name is required") String fileName,
    @NotNull(message = "File type is required") String fileType,
    @NotNull(message = "File content is required") byte[] content) {}
