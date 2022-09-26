package com.convoy.dtd.tos.web.core.dao.impl

import com.convoy.dtd.johnston.domain.jpa.dao.AbstractGenericDao
import com.convoy.dtd.tos.web.api.entity.QUserBean
import com.convoy.dtd.tos.web.api.entity.user.UserBean
import com.convoy.dtd.tos.web.core.dao.UserDao
import com.querydsl.jpa.impl.JPAQueryFactory
import org.springframework.stereotype.Repository

import scala.collection.JavaConverters.asScalaBufferConverter

@Repository
private[impl] class UserDaoImpl extends AbstractGenericDao[UserBean, Long] with UserDao {
  override def existsName(username: String): Boolean = {
    val q = new JPAQueryFactory(entityManager)
    !q.selectFrom(QUserBean).where(QUserBean.username === username).fetch().isEmpty
  }

  override def getByName(username: String): Option[UserBean] = {
    val q = new JPAQueryFactory(entityManager)
    q.selectFrom(QUserBean).where(QUserBean.username === username).fetch().asScala.toList.headOption
  }
}
