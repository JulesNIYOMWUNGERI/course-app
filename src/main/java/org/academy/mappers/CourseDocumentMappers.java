package org.academy.mappers;

import org.academy.dtos.response.CourseDocumentsResponseDTO;
import org.academy.entities.CourseDocumentsEntity;

public class CourseDocumentMappers {
  private CourseDocumentMappers() {}

  public static CourseDocumentsResponseDTO toDTO(CourseDocumentsEntity courseDocument) {
    return new CourseDocumentsResponseDTO(courseDocument.getId(), courseDocument.getDocumentName());
  }
}
