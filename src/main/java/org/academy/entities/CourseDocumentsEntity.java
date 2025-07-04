package org.academy.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "course_documents")
public class CourseDocumentsEntity extends BaseEntity {
  @Column(name = "name")
  private String documentName;

  @Basic(fetch = FetchType.LAZY)
  @Column(name = "content", nullable = false)
  private byte[] content;

  @Column(name = "document_type")
  private String documentType;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "course_id", nullable = false)
  private CourseEntity course;

  public byte[] getContent() {
    return content;
  }

  public void setContent(byte[] content) {
    this.content = content;
  }

  public String getDocumentName() {
    return documentName;
  }

  public void setDocumentName(String documentName) {
    this.documentName = documentName;
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
