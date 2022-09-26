package com.convoy.dtd.tos.web.core.mvc

import com.convoy.dtd.tos.web.api.entity.Response
import com.convoy.dtd.tos.web.api.entity.order.OrderModBean
import com.convoy.dtd.tos.web.api.entity.user.UserCredentialBean
import com.convoy.dtd.tos.web.api.service.OrderService
import org.springframework.web.bind.annotation.{PathVariable, RequestBody, RequestMapping, RequestMethod, RestController}

import javax.inject.Inject

@RestController
@RequestMapping(value = Array("/order"), method = Array(RequestMethod.POST))
private[mvc] class OrderController {
  @Inject
  private var orderService: OrderService = _

  @RequestMapping(value = Array("get-all"))
  def getAll(@RequestBody orderModBean: OrderModBean): Response = {
    try {
      new Response(orderService.getAll(orderModBean))
    }
    catch {
      case e: Throwable => new Response(null, false, e.getMessage)
    }
  }

  @RequestMapping(value = Array("create"))
  def create(@RequestBody orderModBean: OrderModBean): Response = {
    try {
      orderService.create(orderModBean)
      new Response(null)
    }
    catch {
      case e: Throwable => new Response(null, false, e.getMessage)
    }
  }

  @RequestMapping(value = Array("modify/{orderId}"))
  def modify(@PathVariable("orderId") orderId: Long, @RequestBody orderModBean: OrderModBean): Response = {
    try {
      orderService.modify(orderId, orderModBean)
      new Response(null)
    }
    catch {
      case e: Throwable => new Response(null, false, e.getMessage)
    }
  }

  @RequestMapping(value = Array("delete/{orderId}"))
  def delete(@PathVariable("orderId") orderId: Long, @RequestBody userCredentialBean: UserCredentialBean): Response = {
    try {
      orderService.delete(orderId, userCredentialBean)
      new Response(null)
    }
    catch {
      case e: Throwable => new Response(null, false, e.getMessage)
    }
  }

  @RequestMapping(value = Array("modify-admin/{orderId}"))
  def modifyAdmin(@PathVariable("orderId") orderId: Long, @RequestBody orderModBean: OrderModBean): Response = {
    try {
      orderService.modifyAdmin(orderId, orderModBean)
      new Response(null)
    }
    catch {
      case e: Throwable => new Response(null, false, e.getMessage)
    }
  }

  @RequestMapping(value = Array("delete-admin/{orderId}"))
  def deleteAdmin(@PathVariable("orderId") orderId: Long, @RequestBody userCredentialBean: UserCredentialBean): Response = {
    try {
      orderService.deleteAdmin(orderId, userCredentialBean)
      new Response(null)
    }
    catch {
      case e: Throwable => new Response(null, false, e.getMessage)
    }
  }
}