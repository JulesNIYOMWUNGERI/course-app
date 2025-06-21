package org.academy.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "course_documents")
public class CourseDocumentsEntity extends BaseEntity {
    @Column(name = "name")
    private String documentName;

    @Column(name = "file_data", columnDefinition = "TEXT")
    private String fileData;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "course_id", nullable = false)
    private CourseEntity course;

    public String getDocumentName() {
        return documentName;
    }

    public void setDocumentName(String documentName) {
        this.documentName = documentName;
    }

    public String getFileData() {
        return fileData;
    }

    public void setFileData(String fileData) {
        this.fileData = fileData;
    }

    public CourseEntity getCourse() {
        return course;
    }

    public void setCourse(CourseEntity course) {
        this.course = course;
    }
}
