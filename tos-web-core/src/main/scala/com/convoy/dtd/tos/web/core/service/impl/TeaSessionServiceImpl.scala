package com.convoy.dtd.tos.web.core.service.impl

import com.convoy.dtd.tos.web.api.entity.teasession.{TeaSessionBean, TeaSessionChangePasswordAdminBean, TeaSessionChangePasswordBean, TeaSessionHidePasswordBean, TeaSessionShowUsernameBean, TeaSessionSummaryBean}
import com.convoy.dtd.tos.web.api.entity.user.{UserBean, UserCredentialBean}
import com.convoy.dtd.tos.web.api.service.TeaSessionService
import com.convoy.dtd.tos.web.core.dao.{TeaSessionDao, UserDao}
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

import java.util.Date
import javax.inject.Inject

@Service
class TeaSessionServiceImpl extends TeaSessionService {
  @Inject
  private var teaSessionDao: TeaSessionDao = _
  @Inject
  private var userDao: UserDao = _

  override def validateDate(teaSessionShowUsernameBean: TeaSessionShowUsernameBean, callback: () => Unit): Unit = {
    val time = new Date().getTime
    val todayDate = new Date(time - time % (24 * 60 * 60 * 1000))
    if (teaSessionShowUsernameBean.treatDate.before(teaSessionShowUsernameBean.cutOffDate)) {
      throw new RuntimeException("Treat date should be assign after cut off date")
    }
    else if (teaSessionShowUsernameBean.cutOffDate.before(todayDate)) {
      throw new RuntimeException("Cut off data should be assign after today's date")
    }
    else callback()
  }

  override def validateTeaSessionPassword(teaSessionId: Long, password: String, callback: TeaSessionBean => Unit): Unit = {
    val teaSessionOption = teaSessionDao.getById(teaSessionId)
    if (teaSessionOption.isDefined) {
      if (teaSessionOption.get.password != null && teaSessionOption.get.password != password) {
        throw new RuntimeException("Password mismatch")
      }
      else callback(teaSessionOption.get)
    }
    else throw new RuntimeException("Tea session with id " + teaSessionId + " does not exists")
  }

  override def validateUserAdminPassword(userCredentialBean: UserCredentialBean, callback: UserBean => Unit): Unit = {
    if (userCredentialBean.username == null) throw new RuntimeException("Username cannot be null value")
    val userOption = userDao.getByName(userCredentialBean.username)
    if (userOption.isDefined) {
      if (userOption.get.password != null && userOption.get.password != userCredentialBean.password) {
        throw new RuntimeException("Password mismatch")
      }
      else if (!userOption.get.isAdmin) {
        throw new RuntimeException("Admin permission required")
      }
      else callback(userOption.get)
    }
    else throw new RuntimeException("Username " + userCredentialBean.username + " does not exists")
  }

  @Transactional
  override def getAllSummary(userCredentialBean: UserCredentialBean): List[TeaSessionSummaryBean] = {
    var teaSessionBeans: List[TeaSessionSummaryBean] = null
    validateUserAdminPassword(userCredentialBean, userBeanInDb=>{
      val teaSessions = teaSessionDao.findAllAsScala()
      teaSessionBeans = teaSessions.map(teaSession => teaSession.getSummary())
    })
    teaSessionBeans
  }

  @Transactional
  override def getPublicSummary(): List[TeaSessionSummaryBean] = {
    var teaSessions = teaSessionDao.findByVisibility(true)
    teaSessions.map(teaSession => teaSession.getSummary())
  }

  @Transactional
  override def getByName(name: String): List[TeaSessionSummaryBean] = {
    var teaSessions = teaSessionDao.findByName(name)
    teaSessions.map(teaSession => teaSession.getSummary())
  }

  @Transactional
  override def get(teaSessionId: Long): TeaSessionHidePasswordBean = {
    var teaSessionOption = teaSessionDao.getById(teaSessionId)
    if (teaSessionOption.isDefined) teaSessionOption.get.hidePassword(userDao.getById(teaSessionOption.get.createdBy).get.username)
    else throw new RuntimeException("Tea session with id " + teaSessionId + " does not exists")
  }

