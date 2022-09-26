package com.convoy.dtd.tos.web.api.entity

import com.convoy.dtd.tos.web.api.entity.user.UserBean
import com.querydsl.core.types._
import com.querydsl.scala._
import com.querydsl.core.types.PathMetadataFactory._;

object QUserBean extends QUserBean("userBean") {
  override def as(variable: String) = new QUserBean(variable)
  
}

class QUserBean(cl: Class[_ <: UserBean], md: PathMetadata) extends EntityPathImpl[UserBean](cl, md) {
  def this(variable: String) = this(classOf[UserBean], forVariable(variable))

  def this(parent: Path[_], variable: String) = this(classOf[UserBean], forProperty(parent, variable))

  val enable = createBoolean("enable")

  val isAdmin = createBoolean("isAdmin")

  val lastLoginDate = createDate[java.time.LocalDate]("lastLoginDate")

  val password = createString("password")

  val userId = createNumber[Long]("userId")

  val username = createString("username")

}

