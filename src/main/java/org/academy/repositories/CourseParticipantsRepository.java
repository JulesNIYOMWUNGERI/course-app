package org.academy.repositories;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.NoResultException;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.academy.entities.BaseEntity_;
import org.academy.entities.CourseParticipantsEntity;
import org.academy.entities.CourseParticipantsEntity_;

import java.util.List;
import java.util.UUID;

@ApplicationScoped
public class CourseParticipantsRepository implements PanacheRepository<CourseParticipantsEntity> {
    public CourseParticipantsEntity findById(UUID id) {
        CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
        CriteriaQuery<CourseParticipantsEntity> query = cb.createQuery(CourseParticipantsEntity.class);
        Root<CourseParticipantsEntity> root = query.from(CourseParticipantsEntity.class);
        query.select(root).where(cb.equal(root.get(BaseEntity_.ID), id));
        return getEntityManager().createQuery(query).getSingleResult();
    }

<<<<<<< HEAD
  public Long findCourseCount(UUID courseId) {
    CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
    CriteriaQuery<Long> query = cb.createQuery(Long.class);
    Root<CourseParticipantsEntity> root = query.from(CourseParticipantsEntity.class);
    Predicate predicate =
        cb.equal(root.get(CourseParticipantsEntity_.course).get(BaseEntity_.ID), courseId);
    query.select(cb.count(root)).where(predicate);
    return getEntityManager().createQuery(query).getSingleResult();
  }

  public List<CourseParticipantsEntity> findCourseParticipants(UUID courseId, UUID userId) {
    CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
    CriteriaQuery<CourseParticipantsEntity> query = cb.createQuery(CourseParticipantsEntity.class);
    Root<CourseParticipantsEntity> root = query.from(CourseParticipantsEntity.class);
    Predicate predicate = cb.conjunction();
    if (userId != null) {
      predicate =
          cb.and(
              predicate,
              cb.equal(root.get(CourseParticipantsEntity_.user).get(BaseEntity_.ID), userId));
=======
    public Long findCourseCount(UUID courseId) {
        CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
        CriteriaQuery<Long> query = cb.createQuery(Long.class);
        Root<CourseParticipantsEntity> root = query.from(CourseParticipantsEntity.class);
        Predicate predicate = cb.equal(root.get(CourseParticipantsEntity_.course).get(BaseEntity_.ID), courseId);
        query.select(cb.count(root)).where(predicate);
        return getEntityManager().createQuery(query).getSingleResult();
>>>>>>> d8811fb (fix/course_participants)
    }

    public List<CourseParticipantsEntity> findCourseParticipants(UUID courseId, UUID userId) {
        CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
        CriteriaQuery<CourseParticipantsEntity> query = cb.createQuery(CourseParticipantsEntity.class);
        Root<CourseParticipantsEntity> root = query.from(CourseParticipantsEntity.class);
        Predicate predicate = cb.conjunction();
        if (userId != null) {
            predicate =
                    cb.and(
                            predicate,
                            cb.equal(root.get(CourseParticipantsEntity_.user).get(BaseEntity_.ID), userId));
        }
        if (courseId != null) {
            predicate =
                    cb.and(
                            predicate,
                            cb.equal(root.get(CourseParticipantsEntity_.course).get(BaseEntity_.ID), courseId));
        }
        query.where(predicate);
        return getEntityManager().createQuery(query).getResultList();
    }

    public CourseParticipantsEntity findByCourseAndUser(UUID courseId, UUID userId) {
        CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
        CriteriaQuery<CourseParticipantsEntity> query = cb.createQuery(CourseParticipantsEntity.class);
        Root<CourseParticipantsEntity> root = query.from(CourseParticipantsEntity.class);
        Predicate predicate = cb.conjunction();
        if (courseId != null) {
            predicate =
                    cb.and(
                            predicate,
                            cb.equal(root.get(CourseParticipantsEntity_.course).get(BaseEntity_.ID), courseId));
        }
        if (userId != null) {
            predicate =
                    cb.and(
                            predicate,
                            cb.equal(root.get(CourseParticipantsEntity_.user).get(BaseEntity_.ID), userId));
        }
        query.select(root).where(predicate);
        try {
            return getEntityManager().createQuery(query).getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }
}
