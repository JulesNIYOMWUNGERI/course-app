package org.academy.repositories;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import java.util.List;
import java.util.UUID;
import org.academy.entities.CourseParticipantsEntity;

@ApplicationScoped
public class CourseParticipantsRepository implements PanacheRepository<CourseParticipantsEntity> {
  public List<CourseParticipantsEntity> findCourseParticipants(UUID courseId, UUID userId) {
    CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
    CriteriaQuery<CourseParticipantsEntity> query = cb.createQuery(CourseParticipantsEntity.class);
    Root<CourseParticipantsEntity> root = query.from(CourseParticipantsEntity.class);
    Predicate predicate = cb.conjunction();
    if (userId != null) {
      predicate = cb.and(predicate, cb.equal(root.get("user").get("id"), userId));
    }
    if (courseId != null) {
      predicate = cb.and(predicate, cb.equal(root.get("course").get("id"), courseId));
    }
    query.where(predicate);
    return getEntityManager().createQuery(query).getResultList();
  }
}
