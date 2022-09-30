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
  def create(@RequestBody userCreationBean: UserCredentialBean): Response = {
    try {
      userService.create(userCreationBean)
      new Response(null)
    }
    catch{
      case e:Throwable => new Response(null, false, e.getMessage)
    }
  }

  @RequestMapping(value = Array("login"))
  def login(@RequestBody userCreationBean: UserCredentialBean): Response = {
    try {
      new Response(userService.login(userCreationBean))
    }
    catch {
      case e: Throwable => new Response(null, false, e.getMessage)
    }
  }

  @RequestMapping(value = Array("delete"))
  def delete(@RequestBody userCreationBean: UserCredentialBean): Response = {
    try {
      userService.delete(userCreationBean)
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
}
