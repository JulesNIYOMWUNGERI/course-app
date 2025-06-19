package org.academy.resources;

import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;
import org.academy.dtos.request.UserRequestDto;
import org.academy.dtos.response.UserResponseDto;
import org.academy.services.UserService;
import org.academy.utils.ResponseBuilder;

@Path("/users")
public class UserResource {
  @Inject UserService userService;

  @POST
  @Path("/new")
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  public Response createNewUser(@Valid UserRequestDto user) {
    try {
      UserResponseDto newUser = userService.createUser(user);

      return ResponseBuilder.success(Response.Status.CREATED, "User created successfully", newUser);
    } catch (Exception e) {
      return ResponseBuilder.error(Response.Status.BAD_REQUEST, e.getMessage());
    }
  }

  @GET
  @Path("/all")
  @Produces(MediaType.APPLICATION_JSON)
  public Response getAllUsers() {
    try {
      List<UserResponseDto> users = userService.getAllUsers();

      return ResponseBuilder.success(Response.Status.OK, "Successfully retrieved all users", users);
    } catch (Exception e) {
      return ResponseBuilder.error(Response.Status.INTERNAL_SERVER_ERROR, e.getMessage());
    }
  }

  @PUT
  @Path("/{id}")
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  public Response updateUser(@PathParam("id") String id, @Valid UserRequestDto user) {
    try {
      UserResponseDto updatedUser = userService.updateUser(java.util.UUID.fromString(id), user);
      return ResponseBuilder.success(Response.Status.OK, "User updated successfully", updatedUser);
    } catch (Exception e) {
      return ResponseBuilder.error(Response.Status.BAD_REQUEST, e.getMessage());
    }
  }

  @DELETE
  @Path("/{id}")
  @Produces(MediaType.APPLICATION_JSON)
  public Response deleteUser(@PathParam("id") String id) {
    try {
      userService.deleteUser(java.util.UUID.fromString(id));
      return ResponseBuilder.success(Response.Status.NO_CONTENT, "User deleted successfully", null);
    } catch (Exception e) {
      return ResponseBuilder.error(Response.Status.BAD_REQUEST, e.getMessage());
    }
  }
}
