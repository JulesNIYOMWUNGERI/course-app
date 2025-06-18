package org.academy.mappers;

import org.academy.dtos.response.UserResponseDto;
import org.academy.entities.UserEntity;

public class UserMapper {
  public static UserResponseDto toDTO(UserEntity user) {
    return new UserResponseDto(user.getId(), user.getFirstName(), user.getLastName());
  }
}
