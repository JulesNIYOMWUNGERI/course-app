package org.academy.entities;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "courses")
public class CourseEntity extends BaseEntity {
  @Column(nullable = false)
  private String name;

  @Column(name = "number_of_participants")
  private Integer numberOfParticipants;

  private String classification;

  private String department;

  private List<String> participantsGroup;

  @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
  private List<CourseParticipantsEntity> courseParticipants;

  @OneToMany(
      mappedBy = "course",
      cascade = CascadeType.ALL,
      fetch = FetchType.LAZY)
  private List<CourseDocumentsEntity> courseDocuments;

  public List<CourseDocumentsEntity> getCourseDocuments() {
    return courseDocuments;
  }

  public void setCourseDocuments(List<CourseDocumentsEntity> courseDocuments) {
    this.courseDocuments = courseDocuments;
  }

  public List<CourseParticipantsEntity> getCourseParticipants() {
    return courseParticipants;
  }

  public void setCourseParticipants(List<CourseParticipantsEntity> courseParticipants) {
    this.courseParticipants = courseParticipants;
  }

  public List<String> getParticipantsGroup() {
    return participantsGroup;
  }

  public void setParticipantsGroup(List<String> participants) {
    this.participantsGroup = participants;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Integer getNumberOfParticipants() {
    return numberOfParticipants;
  }

  public void setNumberOfParticipants(Integer numberOfParticipants) {
    this.numberOfParticipants = numberOfParticipants;
  }

  public String getClassification() {
    return classification;
  }

  public void setClassification(String classification) {
    this.classification = classification;
  }

  public String getDepartment() {
    return department;
  }

  public void setDepartment(String department) {
    this.department = department;
  }
}
