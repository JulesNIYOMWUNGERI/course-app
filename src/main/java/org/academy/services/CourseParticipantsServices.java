package org.academy.services;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import org.academy.dtos.request.ParticipantsRequestDTO;
import org.academy.dtos.response.CourseParticipantsDTO;
import org.academy.entities.CourseEntity;
import org.academy.entities.CourseParticipantsEntity;
import org.academy.entities.UserEntity;
import org.academy.exceptions.NotFounderException;
import org.academy.exceptions.UserExistsException;
import org.academy.mappers.CourseParticipantsMapper;
import org.academy.repositories.CourseParticipantsRepository;
import org.academy.repositories.CourseRepository;
import org.academy.repositories.UserRepository;

@ApplicationScoped
public class CourseParticipantsServices {

  private final CourseRepository courseRepository;
  private final UserRepository userRepository;
  private final CourseParticipantsRepository courseParticipantsRepository;

  /**
   * Constructor for CourseParticipantsServices.
   *
   * @param courseRepository
   * @param userRepository
   * @param courseParticipantsRepository
   */
  @Inject
  public CourseParticipantsServices(
      CourseRepository courseRepository,
      UserRepository userRepository,
      CourseParticipantsRepository courseParticipantsRepository) {
    this.courseRepository = courseRepository;
    this.userRepository = userRepository;
    this.courseParticipantsRepository = courseParticipantsRepository;
  }

  public List<CourseParticipantsDTO> getCourseParticipant(UUID courseId, UUID userId) {
    List<CourseParticipantsEntity> participant =
        courseParticipantsRepository.findCourseParticipants(courseId, userId);
    if (participant == null) {
      return Collections.emptyList();
    }
    return participant.stream().map(CourseParticipantsMapper::toDTO).toList();
  }

  /**
   * Adds a participant to a course.
   *
   * @param participants the request DTO containing course ID and user ID
   * @return a success message
   * @throws org.academy.exceptions.NotFounderException if the course or user is not found
   */
  @Transactional
  public CourseParticipantsDTO addParticipant(ParticipantsRequestDTO participants)
      throws NotFounderException, UserExistsException {
    CourseEntity course = courseRepository.findById(participants.courseId());
    if (course == null) {
      throw new NotFounderException("Course not found with ID: " + participants.courseId());
    }
    UserEntity existingUser = userRepository.findUserById(participants.userId());
    if (existingUser == null) {
      throw new NotFounderException("User not found with ID: " + participants.userId());
    }
    CourseParticipantsEntity existingParticipant =
        courseParticipantsRepository.findByCourseAndUser(course.getId(), existingUser.getId());

    if (existingParticipant != null) {
      throw new UserExistsException("User is already a participant in this course.");
    }

    CourseParticipantsEntity participant = new CourseParticipantsEntity();
    participant.setCourse(course);
    participant.setUser(existingUser);

    courseParticipantsRepository.persist(participant);

    return CourseParticipantsMapper.toDTO(participant);
  }

  /**
   * Removes a participant from a course.
   *
   * @param id the UUID of the participant to remove
   * @return a success message
   * @throws NotFounderException if the participant is not found
   */
  @Transactional
  public String removeParticipant(UUID id) throws NotFounderException {
    CourseParticipantsEntity participant = courseParticipantsRepository.findById(id);
    if (participant == null) {
      throw new NotFounderException("Participant not found with ID: " + id);
    }
    courseParticipantsRepository.delete("id", id);
    return "Participant removed successfully.";
  }
}