  @Transactional
  override def create(teaSessionShowUsernameBean: TeaSessionShowUsernameBean): Unit = {
    validateDate(teaSessionShowUsernameBean, ()=>{
      val teaSessionBean = new TeaSessionBean(
        teaSessionShowUsernameBean.name,
        teaSessionShowUsernameBean.description,
        teaSessionShowUsernameBean.treatDate,
        teaSessionShowUsernameBean.cutOffDate,
        teaSessionShowUsernameBean.visibility,
        teaSessionShowUsernameBean.menu
      )
      teaSessionBean.createdBy = userDao.getByName(teaSessionShowUsernameBean.username).get.userId
      teaSessionBean.password = teaSessionShowUsernameBean.password
      teaSessionDao.add(teaSessionBean)
    })
  }

  @Transactional
  override def modify(teaSessionId: Long, teaSessionShowUsernameBean: TeaSessionShowUsernameBean): Unit = {
    validateDate(teaSessionShowUsernameBean, ()=>{
      validateTeaSessionPassword(teaSessionId, teaSessionShowUsernameBean.password, teaSessionBeanInDb=>{
        val teaSessionBean = new TeaSessionBean(
          teaSessionShowUsernameBean.name,
          teaSessionShowUsernameBean.description,
          teaSessionShowUsernameBean.treatDate,
          teaSessionShowUsernameBean.cutOffDate,
          teaSessionShowUsernameBean.visibility,
          teaSessionShowUsernameBean.menu
        )
        teaSessionBeanInDb.replaceWith(teaSessionBean)
      })
    })
  }

  @Transactional
  override def modifyPassword(teaSessionId: Long, teaSessionChangePasswordBean: TeaSessionChangePasswordBean): Unit = validateTeaSessionPassword(teaSessionId, teaSessionChangePasswordBean.oldPassword, teaSessionBeanInDb=>teaSessionBeanInDb.password = teaSessionChangePasswordBean.newPassword)

  @Transactional
  override def delete(teaSessionId: Long, password: String): Unit = validateTeaSessionPassword(teaSessionId, password, teaSessionBeanInDb=>teaSessionDao.deleteById(teaSessionId))

  @Transactional
  override def modifyAdmin(teaSessionId: Long, teaSessionShowUsernameBean: TeaSessionShowUsernameBean): Unit = {
    validateDate(teaSessionShowUsernameBean, () => {
      validateUserAdminPassword(new UserCredentialBean(teaSessionShowUsernameBean.username, teaSessionShowUsernameBean.password), userBeanInDb => {
        val teaSessionBean = new TeaSessionBean(
          teaSessionShowUsernameBean.name,
          teaSessionShowUsernameBean.description,
          teaSessionShowUsernameBean.treatDate,
          teaSessionShowUsernameBean.cutOffDate,
          teaSessionShowUsernameBean.visibility,
          teaSessionShowUsernameBean.menu
        )
        val teaSessionOption = teaSessionDao.getById(teaSessionId)
        if(teaSessionOption.isDefined) teaSessionOption.get.replaceWith(teaSessionBean)
        else throw new RuntimeException("Tea session with id " + teaSessionId + " does not exists")
      })
    })
  }

  @Transactional
  override def modifyPasswordAdmin(teaSessionId: Long, teaSessionChangePasswordAdminBean: TeaSessionChangePasswordAdminBean): Unit = {
    validateUserAdminPassword(new UserCredentialBean(teaSessionChangePasswordAdminBean.username, teaSessionChangePasswordAdminBean.userPassword), userBeanInDb=>{
      val teaSessionOption = teaSessionDao.getById(teaSessionId)
      if (teaSessionOption.isDefined) teaSessionOption.get.password = teaSessionChangePasswordAdminBean.teaSessionPassword
      else throw new RuntimeException("Tea session with id " + teaSessionId + " does not exists")
    })
  }

  @Transactional
  override def deleteAdmin(teaSessionId: Long, userCredentialBean: UserCredentialBean): Unit = validateUserAdminPassword(userCredentialBean, userBeanInDb=>{
    val teaSessionExists = teaSessionDao.exists(teaSessionId)
    if(teaSessionExists) teaSessionDao.deleteById(teaSessionId)
    else throw new RuntimeException("Tea session with id " + teaSessionId + " does not exists")
  })
}