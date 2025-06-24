package org.academy.utils;

import jakarta.ws.rs.core.Response;
import org.academy.entities.CourseDocumentsEntity;

public class ServeFiles {
  private ServeFiles() {}

  /**
   * Serves a file from the file storage.
   *
   * @param document the document entity containing file information
   * @param disposition "inline" for preview, "attachment" for download
   * @return Response containing the file data
   */
  public static Response serveFile(CourseDocumentsEntity document, String disposition) {
    byte[] filecontent = document.getContent();
    return Response.ok(document.getContent())
        .header(
            "Content-Disposition",
            disposition + "; filename=\"" + document.getDocumentName() + "\"")
        .header("Content-Type", document.getDocumentType())
        .header("Content-Length", filecontent.length)
        .build();
  }
}
