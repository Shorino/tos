package com.convoy.dtd.tos.web.api.service

import com.convoy.dtd.tos.web.api.entity.teasession.{TeaSessionBean, TeaSessionChangePasswordAdminBean, TeaSessionChangePasswordBean, TeaSessionGetByNameBean, TeaSessionHidePasswordBean, TeaSessionShowUsernameBean, TeaSessionSummaryBean}
import com.convoy.dtd.tos.web.api.entity.user.{UserBean, UserCredentialBean}

trait TeaSessionService {
  def validateDate(teaSessionShowUsernameBean: TeaSessionShowUsernameBean, callback: () => Unit): Unit

  def validateTeaSessionPassword(teaSessionId: Long, password: String, callback: TeaSessionBean => Unit): Unit

  def validateUserAdminPassword(userCredentialBean: UserCredentialBean, callback: UserBean => Unit): Unit

  def validateUsername(userCredentialBean: UserCredentialBean, callback: UserBean => Unit): Unit

  def getAllSummary(userCredentialBean: UserCredentialBean): List[TeaSessionSummaryBean]

  def getByName(teaSessionGetByNameBean:TeaSessionGetByNameBean): List[TeaSessionSummaryBean]

  def get(teaSessionId: Long): TeaSessionHidePasswordBean

  def create(teaSessionShowUsernameBean: TeaSessionShowUsernameBean): Long

  def modify(teaSessionId: Long, teaSessionShowUsernameBean: TeaSessionShowUsernameBean): Long

  def modifyPassword(teaSessionId: Long, teaSessionChangePasswordBean: TeaSessionChangePasswordBean): Unit

  def delete(teaSessionId: Long, password: String): Unit

  def modifyAdmin(teaSessionId: Long, teaSessionShowUsernameBean: TeaSessionShowUsernameBean): Unit

  def modifyPasswordAdmin(teaSessionId: Long, teaSessionChangePasswordAdminBean: TeaSessionChangePasswordAdminBean): Unit

  def deleteAdmin(teaSessionId: Long, userCredentialBean: UserCredentialBean): Unit
}