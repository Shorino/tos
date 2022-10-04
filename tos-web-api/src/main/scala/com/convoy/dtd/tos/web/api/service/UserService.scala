package com.convoy.dtd.tos.web.api.service

import com.convoy.dtd.tos.web.api.entity.user.{UserBean, UserChangePasswordBean, UserCredentialBean, UserEnableBean}

trait UserService {
  def validateUserPassword(userCredentialBean: UserCredentialBean, callback: UserBean => Unit): Unit

  def validateUserAdmin(userBean: UserBean, callback: () => Unit): Unit

  def create(userCreationBean: UserCredentialBean):Unit

  def login(userCredentialBean: UserCredentialBean):UserBean

  def delete(userCredentialBean: UserCredentialBean):Unit

  def enable(userEnableBean: UserEnableBean):Unit

  def getAllUsers(userCredentialBean: UserCredentialBean):List[UserBean]

  def changePassword(userChangePasswordBean: UserChangePasswordBean):Unit
}
