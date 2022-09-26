package com.convoy.dtd.tos.web.api.entity.teasession

import com.querydsl.core.types._
import com.querydsl.scala._

import com.querydsl.core.types.PathMetadataFactory._;

object QTeaSessionBean extends QTeaSessionBean("teaSessionBean") {
  override def as(variable: String) = new QTeaSessionBean(variable)
  
}

class QTeaSessionBean(cl: Class[_ <: TeaSessionBean], md: PathMetadata) extends EntityPathImpl[TeaSessionBean](cl, md) {
  def this(variable: String) = this(classOf[TeaSessionBean], forVariable(variable))

  def this(parent: Path[_], variable: String) = this(classOf[TeaSessionBean], forProperty(parent, variable))

  val createdBy = createNumber[Long]("createdBy")

  val cutOffDate = createDateTime[java.util.Date]("cutOffDate")

  val description = createString("description")

  val menu = createArray[Array[Byte]]("menu")

  val name = createString("name")

  val password = createString("password")

  val teaSessionId = createNumber[Long]("teaSessionId")

  val treatDate = createDateTime[java.util.Date]("treatDate")

  val visibility = createBoolean("visibility")

}

