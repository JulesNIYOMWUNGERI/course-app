package org.academy.repositories;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.academy.entities.CourseDocumentsEntity;

@ApplicationScoped
public class CourseDocumentRepository implements PanacheRepository<CourseDocumentsEntity> {
}
