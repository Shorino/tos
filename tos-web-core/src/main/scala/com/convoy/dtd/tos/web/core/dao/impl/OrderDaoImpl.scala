package com.convoy.dtd.tos.web.core.dao.impl

import com.convoy.dtd.johnston.domain.jpa.dao.AbstractGenericDao
import com.convoy.dtd.tos.web.api.entity.QOrderBean
import com.convoy.dtd.tos.web.api.entity.order.OrderBean
import com.convoy.dtd.tos.web.core.dao.OrderDao
import com.querydsl.jpa.impl.JPAQueryFactory
import org.springframework.stereotype.Repository

import scala.collection.JavaConverters.asScalaBufferConverter

@Repository
private[impl] class OrderDaoImpl extends AbstractGenericDao[OrderBean, Long] with OrderDao {
  override def getByCreatedBy(createdBy: Long): List[OrderBean] = {
    val q = new JPAQueryFactory(entityManager)
    q.selectFrom(QOrderBean).where(QOrderBean.createdBy === createdBy).fetch().asScala.toList
  }

  override def getByTeaSession(teaSession: Long): List[OrderBean] = {
    val q = new JPAQueryFactory(entityManager)
    q.selectFrom(QOrderBean).where(QOrderBean.teaSession === teaSession).fetch().asScala.toList
  }

  override def getByCreatedByAndTeaSession(createdBy: Long, teaSession: Long): List[OrderBean] = {
    val q = new JPAQueryFactory(entityManager)
    q.selectFrom(QOrderBean).where(QOrderBean.createdBy === createdBy).where(QOrderBean.teaSession === teaSession).fetch().asScala.toList
  }
}