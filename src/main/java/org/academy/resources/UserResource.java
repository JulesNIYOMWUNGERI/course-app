package org.academy.resources;

import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.academy.dtos.request.UserRequestDto;
import org.academy.dtos.response.UserResponseDto;
import org.academy.services.UserService;

@Path("/users")
public class UserResource {
  @Inject UserService userService;

  @POST
  @Path("/new")
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  public Response createNewUser(UserRequestDto user) {
    UserResponseDto newUser = userService.createUser(user);

    return Response.status(Response.Status.CREATED).entity(newUser).build();
  }
}
