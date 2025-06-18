package org.academy.dtos.response;

import java.util.UUID;

public record UserResponseDto(UUID id, String firstName, String lastName) {}
