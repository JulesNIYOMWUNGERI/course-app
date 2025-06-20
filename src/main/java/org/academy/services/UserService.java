package org.academy.services;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.UUID;
import org.academy.dtos.request.UserRequestDto;
import org.academy.dtos.response.UserResponseDto;
import org.academy.entities.UserEntity;
import org.academy.exceptions.UserExistsException;
import org.academy.mappers.UserMapper;
import org.academy.repositories.UserRepository;

@ApplicationScoped
public class UserService {
  @Inject UserRepository userRepository;

  @Transactional
  public UserResponseDto createUser(UserRequestDto user) {
    UserEntity userExist = userRepository.findByUsername(user.firstName(), user.lastName());
    if (userExist != null) {
      throw new UserExistsException("User with the same name already exists");
    }
    UserEntity userEntity = new UserEntity();
    userEntity.setFirstName(user.firstName());
    userEntity.setLastName(user.lastName());
    userRepository.persist(userEntity);
    return UserMapper.toDTO(userEntity);
  }

  public List<UserResponseDto> getAllUsers() {
    return userRepository.getAllUsers().stream().map(UserMapper::toDTO).toList();
  }

  @Transactional
  public UserResponseDto updateUser(UUID id, UserRequestDto user) {
    UserEntity userExist = userRepository.findUserById(id);
    if (userExist == null) {
      throw new UserExistsException("Invalid User, User not found!");
    }

    userExist.setFirstName(user.firstName());
    userExist.setLastName(user.lastName());
    userRepository.merge(userExist);

    return UserMapper.toDTO(userExist);
  }

  @Transactional
  public String deleteUser(UUID id) {
    UserEntity userExist = userRepository.findUserById(id);
    if (userExist == null) {
      throw new UserExistsException("Invalid User, User not found!");
    }

    userRepository.delete(userExist);

    return "User deleted successfully";
  }
}
