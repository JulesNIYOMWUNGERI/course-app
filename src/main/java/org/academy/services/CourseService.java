package org.academy.services;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.UUID;
import org.academy.dtos.PaginationDto;
import org.academy.dtos.request.CourseDTO;
import org.academy.dtos.request.CourseRequestDTO;
import org.academy.dtos.response.CoursePaginatedResponseDTO;
import org.academy.entities.CourseEntity;
import org.academy.exceptions.NotFounderException;
import org.academy.mappers.CourseMapper;
import org.academy.repositories.CourseRepository;

@ApplicationScoped
public class CourseService {
  @Inject CourseRepository courseRepository;

  public PaginationDto<List<CourseDTO>> getCourses(
      int page, int size, String name, String department, String classification) {
    CoursePaginatedResponseDTO<CourseEntity> result =
        courseRepository.findCourses(page, size, name, department, classification);

    List<CourseDTO> data = result.getItems().stream().map(CourseMapper::toDTO).toList();

    long totalCount = result.getTotalCount();
    long totalPages = (long) Math.ceil((double) totalCount / size);
    return new PaginationDto<>(totalCount, totalPages, page, size, data);
  }

  public CourseDTO getCourseById(UUID id) {
    CourseEntity course = courseRepository.find("id", id).firstResult();
    if (course == null) {
      throw new NotFounderException("Course not found with ID: " + id);
    }
    return CourseMapper.toDTO(course);
  }

  @Transactional
  public CourseDTO createCourse(CourseRequestDTO course) throws NotFounderException {
    CourseEntity existingCourse = courseRepository.find("name", course.name()).firstResult();
    if (existingCourse != null) {
      throw new NotFounderException("Course with the same name already exists");
    }

    CourseEntity entity = CourseMapper.toEntity(course);
    courseRepository.persist(entity);
    return CourseMapper.toDTO(entity);
  }

  @Transactional
  public CourseDTO updateCourse(UUID id, CourseRequestDTO course) throws NotFounderException {
    CourseEntity existingCourse = courseRepository.find("id", id).firstResult();
    if (existingCourse == null) {
      throw new NotFounderException("Course not found with ID: " + id);
    }

    existingCourse.setName(course.name());
    existingCourse.setNumberOfParticipants(course.numberOfParticipants());
    existingCourse.setParticipantsGroup(course.participantsGroup());
    existingCourse.setClassification(course.classification());
    existingCourse.setDepartment(course.department());
    return CourseMapper.toDTO(existingCourse);
  }

  public String removeCourseById(UUID id) throws NotFounderException {
    CourseEntity course = courseRepository.find("id", id).firstResult();
    if (course == null) {
      throw new NotFounderException("Course not found with ID: " + id);
    }
    courseRepository.delete(course);
    return "Course with ID " + id + " has been removed successfully.";
  }
}
