package org.academy.resources;

import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.UUID;
import org.academy.dtos.request.CourseRequestDTO;
import org.academy.exceptions.NotFounderException;
import org.academy.services.CourseService;
import org.academy.utils.ResponseBuilder;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

@Path("/courses")
@Tag(name = "Course Endpoints", description = "Operations related to courses")
@Produces(MediaType.APPLICATION_JSON)
public class CourseResource {
  @Inject CourseService courseService;

  @GET
  public Response getCourse(
      @QueryParam("page") @DefaultValue("1") int page,
      @QueryParam("size") @DefaultValue("10") int size,
      @QueryParam("name") String name,
      @QueryParam("department") String department,
      @QueryParam("classification") String classification) {
    return ResponseBuilder.success(
        Response.Status.CREATED,
        "Courses retrieved successfully",
        courseService.getCourses(page, size, name, department, classification));
  }

  @GET
  @Path("/{id}")
  public Response getCourseById(@PathParam("id") UUID id) {
    try {
      return ResponseBuilder.success(
          Response.Status.CREATED,
          "Course retrieved successfully",
          courseService.getCourseById(id));
    } catch (NotFounderException e) {
      return ResponseBuilder.error(Response.Status.NOT_FOUND, e.getMessage());
    }
  }

  @POST
  @Consumes(MediaType.APPLICATION_JSON)
  public Response createCourse(@Valid CourseRequestDTO courseData) {
    try {
      return ResponseBuilder.success(
          Response.Status.CREATED,
          "Course created successfully",
          courseService.createCourse(courseData));
    } catch (NotFounderException e) {
      return ResponseBuilder.error(Response.Status.NOT_FOUND, e.getMessage());
    }
  }

  @PUT
  @Consumes(MediaType.APPLICATION_JSON)
  @Path("/{id}")
  public Response updateCourse(@PathParam("id") UUID id, CourseRequestDTO courseData) {
    try {
      return ResponseBuilder.success(
          "Course updated successfully", courseService.updateCourse(id, courseData));
    } catch (NotFounderException e) {
      return ResponseBuilder.error(Response.Status.NOT_FOUND, e.getMessage());
    }
  }

  @DELETE
  @Path("/{id}")
  public Response deleteCourse(@PathParam("id") UUID id) {
    try {
      return ResponseBuilder.success(
          "Course deleted successfully", courseService.removeCourseById(id));
    } catch (NotFounderException e) {
      return ResponseBuilder.error(Response.Status.NOT_FOUND, e.getMessage());
    }
  }
}
