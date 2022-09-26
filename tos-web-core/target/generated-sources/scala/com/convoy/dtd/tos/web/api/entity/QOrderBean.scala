package com.convoy.dtd.tos.web.api.entity

import com.convoy.dtd.tos.web.api.entity.order.OrderBean
import com.querydsl.core.types._
import com.querydsl.scala._
import com.querydsl.core.types.PathMetadataFactory._;

object QOrderBean extends QOrderBean("orderBean") {
  override def as(variable: String) = new QOrderBean(variable)
  
}

class QOrderBean(cl: Class[_ <: OrderBean], md: PathMetadata) extends EntityPathImpl[OrderBean](cl, md) {
  def this(variable: String) = this(classOf[OrderBean], forVariable(variable))

  def this(parent: Path[_], variable: String) = this(classOf[OrderBean], forProperty(parent, variable))

  val createdBy = createNumber[Long]("createdBy")

  val itemName = createString("itemName")

  val orderId = createNumber[Long]("orderId")

  val quantity = createNumber[Long]("quantity")

  val teaSession = createNumber[Long]("teaSession")

}

