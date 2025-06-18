package org.academy.repositories;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import org.academy.entities.CourseParticipantsEntity;

@ApplicationScoped
public class CourseParticipantsRepository implements PanacheRepository<CourseParticipantsEntity> {
}
