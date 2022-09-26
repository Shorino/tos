package com.convoy.dtd.tos.web.core.service.impl

import com.convoy.dtd.tos.web.api.entity.order.{OrderBean, OrderModBean, OrderShowUsernameBean}
import com.convoy.dtd.tos.web.api.entity.teasession.TeaSessionBean
import com.convoy.dtd.tos.web.api.entity.user.{UserBean, UserCredentialBean}
import com.convoy.dtd.tos.web.api.service.OrderService
import com.convoy.dtd.tos.web.core.dao.{OrderDao, TeaSessionDao, UserDao}
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

import java.util.Date
import javax.inject.Inject

@Service
class OrderServiceImpl extends OrderService {
  @Inject
  private var orderDao: OrderDao = _
  @Inject
  private var teaSessionDao: TeaSessionDao = _
  @Inject
  private var userDao: UserDao = _

  override def validateUsername(username: String, callback: UserBean => Unit): Unit = {
    if (username == null) throw new RuntimeException("Username cannot be null value")
    val userOption = userDao.getByName(username)
    if (userOption.isDefined) callback(userOption.get)
    else throw new RuntimeException("Username " + username + " does not exists")
  }

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
    if(!userBean.isAdmin) throw new RuntimeException("Admin permission required")
    else callback()
  }

  override def validateUserEnable(userBean: UserBean, callback: () => Unit): Unit = {
    if (!userBean.enable && !userBean.isAdmin) throw new RuntimeException("Username " + userBean.username + " has been disabled by admin")
    else callback()
  }

  override def validateOrderBelonging(orderId: Long, userId: Long, callback: OrderBean => Unit): Unit = {
    val orderOption = orderDao.getById(orderId)
    if (orderOption.isDefined) {
      if (orderOption.get.createdBy != userId) {
        throw new RuntimeException("Order belongs to other user")
      }
      else callback(orderOption.get)
    }
    else throw new RuntimeException("Order with id " + orderId + " does not exists")
  }

  override def validateOrderExists(orderId: Long, callback: OrderBean => Unit): Unit = {
    val orderOption = orderDao.getById(orderId)
    if (orderOption.isDefined) callback(orderOption.get)
    else throw new RuntimeException("Order with id " + orderId + " does not exists")
  }

  override def validateTeaSessionCutOffTime(teaSessionId: Long, callback: TeaSessionBean => Unit): Unit = {
    var teaSessionOption = teaSessionDao.getById(teaSessionId)
    if (teaSessionOption.isDefined) {
      if (new Date().after(teaSessionOption.get.cutOffDate)) {
        throw new RuntimeException("Order time ended")
      }
      else callback(teaSessionOption.get)
    }
    else throw new RuntimeException("Tea session with id " + teaSessionId + " does not exists")
  }

  @Transactional
  override def getAll(orderModBean: OrderModBean): List[OrderShowUsernameBean] = {
    var orders: List[OrderBean] = null
    if(orderModBean.username == null){
      if(orderModBean.teaSession > 0){ // get entries based on tea session
        orders = orderDao.getByTeaSession(orderModBean.teaSession)
      }
      else{ // get all entries
        orders = orderDao.findAllAsScala()
      }
    }
    else{
      validateUsername(orderModBean.username, userBeanInDb=>{
        if(orderModBean.teaSession > 0){ // get entries based on user and tea session
          orders = orderDao.getByCreatedByAndTeaSession(userBeanInDb.userId, orderModBean.teaSession)
        }
        else{ // get entries based on user
          orders = orderDao.getByCreatedBy(userBeanInDb.userId)
        }
      })
    }
    orders.map(order => {
      var userOption = userDao.getById(order.createdBy)
      if (userOption.isDefined) new OrderShowUsernameBean(order.orderId, order.itemName, order.quantity, userOption.get.username, order.teaSession)
      else throw new RuntimeException("User with id " + userOption.get.userId + " does not exists")
    })
  }

  @Transactional
  override def create(orderModBean: OrderModBean): Unit = {
    validateUserPassword(new UserCredentialBean(orderModBean.username, orderModBean.password), userBeanInDb=>{
      validateTeaSessionCutOffTime(orderModBean.teaSession, teaSessionBeanInDb=>{
        validateUserEnable(userBeanInDb, ()=>{
          orderDao.add(new OrderBean(orderModBean, userBeanInDb.userId))
        })
      })
    })
  }

  @Transactional
  override def modify(orderId: Long, orderModBean: OrderModBean): Unit = {
    validateUserPassword(new UserCredentialBean(orderModBean.username, orderModBean.password), userBeanInDb=>{
      validateOrderBelonging(orderId, userBeanInDb.userId, orderBeanInDb=>{
        validateTeaSessionCutOffTime(orderBeanInDb.teaSession, teaSessionBeanInDb=>{
          validateUserEnable(userBeanInDb, ()=>{
            orderBeanInDb.replaceWith(new OrderBean(orderModBean, orderBeanInDb.createdBy))
          })
        })
      })
    })
  }

  @Transactional
  override def delete(orderId: Long, userCredentialBean: UserCredentialBean): Unit = {
    validateUserPassword(userCredentialBean, userBeanInDb => {
      validateOrderBelonging(orderId, userBeanInDb.userId, orderBeanInDb => {
        validateTeaSessionCutOffTime(orderBeanInDb.teaSession, teaSessionBeanInDb => {
          validateUserEnable(userBeanInDb, ()=>{
            orderDao.deleteById(orderId)
          })
        })
      })
    })
  }

  @Transactional
  override def modifyAdmin(orderId: Long, orderModBean: OrderModBean): Unit = {
    validateUserPassword(new UserCredentialBean(orderModBean.username, orderModBean.password), userBeanInDb=>{
      validateUserAdmin(userBeanInDb, ()=>{
        validateOrderExists(orderId, orderBeanInDb=>{
          orderBeanInDb.replaceWith(new OrderBean(orderModBean, orderBeanInDb.createdBy))
        })
      })
    })
  }

  @Transactional
  override def deleteAdmin(orderId: Long, userCredentialBean: UserCredentialBean): Unit = {
    validateUserPassword(new UserCredentialBean(userCredentialBean.username, userCredentialBean.password), userBeanInDb => {
      validateUserAdmin(userBeanInDb, () => {
        validateOrderExists(orderId, orderBeanInDb => {
          orderDao.deleteById(orderId)
        })
      })
    })
  }
}