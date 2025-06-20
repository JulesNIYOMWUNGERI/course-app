package org.academy.repositories;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import java.util.List;
import org.academy.dtos.response.CoursePaginatedResponseDTO;
import org.academy.entities.CourseEntity;

@ApplicationScoped
public class CourseRepository implements PanacheRepository<CourseEntity> {

  public CoursePaginatedResponseDTO<CourseEntity> findCourses(
      int page, int size, String name, String department, String classification) {

    CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();

    CriteriaQuery<CourseEntity> query = cb.createQuery(CourseEntity.class);
    Root<CourseEntity> root = query.from(CourseEntity.class);
    Predicate predicate = buildPredicate(cb, root, name, department, classification);
    query.select(root).where(predicate);

    List<CourseEntity> courses =
        getEntityManager()
            .createQuery(query)
            .setFirstResult((page - 1) * size)
            .setMaxResults(size)
            .getResultList();

    CriteriaQuery<Long> countQuery = cb.createQuery(Long.class);
    Root<CourseEntity> countRoot = countQuery.from(CourseEntity.class);
    Predicate countPredicate = buildPredicate(cb, countRoot, name, department, classification);
    countQuery.select(cb.count(countRoot)).where(countPredicate);

    Long totalCount = getEntityManager().createQuery(countQuery).getSingleResult();

    return new CoursePaginatedResponseDTO<>(courses, totalCount);
  }

  private Predicate buildPredicate(
      CriteriaBuilder cb,
      Root<CourseEntity> root,
      String name,
      String department,
      String classification) {

    Predicate predicate = cb.conjunction();

    if (name != null && !name.isBlank()) {
      predicate =
          cb.and(predicate, cb.like(cb.lower(root.get("name")), "%" + name.toLowerCase() + "%"));
    }

    if (department != null && !department.isBlank()) {
      predicate =
          cb.and(predicate, cb.equal(cb.lower(root.get("department")), department.toLowerCase()));
    }

    if (classification != null && !classification.isBlank()) {
      predicate =
          cb.and(
              predicate,
              cb.equal(cb.lower(root.get("classification")), classification.toLowerCase()));
    }

    return predicate;
  }
}
