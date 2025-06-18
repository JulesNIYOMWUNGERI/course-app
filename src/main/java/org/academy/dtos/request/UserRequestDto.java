package org.academy.dtos.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.eclipse.microprofile.openapi.annotations.media.Schema;

public record UserRequestDto(
    @NotNull(message = "First name is required")
        @Size(min = 3, max = 20, message = "First name must be between 3 and 20 characters")
        @Pattern(regexp = "^(?!\\d+$).+", message = "First name must not be only numbers")
        @Schema(description = "User's first name", example = "John")
        String firstName,
    @NotNull(message = "Last name is required")
        @Size(min = 3, max = 20, message = "Last name must be between 3 and 20 characters")
        @Pattern(regexp = "^(?!\\d+$).+", message = "Last name must not be only numbers")
        @Schema(description = "User's last name", example = "Doe")
        String lastName) {}
