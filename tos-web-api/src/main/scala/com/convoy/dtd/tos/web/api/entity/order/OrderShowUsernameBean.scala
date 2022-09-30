package com.convoy.dtd.tos.web.api.entity.order

class OrderShowUsernameBean(var orderId: Long,
                            val itemName: String,
                            val quantity: Long,
                            val username: String,
                            val teaSession: Long,
                            val teaSessionName: String) {}