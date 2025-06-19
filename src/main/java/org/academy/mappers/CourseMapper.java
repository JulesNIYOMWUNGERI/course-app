package org.academy.mappers;

import org.academy.dtos.request.CourseDTO;
import org.academy.dtos.request.CourseRequestDTO;
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
}
