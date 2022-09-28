package com.convoy.dtd.tos.web.core.mvc

import com.convoy.dtd.tos.web.api.entity.teasession.{TeaSessionBean, TeaSessionChangePasswordAdminBean, TeaSessionChangePasswordBean, TeaSessionShowUsernameBean}
import com.convoy.dtd.tos.web.api.entity.Response
import com.convoy.dtd.tos.web.api.entity.user.UserCredentialBean
import com.convoy.dtd.tos.web.api.service.TeaSessionService
import org.springframework.web.bind.annotation.{PathVariable, RequestBody, RequestMapping, RequestMethod, RestController}

import javax.inject.Inject

@RestController
@RequestMapping(value = Array("/tea-session"), method = Array(RequestMethod.POST))
private[mvc] class TeaSessionController
{
  @Inject
  private var teaSessionService:TeaSessionService = _
  
  @RequestMapping(value = Array("get-all-summary"))
  def getAllSummary(@RequestBody userCredentialBean: UserCredentialBean): Response = {
    try {
      new Response(teaSessionService.getAllSummary(userCredentialBean))
    }
    catch {
      case e: Throwable => new Response(null, false, e.getMessage)
    }
  }

  @RequestMapping(value = Array("get-public-summary"))
  def getPublicSummary(): Response = {
    try {
      new Response(teaSessionService.getPublicSummary())
    }
    catch {
      case e: Throwable => new Response(null, false, e.getMessage)
    }
  }

  @RequestMapping(value = Array("get-by-name"))
  def getByName(@RequestBody name:String): Response = {
    try {
      new Response(teaSessionService.getByName(name))
    }
    catch {
      case e: Throwable => new Response(null, false, e.getMessage)
    }
  }

  @RequestMapping(value = Array("get/{teaSessionId}"))
  def get(@PathVariable("teaSessionId") teaSessionId: Long): Response = {
    try{
      new Response(teaSessionService.get(teaSessionId))
    }
    catch{
      case e: Throwable => new Response(null, false, e.getMessage)
    }
  }

  @RequestMapping(value = Array("create"))
  def create(@RequestBody teaSessionShowUsernameBean: TeaSessionShowUsernameBean): Response = {
    try {
      teaSessionService.create(teaSessionShowUsernameBean)
      new Response(null)
    } catch {
      case e: Throwable => new Response(null, false, e.getMessage)
    }
  }

  @RequestMapping(value = Array("modify/{teaSessionId}"))
  def modify(@PathVariable("teaSessionId") teaSessionId: Long, @RequestBody teaSessionShowUsernameBean: TeaSessionShowUsernameBean): Response = {
    try {
      teaSessionService.modify(teaSessionId, teaSessionShowUsernameBean)
      new Response(null)
    }
    catch {
      case e: Throwable => new Response(null, false, e.getMessage)
    }
  }

  @RequestMapping(value = Array("modify-password/{teaSessionId}"))
  def modifyPassword(@PathVariable("teaSessionId") teaSessionId: Long, @RequestBody teaSessionChangePasswordBean: TeaSessionChangePasswordBean): Response ={
    try {
      teaSessionService.modifyPassword(teaSessionId, teaSessionChangePasswordBean)
      new Response(null)
    }
    catch {
      case e: Throwable => new Response(null, false, e.getMessage)
    }
  }

  @RequestMapping(value = Array("delete/{teaSessionId}"))
  def delete(@PathVariable("teaSessionId") teaSessionId: Long, @RequestBody password: String): Response = {
    try{
      teaSessionService.delete(teaSessionId, password)
      new Response(null)
    }
    catch{
      case e:Throwable => new Response(null, false, e.getMessage)
    }
  }

  @RequestMapping(value = Array("modify-admin/{teaSessionId}"))
  def modifyAdmin(@PathVariable("teaSessionId") teaSessionId:Long, @RequestBody teaSessionShowUsernameBean: TeaSessionShowUsernameBean): Response = {
    try {
      teaSessionService.modifyAdmin(teaSessionId, teaSessionShowUsernameBean)
      new Response(null)
    }
    catch {
      case e: Throwable => new Response(null, false, e.getMessage)
    }
  }

  @RequestMapping(value = Array("modify-password-admin/{teaSessionId}"))
  def modifyPasswordAdmin(@PathVariable("teaSessionId") teaSessionId: Long, @RequestBody teaSessionChangePasswordAdminBean: TeaSessionChangePasswordAdminBean): Response = {
    try {
      teaSessionService.modifyPasswordAdmin(teaSessionId, teaSessionChangePasswordAdminBean)
      new Response(null)
    }
    catch {
      case e: Throwable => new Response(null, false, e.getMessage)
    }
  }

  @RequestMapping(value = Array("delete-admin/{teaSessionId}"))
  def deleteAdmin(@PathVariable("teaSessionId") teaSessionId: Long, @RequestBody userCredentialBean: UserCredentialBean): Response = {
    try {
      teaSessionService.deleteAdmin(teaSessionId, userCredentialBean)
      new Response(null)
    }
    catch {
      case e: Throwable => new Response(null, false, e.getMessage)
    }
  }
}