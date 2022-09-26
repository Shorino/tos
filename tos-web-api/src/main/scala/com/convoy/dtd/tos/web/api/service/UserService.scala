package com.convoy.dtd.tos.web.api.service

import com.convoy.dtd.tos.web.api.entity.user.{UserBean, UserCredentialBean, UserEnableBean}

trait UserService {
  def validateUserPassword(userCredentialBean: UserCredentialBean, callback: UserBean => Unit): Unit

  def validateUserAdmin(userBean: UserBean, callback: () => Unit): Unit

  def create(userCreationBean: UserCredentialBean):Unit

  def login(userCredentialBean: UserCredentialBean):Unit

  def delete(userCredentialBean: UserCredentialBean):Unit

  def enable(userEnableBean: UserEnableBean):Unit
}
