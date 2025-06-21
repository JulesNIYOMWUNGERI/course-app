package org.academy.resources;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.academy.dtos.request.FileRequestDTO;
import org.academy.services.CourseDocumentService;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import java.util.UUID;

@Path("/courses/{courseId}/files")
@Tag(name = "Course Documents Endpoints", description = "Operations related to course documents")
public class CourseDocumentsResource {

    private final CourseDocumentService courseDocumentService;

    @Inject
    public CourseDocumentsResource(CourseDocumentService courseDocumentService) {
        this.courseDocumentService = courseDocumentService;
    }

    @GET
    public String getCourseFiles(@PathParam("courseId") UUID courseId) {
        return "List of course files";
    }

    @POST
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response addCourseFiles(@PathParam("courseId") UUID courseId, FileRequestDTO file) {
        return null;
    }

    @GET
    @Path("/{docId}/preview")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response previewDocument(@PathParam("courseId") UUID id, @PathParam("docId") UUID docId, FileRequestDTO file) {
        return null;
    }

    @GET
    @Path("/{docId}/download")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response downloadDocument(@PathParam("courseId") UUID id, @PathParam("docId") UUID docId, FileRequestDTO file) {
        return null;
    }
}
