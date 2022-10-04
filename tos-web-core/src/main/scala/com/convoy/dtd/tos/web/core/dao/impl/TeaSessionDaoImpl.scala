package com.convoy.dtd.tos.web.core.dao.impl

import com.convoy.dtd.johnston.domain.jpa.dao.AbstractGenericDao
import com.convoy.dtd.tos.web.api.entity.QTeaSessionBean
import com.convoy.dtd.tos.web.api.entity.teasession.TeaSessionBean
import com.convoy.dtd.tos.web.core.dao.TeaSessionDao
import com.querydsl.core.types.{Order, OrderSpecifier}
import com.querydsl.jpa.impl.JPAQueryFactory
import org.springframework.stereotype.Repository

import scala.collection.JavaConverters.asScalaBufferConverter

@Repository
private[impl] class TeaSessionDaoImpl extends AbstractGenericDao[TeaSessionBean, Long] with TeaSessionDao {
  override def findByVisibility(visibility: Boolean): List[TeaSessionBean] = {
    val q = new JPAQueryFactory(entityManager)
    q.selectFrom(QTeaSessionBean).where(QTeaSessionBean.visibility === visibility).fetch().asScala.toList
  }

  override def findByName(name: String, isAdmin: Boolean): List[TeaSessionBean] = {
    val q = new JPAQueryFactory(entityManager)
    if(isAdmin){
      q.selectFrom(QTeaSessionBean).where(QTeaSessionBean.name.containsIgnoreCase(name)).fetch().asScala.toList
    }
    else{
      q.selectFrom(QTeaSessionBean).where(QTeaSessionBean.name.containsIgnoreCase(name)).where(QTeaSessionBean.visibility === true).fetch().asScala.toList
    }
  }

  override def getLastId(): Long = {
    val q = new JPAQueryFactory(entityManager)
    q.selectFrom(QTeaSessionBean).select(QTeaSessionBean.teaSessionId.max).fetchOne()
  }
}
