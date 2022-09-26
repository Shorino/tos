package com.convoy.dtd.tos.web.api.entity.user

import java.util.Date
import javax.persistence._

@SerialVersionUID(1L)
@Entity
@Table(name="user_data")
class UserBean {
  @Id
  @GeneratedValue(strategy=GenerationType.IDENTITY)
  @Column(name="user_id")
  var userId: Long = _

  @Column(name="username")
  var username: String = _

  @Column(name="password")
  var password: String = _

  @Column(name="enable")
  var enable: Boolean = true

  @Column(name="last_login_date")
  var lastLoginDate: Date = _

  @Column(name="is_admin")
  var isAdmin: Boolean = false

  def this(userCreationBean: UserCredentialBean){
    this()
    username = userCreationBean.username
    password = userCreationBean.password
  }

  def print(): Unit = {
    println("userId: " + userId)
    println("username: " + username)
    println("password: " + password)
    println("enable: " + enable)
    println("password: " + password)
    println("lastLoginDate: " + lastLoginDate)
    println("isAdmin: " + isAdmin)
  }
}
