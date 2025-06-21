package org.academy.utils;

import jakarta.ws.rs.core.Response;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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
    String filePath = document.getDocumentPath();
    if (filePath == null) {
      return ResponseBuilder.error(Response.Status.NOT_FOUND, "File path not found in document");
    }
    Path path = Paths.get(filePath);
    if (!Files.exists(path)) {
      return ResponseBuilder.error(Response.Status.NOT_FOUND, "File not found on disk");
    }
    File file = new File(filePath);
    return Response.ok(file)
        .header(
            "Content-Disposition",
            disposition + "; filename=\"" + document.getDocumentName() + "\"")
        .header("Content-Type", document.getDocumentType())
        .header("Content-Length", String.valueOf(file.length()))
        .build();
  }
}
