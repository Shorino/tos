package com.convoy.dtd.tos.web.api.entity.user

class UserEnableBean(val username: String,
                     val password: String,
                     val usernameToEnable: String,
                     val enable: Boolean) {}