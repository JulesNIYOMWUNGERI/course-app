package org.academy.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "course_documents")
public class CourseDocumentsEntity extends BaseEntity {
  @Column(name = "name")
  private String documentName;

  @Column(name = "document_path", columnDefinition = "TEXT")
  private String documentPath;

  @Column(name = "document_type")
  private String documentType;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "course_id", nullable = false)
  private CourseEntity course;

  public String getDocumentName() {
    return documentName;
  }

  public void setDocumentName(String documentName) {
    this.documentName = documentName;
  }

  public String getDocumentPath() {
    return documentPath;
  }

  public void setDocumentPath(String documentPath) {
    this.documentPath = documentPath;
  }

  public CourseEntity getCourse() {
    return course;
  }

  public void setCourse(CourseEntity course) {
    this.course = course;
  }

  public String getDocumentType() {
    return documentType;
  }

  public void setDocumentType(String documentType) {
    this.documentType = documentType;
  }
}
