package org.academy.resources;

import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
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
}
