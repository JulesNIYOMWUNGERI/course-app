package org.academy.mappers;

import org.academy.dtos.request.CourseRequestDTO;
import org.academy.dtos.response.CourseDTO;
import org.academy.dtos.response.CourseFullResponseDTO;
import org.academy.entities.CourseEntity;

public class CourseMapper {
  private CourseMapper() {}

  public static CourseEntity toEntity(CourseRequestDTO course) {
    CourseEntity courseEntity = new CourseEntity();
    courseEntity.setName(course.name());
    courseEntity.setNumberOfParticipants(course.numberOfParticipants());
    courseEntity.setParticipantsGroup(course.participantsGroup());
    courseEntity.setClassification(course.classification());
    courseEntity.setDepartment(course.department());
    return courseEntity;
  }

  public static CourseDTO toDTO(CourseEntity course) {
    return new CourseDTO(
        course.getId(),
        course.getName(),
        course.getNumberOfParticipants(),
        course.getClassification(),
        course.getDepartment(),
        course.getParticipantsGroup());
  }

  public static CourseFullResponseDTO toFullDTO(CourseEntity course) {
    return new CourseFullResponseDTO(
        course.getId(),
        course.getName(),
        course.getNumberOfParticipants(),
        course.getClassification(),
        course.getDepartment(),
        course.getParticipantsGroup(),
        course.getCourseParticipants().stream().map(CourseParticipantsMapper::toUsersDTO).toList(),
        course.getCourseDocuments().stream().map(CourseDocumentMappers::toDTO).toList());
  }
}
