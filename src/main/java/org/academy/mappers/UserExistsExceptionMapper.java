package org.academy.mappers;

import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import org.academy.dtos.response.ErrorResponseDto;
import org.academy.exceptions.UserExistsException;

@Provider
public class UserExistsExceptionMapper implements ExceptionMapper<UserExistsException> {
  @Override
  public Response toResponse(UserExistsException ex) {
    ErrorResponseDto error = new ErrorResponseDto(ex.getMessage(), Response.Status.CONFLICT.name());
    return Response.status(Response.Status.CONFLICT)
        .type(MediaType.APPLICATION_JSON)
        .entity(error)
        .build();
  }
}
