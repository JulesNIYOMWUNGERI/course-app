package org.academy.dtos.request;

import java.util.UUID;

public record ParticipantsRequestDTO(UUID courseId, UUID userId) {}
