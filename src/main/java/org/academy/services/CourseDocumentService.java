package org.academy.services;

import io.quarkus.logging.Log;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.academy.repositories.CourseDocumentRepository;
import org.jboss.resteasy.reactive.multipart.FileUpload;

import java.io.IOException;
import java.nio.file.Files;

@ApplicationScoped
public class CourseDocumentService {
    private final CourseDocumentRepository courseDocumentRepository;

    @Inject
    public CourseDocumentService(CourseDocumentRepository courseDocumentRepository) {
        this.courseDocumentRepository = courseDocumentRepository;
    }

    public String getDocuments(String courseId, String documentId) {
        return String.format("courses/%s/documents/%s", courseId, documentId);
    }

    public String addDocument(String courseId, FileUpload file) throws IOException {
        try {
            byte[] fileData = Files.readAllBytes(file.uploadedFile());
            String fileName = file.fileName();
            String CONTENT_TYPE = file.contentType();
            Log.info(fileData);
            return null;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
