package com.convoy.dtd.tos.web.core.dao

import com.convoy.dtd.johnston.domain.api.dao.GenericDao
import com.convoy.dtd.tos.web.api.entity.order.OrderBean

trait OrderDao extends GenericDao[OrderBean, Long] {
  def getByCreatedBy(createdBy: Long): List[OrderBean]
  def getByTeaSession(teaSession: Long): List[OrderBean]
  def getByCreatedByAndTeaSession(createdBy: Long, teaSession: Long): List[OrderBean]
}