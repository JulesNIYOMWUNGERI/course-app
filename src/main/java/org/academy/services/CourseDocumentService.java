package org.academy.services;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.core.Response;
import org.academy.dtos.response.CourseDocumentsResponseDTO;
import org.academy.entities.CourseDocumentsEntity;
import org.academy.entities.CourseEntity;
import org.academy.exceptions.NotFounderException;
import org.academy.mappers.CourseDocumentMappers;
import org.academy.repositories.CourseDocumentRepository;
import org.academy.repositories.CourseRepository;
import org.academy.utils.ServeFiles;
import org.jboss.resteasy.reactive.multipart.FileUpload;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

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

    // this is the directory where uploaded files will be stored
    private static final Path UPLOAD_DIR = Paths.get(System.getProperty("user.dir"), "uploads");

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
     * @param file     the FileUpload object containing the document to be added
     * @return CourseDocumentsResponseDTO containing the details of the added document
     * @throws IOException         if there is an error saving the file to disk
     * @throws NotFounderException if the course with the specified ID does not exist
     */
    @Transactional
    public CourseDocumentsResponseDTO addDocument(UUID courseId, FileUpload file)
            throws IOException, NotFounderException {
        if (file.uploadedFile() == null || !Files.exists(file.uploadedFile())) {
            throw new IOException("Uploaded file does not exist or is not accessible");
        }
        CourseEntity existingCourse = findCourseOrThrow(courseId);
        String fileName = file.fileName() != null ? file.fileName() : "unknown_file";
        String fileType = file.contentType() != null ? file.contentType() : "application/octet-stream";
        String fileNewName = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
        String filePath = String.format("%s/%s", UPLOAD_DIR, fileNewName);

        try {
            Path uploadDir = Paths.get(UPLOAD_DIR.toUri());
            if (!Files.exists(uploadDir)) {
                Files.createDirectories(uploadDir);
            }
            Path targetPath = Paths.get(filePath);
            Path sourcePath = file.uploadedFile();

            // Copy the uploaded file to the target path, replacing it if it already exists
            // Is copied only if it does not exist to avoid overwriting existing files
            Files.copy(sourcePath, targetPath, StandardCopyOption.REPLACE_EXISTING);
            if (!Files.exists(targetPath)) {
                throw new IOException("Failed to save file to disk - file does not exist after copy");
            }
        } catch (IOException e) {
            throw new IOException("Error saving file to " + filePath + ": " + e.getMessage());
        }

        // Create a new CourseDocumentsEntity and set its properties
        CourseDocumentsEntity courseDocument = new CourseDocumentsEntity();
        courseDocument.setCourse(existingCourse);
        courseDocument.setDocumentName(fileName);
        courseDocument.setDocumentType(fileType);

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
     * @throws IOException         if there is an error deleting the file from disk
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
     * @param courseId   the ID of the course
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
     * @param courseId   the ID of the course
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
