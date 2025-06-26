package org.academy.dtos.response;

import java.util.UUID;

/**
 * Data Transfer Object for User entity.
 *
 * @param id Unique identifier of the user.
 * @param user User details.
 * @param course Course details.
 */
public record CourseParticipantsDTO(UUID id, UserResponseDto user, CourseDTO course) {}
