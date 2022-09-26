package com.convoy.dtd.tos.web.api.service

import com.convoy.dtd.tos.web.api.entity.order.{OrderBean, OrderModBean, OrderShowUsernameBean}
import com.convoy.dtd.tos.web.api.entity.teasession.TeaSessionBean
import com.convoy.dtd.tos.web.api.entity.user.{UserBean, UserCredentialBean}

trait OrderService {
  def validateUsername(username: String, callback: UserBean => Unit): Unit

  def validateUserPassword(userCredentialBean: UserCredentialBean, callback: UserBean => Unit): Unit

  def validateUserAdmin(userBean: UserBean, callback: () => Unit): Unit

  def validateUserEnable(userBean: UserBean, callback: () => Unit):Unit

  def validateOrderBelonging(orderId: Long, userId: Long, callback: OrderBean => Unit): Unit

  def validateOrderExists(orderId: Long, callback: OrderBean => Unit): Unit

  def validateTeaSessionCutOffTime(teaSessionId: Long, callback: TeaSessionBean => Unit): Unit

  def getAll(orderModBean: OrderModBean): List[OrderShowUsernameBean]

  def create(orderModBean: OrderModBean): Unit

  def modify(orderId: Long, orderModBean: OrderModBean): Unit

  def delete(orderId: Long, userCredentialBean: UserCredentialBean): Unit

  def modifyAdmin(orderId: Long, orderModBean: OrderModBean): Unit

  def deleteAdmin(orderId:Long, userCredentialBean: UserCredentialBean): Unit
}