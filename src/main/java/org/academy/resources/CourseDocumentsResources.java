package org.academy.resources;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.io.IOException;
import java.util.UUID;
import org.academy.dtos.request.CourseDocumentsRequestDTO;
import org.academy.exceptions.NotFounderException;
import org.academy.services.CourseDocumentService;
import org.academy.utils.ResponseBuilder;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

@Path("/courses/{courseId}/files")
@Tag(name = "Course Documents Endpoints", description = "Operations related to course documents")
@Produces(MediaType.APPLICATION_JSON)
public class CourseDocumentsResources {

  private final CourseDocumentService courseDocumentService;

  @Inject
  public CourseDocumentsResources(CourseDocumentService courseDocumentService) {
    this.courseDocumentService = courseDocumentService;
  }

  @GET
  public Response getCourseFiles(@PathParam("courseId") UUID courseId) {
    try {
      return ResponseBuilder.success(
          "Course documents retrieved successfully", courseDocumentService.getDocuments(courseId));
    } catch (NotFounderException e) {
      return ResponseBuilder.error(Response.Status.NOT_FOUND, e.getMessage());
    }
  }

  @POST
  @Consumes(MediaType.MULTIPART_FORM_DATA)
  public Response addCourseFiles(
      @PathParam("courseId") UUID courseId, CourseDocumentsRequestDTO file) {
    try {
      return ResponseBuilder.success(
          "Course documents saved successfully",
          courseDocumentService.addDocument(courseId, file.file()));
    } catch (NotFounderException e) {
      return ResponseBuilder.error(Response.Status.NOT_FOUND, e.getMessage());
    } catch (IOException e) {
      return ResponseBuilder.error(e.getMessage());
    }
  }

  @GET
  @Path("/{docId}/preview")
  public Response previewDocument(@PathParam("courseId") UUID id, @PathParam("docId") UUID docId) {
    try {
      return courseDocumentService.coursePreview(id, docId);
    } catch (NotFounderException e) {
      return ResponseBuilder.error(Response.Status.NOT_FOUND, e.getMessage());
    }
  }

  @GET
  @Path("/{docId}/download")
  public Response downloadDocument(@PathParam("courseId") UUID id, @PathParam("docId") UUID docId) {
    try {
      return courseDocumentService.courseDownload(id, docId);
    } catch (NotFounderException e) {
      return ResponseBuilder.error(Response.Status.NOT_FOUND, e.getMessage());
    }
  }

  @DELETE
  @Path("/{docId}")
  public Response deleteDocument(@PathParam("courseId") UUID id, @PathParam("docId") UUID docId) {
    try {
      return ResponseBuilder.success(
          "Document deleted successfully", courseDocumentService.removeDocument(id, docId));
    } catch (NotFounderException e) {
      return ResponseBuilder.error(Response.Status.NOT_FOUND, e.getMessage());
    } catch (IOException e) {
      return ResponseBuilder.error(Response.Status.INTERNAL_SERVER_ERROR, e.getMessage());
    }
  }
}
