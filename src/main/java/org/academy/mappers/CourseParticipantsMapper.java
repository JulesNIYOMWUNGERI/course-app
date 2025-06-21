package org.academy.mappers;

import org.academy.dtos.response.CourseParticipantsDTO;
import org.academy.dtos.response.CourseParticipantsUserDTO;
import org.academy.entities.CourseParticipantsEntity;

public class CourseParticipantsMapper {
  private CourseParticipantsMapper() {}

  /**
   * Converts a CourseParticipantsEntity to a CourseParticipantsDTO.
   *
   * @param courseParticipants the CourseParticipantsEntity to convert
   * @return a CourseParticipantsDTO containing the course and user information
   */
  public static CourseParticipantsDTO toDTO(CourseParticipantsEntity courseParticipants) {
    return new CourseParticipantsDTO(
        courseParticipants.getId(),
        UserMapper.toDTO(courseParticipants.getUser()),
        CourseMapper.toDTO(courseParticipants.getCourse()));
  }

  /**
   * Converts a CourseParticipantsEntity to a CourseParticipantsUserDTO.
   *
   * @param courseParticipants the CourseParticipantsEntity to convert
   * @return a CourseParticipantsUserDTO containing the user information
   */
  public static CourseParticipantsUserDTO toUsersDTO(CourseParticipantsEntity courseParticipants) {
    return new CourseParticipantsUserDTO(
        courseParticipants.getId(), UserMapper.toDTO(courseParticipants.getUser()));
  }
}
