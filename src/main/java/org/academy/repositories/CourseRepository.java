package org.academy.repositories;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import java.util.List;
import org.academy.entities.CourseEntity;

@ApplicationScoped
public class CourseRepository implements PanacheRepository<CourseEntity> {
  public long countFiltered(String name, String department, String classification) {
    CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
    CriteriaQuery<Long> query = cb.createQuery(Long.class);
    Root<CourseEntity> root = query.from(CourseEntity.class);

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

    query.select(cb.count(root)).where(predicate);
    return getEntityManager().createQuery(query).getSingleResult();
  }

  public List<CourseEntity> findCourse(
      int page, int size, String name, String department, String classification) {
    CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
    CriteriaQuery<CourseEntity> query = cb.createQuery(CourseEntity.class);
    Root<CourseEntity> root = query.from(CourseEntity.class);
    Predicate predicate = cb.conjunction();

    if (name != null && !name.isEmpty()) {
      predicate =
          cb.and(predicate, cb.like(cb.lower(root.get("name")), "%" + name.toLowerCase() + "%"));
    }
    if (department != null && !department.isEmpty()) {
      predicate = cb.and(predicate, cb.equal(root.get("department"), department));
    }
    if (classification != null && !classification.isEmpty()) {
      predicate = cb.and(predicate, cb.equal(root.get("classification"), classification));
    }

    query.where(predicate);
    return getEntityManager()
        .createQuery(query)
        .setFirstResult((page - 1) * size)
        .setMaxResults(size)
        .getResultList();
  }
}
