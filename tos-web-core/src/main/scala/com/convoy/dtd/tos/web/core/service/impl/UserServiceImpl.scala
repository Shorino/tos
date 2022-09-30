package com.convoy.dtd.tos.web.core.service.impl

import com.convoy.dtd.tos.web.api.entity.user.{UserBean, UserCredentialBean, UserEnableBean}
import com.convoy.dtd.tos.web.api.service.UserService
import com.convoy.dtd.tos.web.core.dao.UserDao
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

import java.util.Date
import javax.inject.Inject

@Service
class UserServiceImpl extends UserService {
  @Inject
  private var userDao: UserDao = _

  override def validateUserPassword(userCredentialBean: UserCredentialBean, callback: UserBean => Unit): Unit = {
    if (userCredentialBean.username == null) throw new RuntimeException("Username cannot be null value")
    val userOption = userDao.getByName(userCredentialBean.username)
    if (userOption.isDefined) {
      if (userOption.get.password != null && userOption.get.password != userCredentialBean.password) {
        throw new RuntimeException("Password mismatch")
      }
      else callback(userOption.get)
    }
    else throw new RuntimeException("Username " + userCredentialBean.username + " does not exists")
  }

  override def validateUserAdmin(userBean: UserBean, callback: () => Unit): Unit = {
    if (!userBean.isAdmin) {
      throw new RuntimeException("Admin permission required")
    } else callback()
  }

  @Transactional
  override def create(userCredentialBean: UserCredentialBean): Unit = {
    if(userDao.existsName(userCredentialBean.username)) throw new RuntimeException("Username taken")
    else userDao.add(new UserBean(userCredentialBean))
  }

  @Transactional
  override def login(userCredentialBean: UserCredentialBean): UserBean = {
    var userBean:UserBean = null
    validateUserPassword(userCredentialBean, userBeanInDb=>{
      if(!userBeanInDb.enable && !userBeanInDb.isAdmin) throw new RuntimeException("Username " + userBeanInDb.username + " has been disabled by admin")
      userBeanInDb.lastLoginDate = new Date
      userBean = userBeanInDb
    })
    userBean
  }

  @Transactional
  override def delete(userCredentialBean: UserCredentialBean): Unit = validateUserPassword(userCredentialBean, userBeanInDb=>userDao.deleteById(userBeanInDb.userId))

  @Transactional
  override def enable(userEnableBean: UserEnableBean): Unit = {
    validateUserPassword(new UserCredentialBean(userEnableBean.username, userEnableBean.password), userBeanInDb=>{
      validateUserAdmin(userBeanInDb, ()=>{
        var enableString = "disabled"
        if (userEnableBean.enable) enableString = "enabled"
        if(userEnableBean.usernameToEnable == null) throw new RuntimeException("Username to " + enableString + " cannot be null value")
        val userOption = userDao.getByName(userEnableBean.usernameToEnable)
        if(userOption.isDefined) userOption.get.enable = userEnableBean.enable
        else {
          throw new RuntimeException("Username " + userEnableBean.usernameToEnable + " can't be " + enableString + " because it does not exists")
        }
      })
    })
  }
}
