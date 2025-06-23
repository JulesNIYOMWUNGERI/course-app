package org.academy.repositories;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.NoResultException;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import java.util.List;
import java.util.UUID;
import org.academy.entities.BaseEntity_;
import org.academy.entities.UserEntity;
import org.academy.entities.UserEntity_;

@ApplicationScoped
public class UserRepository implements PanacheRepository<UserEntity> {
  public List<UserEntity> getAllUsers() {
    CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
    CriteriaQuery<UserEntity> cq = cb.createQuery(UserEntity.class);
    Root<UserEntity> user = cq.from(UserEntity.class);

    cq.select(user);
    cq.orderBy(cb.desc(user.get(UserEntity_.createdAt)));

    return getEntityManager().createQuery(cq).getResultList();
  }

  public UserEntity findByUsername(String firstName, String lastName) {
    CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
    CriteriaQuery<UserEntity> cq = cb.createQuery(UserEntity.class);
    Root<UserEntity> user = cq.from(UserEntity.class);

    Predicate firstNamePredicate = cb.equal(user.get(UserEntity_.firstName), firstName);
    Predicate lastNamePredicate = cb.equal(user.get(UserEntity_.lastName), lastName);

    cq.select(user).where(cb.and(firstNamePredicate, lastNamePredicate));

    try {
      return getEntityManager().createQuery(cq).getSingleResult();
    } catch (NoResultException e) {
      return null;
    }
  }

  public UserEntity findUserById(UUID id) {
    CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
    CriteriaQuery<UserEntity> cq = cb.createQuery(UserEntity.class);
    Root<UserEntity> user = cq.from(UserEntity.class);

    cq.select(user).where(cb.equal(user.get(BaseEntity_.ID), id));

    try {
      return getEntityManager().createQuery(cq).getSingleResult();
    } catch (NoResultException e) {
      return null;
    }
  }

  public void merge(UserEntity user) {
    getEntityManager().merge(user);
  }
}
