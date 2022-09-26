package com.convoy.dtd.tos.web.api.entity.teasession

import java.util.Date
import javax.persistence._

@SerialVersionUID(1L)
@Entity
@Table(name="tea_session")
class TeaSessionBean {
  @Id
  @GeneratedValue(strategy=GenerationType.IDENTITY)
  @Column(name="tea_session_id")
  var teaSessionId: Long = _

  @Column(name="name")
  var name: String = _

  @Column(name="description")
  var description: String = _

  @Column(name="created_by")
  var createdBy: Long = _

  @Column(name="password")
  var password: String = _

  @Column(name="treat_date")
  var treatDate: Date = _

  @Column(name = "cut_off_Date")
  var cutOffDate: Date = _

  @Column(name = "visibility")
  var visibility: Boolean = _

  @Column(name = "menu")
  var menu: Array[Byte] = _

  def this(name:String, description:String, treatDate:Date, cutOffDate:Date, visibility:Boolean, menu:Array[Byte]){
    this()
    this.name = name
    this.description = description
    this.treatDate = treatDate
    this.cutOffDate = cutOffDate
    this.visibility = visibility
    this.menu = menu
  }

  def getSummary(): TeaSessionSummaryBean = new TeaSessionSummaryBean(teaSessionId, name, description, menu)

  def print(): Unit = {
    println("teaSessionId: " + teaSessionId)
    println("name: " + name)
    println("description: " + description)
    println("createdBy: " + createdBy)
    println("password: " + password)
    println("treatDate: " + treatDate)
    println("cutOffDate: " + cutOffDate)
    println("visibility: " + visibility)
    println("menu: " + menu)
  }

  def hidePassword(username:String): TeaSessionHidePasswordBean = {
    var hasPassword = true;
    if(password == null) hasPassword = false
    new TeaSessionHidePasswordBean(teaSessionId, name, description, username, hasPassword, treatDate, cutOffDate, visibility, menu)
  }

  def replaceWith(teaSessionBean: TeaSessionBean): Unit ={
    name = teaSessionBean.name
    description = teaSessionBean.description
    treatDate = teaSessionBean.treatDate
    cutOffDate = teaSessionBean.cutOffDate
    visibility = teaSessionBean.visibility
    menu = teaSessionBean.menu
  }
}