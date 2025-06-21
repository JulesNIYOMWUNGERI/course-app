package org.academy.resources;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.UUID;
import org.academy.dtos.request.ParticipantsRequestDTO;
import org.academy.exceptions.NotFounderException;
import org.academy.exceptions.UserExistsException;
import org.academy.repositories.CourseParticipantsRepository;
import org.academy.services.CourseParticipantsServices;
import org.academy.utils.ResponseBuilder;

@Path("/participants")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CourseParticipantsResources {

    private final CourseParticipantsServices courseParticipantsServices;

    @Inject
    public CourseParticipantsResources(CourseParticipantsServices courseParticipantsServices) {
        this.courseParticipantsServices = courseParticipantsServices;
    }

    /**
     * Retrieves all participants in the system.
     *
     * @return Response containing the list of participants
     */
    @GET
    public Response getAllParticipants(
            @QueryParam("courseId") UUID courseId, @QueryParam("userId") UUID userId) {
        return ResponseBuilder.success(
                "Participants retrieved successfully",
                courseParticipantsServices.getCourseParticipant(courseId, userId));
    }

    /**
     * Adds a participant to a course.
     *
     * @param participantsRequestDTO the request DTO containing course ID and user ID
     * @return Response indicating the success or failure of the operation
     */
    @POST
    public Response addParticipant(ParticipantsRequestDTO participantsRequestDTO) {
        try {
            return ResponseBuilder.success(
                    Response.Status.CREATED,
                    "Participant added successfully",
                    courseParticipantsServices.addParticipant(participantsRequestDTO));
        } catch (NotFounderException e) {
            return ResponseBuilder.error(Response.Status.NOT_FOUND, e.getMessage());
        } catch (UserExistsException e) {
            return ResponseBuilder.error(Response.Status.CONFLICT, e.getMessage());
        }
    }

    /**
     * Removes a participant from a course by their ID.
     *
     * @param id the UUID of the participant to remove
     * @return Response indicating the success or failure of the operation
     */
    @DELETE
    @Path("/{id}")
    public Response removeParticipant(@PathParam("id") UUID id) {
        try {
            return ResponseBuilder.success(
                    Response.Status.OK,
                    "Participant removed successfully",
                    courseParticipantsServices.removeParticipant(id));
        } catch (NotFounderException e) {
            return ResponseBuilder.error(Response.Status.NOT_FOUND, e.getMessage());
        }
    }
}
