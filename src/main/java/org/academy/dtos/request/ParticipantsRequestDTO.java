package org.academy.dtos.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public record ParticipantsRequestDTO(
    @NotNull(message = "Course Id is required") @Valid UUID courseId,
    @NotNull(message = "User Id is required") @Valid UUID userId) {}
