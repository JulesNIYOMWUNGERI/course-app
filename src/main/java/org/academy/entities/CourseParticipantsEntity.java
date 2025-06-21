package org.academy.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "course_participants")
public class CourseParticipantsEntity extends BaseEntity {
  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "course_id", nullable = false)
  private CourseEntity course;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "user_id", nullable = false)
  private UserEntity user;

  public CourseEntity getCourse() {
    return course;
  }

  public void setCourse(CourseEntity course) {
    this.course = course;
  }

  public UserEntity getUser() {
    return user;
  }

  public void setUser(UserEntity user) {
    this.user = user;
  }
}
