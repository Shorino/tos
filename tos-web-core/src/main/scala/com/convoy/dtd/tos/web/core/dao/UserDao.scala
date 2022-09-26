package com.convoy.dtd.tos.web.core.dao

import com.convoy.dtd.johnston.domain.api.dao.GenericDao
import com.convoy.dtd.tos.web.api.entity.user.UserBean

trait UserDao extends GenericDao[UserBean, Long] {
  def existsName(username:String):Boolean
  def getByName(username:String):Option[UserBean]
}
