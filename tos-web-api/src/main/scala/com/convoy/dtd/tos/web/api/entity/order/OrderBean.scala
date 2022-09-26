package com.convoy.dtd.tos.web.api.entity.order

import javax.persistence._

@SerialVersionUID(1L)
@Entity
@Table(name="order_data")
class OrderBean {
  @Id
  @GeneratedValue(strategy=GenerationType.IDENTITY)
  @Column(name="order_id")
  var orderId: Long = _

  @Column(name="item_name")
  var itemName: String = _

  @Column(name="quantity")
  var quantity: Long = 1

  @Column(name="created_by")
  var createdBy: Long = _

  @Column(name="tea_session")
  var teaSession: Long = _

  def this(orderModBean: OrderModBean, createdBy: Long){
    this()
    itemName = orderModBean.itemName
    quantity = orderModBean.quantity
    if(quantity <= 0) quantity = 1
    this.createdBy = createdBy
    teaSession = orderModBean.teaSession
  }

  def replaceWith(orderBean: OrderBean): Unit ={
    itemName = orderBean.itemName
    quantity = orderBean.quantity
    if(quantity <= 0) quantity = 1
  }
}