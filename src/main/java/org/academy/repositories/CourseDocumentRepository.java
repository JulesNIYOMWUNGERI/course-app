package org.academy.repositories;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import java.util.List;
import java.util.UUID;
import org.academy.entities.BaseEntity_;
import org.academy.entities.CourseDocumentsEntity;
import org.academy.entities.CourseDocumentsEntity_;

@ApplicationScoped
public class CourseDocumentRepository implements PanacheRepository<CourseDocumentsEntity> {
  public CourseDocumentsEntity findById(UUID id) {
    CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
    CriteriaQuery<CourseDocumentsEntity> query = cb.createQuery(CourseDocumentsEntity.class);
    Root<CourseDocumentsEntity> root = query.from(CourseDocumentsEntity.class);
    query.select(root).where(cb.equal(root.get(BaseEntity_.ID), id));
    return getEntityManager().createQuery(query).getResultList().stream().findFirst().orElse(null);
  }

  public List<CourseDocumentsEntity> findByCourseDocuments(UUID courseId) {
    CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
    CriteriaQuery<CourseDocumentsEntity> cq = cb.createQuery(CourseDocumentsEntity.class);
    Root<CourseDocumentsEntity> courseDocument = cq.from(CourseDocumentsEntity.class);
    Predicate courseIdPredicate =
        cb.equal(courseDocument.get(CourseDocumentsEntity_.course).get(BaseEntity_.ID), courseId);
    cq.select(courseDocument).where(courseIdPredicate);
    return getEntityManager().createQuery(cq).getResultList();
  }
}
