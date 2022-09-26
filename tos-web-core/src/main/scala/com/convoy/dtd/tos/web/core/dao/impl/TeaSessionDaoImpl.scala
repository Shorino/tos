package com.convoy.dtd.tos.web.core.dao.impl

import com.convoy.dtd.johnston.domain.jpa.dao.AbstractGenericDao
import com.convoy.dtd.tos.web.api.entity.QTeaSessionBean
import com.convoy.dtd.tos.web.api.entity.teasession.TeaSessionBean
import com.convoy.dtd.tos.web.core.dao.TeaSessionDao
import com.querydsl.jpa.impl.JPAQueryFactory
import org.springframework.stereotype.Repository

import scala.collection.JavaConverters.asScalaBufferConverter

@Repository
private[impl] class TeaSessionDaoImpl extends AbstractGenericDao[TeaSessionBean, Long] with TeaSessionDao {
  override def findByVisibility(visibility: Boolean): List[TeaSessionBean] = {
    val q = new JPAQueryFactory(entityManager)
    q.selectFrom(QTeaSessionBean).where(QTeaSessionBean.visibility === visibility).fetch().asScala.toList
  }
}
