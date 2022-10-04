package com.convoy.dtd.tos.web.core.mvc

import com.convoy.dtd.tos.web.api.entity.Response
import com.convoy.dtd.tos.web.api.entity.user.{UserCredentialBean, UserEnableBean}
import com.convoy.dtd.tos.web.api.service.UserService
import org.springframework.web.bind.annotation.{RequestBody, RequestMapping, RequestMethod, RestController}

import javax.inject.Inject

@RestController
@RequestMapping(value = Array("/user"), method = Array(RequestMethod.POST))
private[mvc] class UserController {
  @Inject
  private var userService: UserService = _

  @RequestMapping(value = Array("create"))
  def create(@RequestBody userCredentialBean: UserCredentialBean): Response = {
    try {
      userService.create(userCredentialBean)
      new Response(null)
    }
    catch{
      case e:Throwable => new Response(null, false, e.getMessage)
    }
  }

  @RequestMapping(value = Array("login"))
  def login(@RequestBody userCredentialBean: UserCredentialBean): Response = {
    try {
      new Response(userService.login(userCredentialBean))
    }
    catch {
      case e: Throwable => new Response(null, false, e.getMessage)
    }
  }

  @RequestMapping(value = Array("delete"))
  def delete(@RequestBody userCredentialBean: UserCredentialBean): Response = {
    try {
      userService.delete(userCredentialBean)
      new Response(null)
    }
    catch {
      case e: Throwable => new Response(null, false, e.getMessage)
    }
  }

  @RequestMapping(value = Array("enable"))
  def enable(@RequestBody userLockBean: UserEnableBean): Response = {
    try {
      userService.enable(userLockBean)
      new Response(null)
    }
    catch {
      case e: Throwable => new Response(null, false, e.getMessage)
    }
  }

  @RequestMapping(value = Array("get-all"))
  def getAll(@RequestBody userCredentialBean: UserCredentialBean): Response = {
    try {
      new Response(userService.getAllUsers(userCredentialBean))
    }
    catch {
      case e: Throwable => new Response(null, false, e.getMessage)
    }
  }
}
