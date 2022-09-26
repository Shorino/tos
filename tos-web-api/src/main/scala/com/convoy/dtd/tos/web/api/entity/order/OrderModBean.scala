package com.convoy.dtd.tos.web.api.entity.order

class OrderModBean(val itemName: String,
                   val quantity: Long,
                   val username: String,
                   val password: String,
                   val teaSession: Long){
  def print(): Unit ={
    println("itemName: " + itemName)
    println("quantity: " + quantity)
    println("username: " + username)
    println("password: " + password)
    println("teaSession: " + teaSession)
  }
}