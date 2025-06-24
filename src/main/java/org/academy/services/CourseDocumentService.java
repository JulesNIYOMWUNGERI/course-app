package org.academy.services;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.core.Response;
import java.io.IOException;
import java.util.List;
import java.util.UUID;
import org.academy.dtos.request.CourseDocumentsRequestDTO;
import org.academy.dtos.response.CourseDocumentsResponseDTO;
import org.academy.entities.CourseDocumentsEntity;
import org.academy.entities.CourseEntity;
import org.academy.exceptions.NotFounderException;
import org.academy.mappers.CourseDocumentMappers;
import org.academy.repositories.CourseDocumentRepository;
import org.academy.repositories.CourseRepository;
import org.academy.utils.ServeFiles;

@ApplicationScoped
public class CourseDocumentService {
  private final CourseDocumentRepository courseDocumentRepository;
  private final CourseRepository courseRepository;

  @Inject
  public CourseDocumentService(
      CourseDocumentRepository courseDocumentRepository, CourseRepository courseRepository) {
    this.courseDocumentRepository = courseDocumentRepository;
    this.courseRepository = courseRepository;
  }

  /**
   * Retrieves all documents associated with a course.
   *
   * @param courseId the ID of the course
   * @return a list of CourseDocumentsResponseDTO containing document details
   * @throws NotFounderException if the course with the specified ID does not exist
   */
  public List<CourseDocumentsResponseDTO> getDocuments(UUID courseId) throws NotFounderException {
    findCourseOrThrow(courseId);
    List<CourseDocumentsEntity> courseDocument =
        courseDocumentRepository.findByCourseDocuments(courseId);
    if (courseDocument == null || courseDocument.isEmpty()) {
      return List.of();
    }
    return courseDocument.stream().map(CourseDocumentMappers::toDTO).toList();
  }

  /**
   * Adds a document to a course.
   *
   * @param courseId the ID of the course to which the document will be added
   * @param file the FileUpload object containing the document to be added
   * @return CourseDocumentsResponseDTO containing the details of the added document
   * @throws IOException if there is an error saving the file to disk
   * @throws NotFounderException if the course with the specified ID does not exist
   */
  @Transactional
  public CourseDocumentsResponseDTO addDocument(UUID courseId, CourseDocumentsRequestDTO file)
      throws IOException, NotFounderException {
    CourseEntity existingCourse = findCourseOrThrow(courseId);
    // Create a new CourseDocumentsEntity and set its properties
    CourseDocumentsEntity courseDocument = new CourseDocumentsEntity();
    courseDocument.setCourse(existingCourse);
    courseDocument.setDocumentName(file.fileName());
    courseDocument.setDocumentType(file.fileType());
    courseDocument.setContent(file.content());

    // Persist the document entity to the database
    courseDocumentRepository.persist(courseDocument);
    return CourseDocumentMappers.toDTO(courseDocument);
  }

  /**
   * Removes a document from a course by its ID.
   *
   * @param documentId the ID of the document to be removed
   * @return a success message indicating the document has been deleted
   * @throws NotFounderException if the document with the specified ID does not exist
   * @throws IOException if there is an error deleting the file from disk
   */
  @Transactional
  public String removeDocument(UUID courseId, UUID documentId)
      throws NotFounderException, IOException {
    findCourseOrThrow(courseId);
    CourseDocumentsEntity existingDocument = findDocumentOrThrow(documentId);
    courseDocumentRepository.delete(existingDocument);
    return "Document deleted successfully";
  }

  /**
   * Previews a document associated with a course.
   *
   * @param courseId the ID of the course
   * @param documentId the ID of the document to preview
   * @return a success message indicating the document has been previewed
   * @throws NotFounderException if the course or document with the specified IDs does not exist
   */
  public Response coursePreview(UUID courseId, UUID documentId) throws NotFounderException {
    findCourseOrThrow(courseId);
    CourseDocumentsEntity existingDocument = findDocumentOrThrow(documentId);
    return ServeFiles.serveFile(existingDocument, "inline");
  }

  /**
   * Downloads a document associated with a course.
   *
   * @param courseId the ID of the course
   * @param documentId the ID of the document to download
   * @return a success message indicating the document has been downloaded
   * @throws NotFounderException if the course or document with the specified IDs does not exist
   */
  public Response courseDownload(UUID courseId, UUID documentId) throws NotFounderException {
    findCourseOrThrow(courseId);
    CourseDocumentsEntity existingDocument = findDocumentOrThrow(documentId);
    return ServeFiles.serveFile(existingDocument, "attachment");
  }

  /**
   * Finds a course by its ID or throws an exception if not found.
   *
   * @param courseId the ID of the course to find
   * @return CourseEntity representing the found course
   * @throws NotFounderException if the course with the specified ID does not exist
   */
  private CourseEntity findCourseOrThrow(UUID courseId) throws NotFounderException {
    CourseEntity course = courseRepository.findById(courseId);
    if (course == null) {
      throw new NotFounderException("Course not found with ID: " + courseId);
    }
    return course;
  }

  /**
   * Finds a document by its ID or throws an exception if not found.
   *
   * @param documentId the ID of the document to find
   * @return CourseDocumentsEntity representing the found document
   * @throws NotFounderException if the document with the specified ID does not exist
   */
  private CourseDocumentsEntity findDocumentOrThrow(UUID documentId) throws NotFounderException {
    CourseDocumentsEntity existingDoc = courseDocumentRepository.findById(documentId);
    if (existingDoc == null) {
      throw new NotFounderException("Document not found with ID: " + documentId);
    }
    return existingDoc;
  }
}
