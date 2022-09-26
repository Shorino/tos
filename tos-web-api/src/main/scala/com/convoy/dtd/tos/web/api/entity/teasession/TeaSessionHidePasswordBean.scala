package com.convoy.dtd.tos.web.api.entity.teasession

import java.util.Date

class TeaSessionHidePasswordBean(val teaSessionId: Long,
                                 val name: String,
                                 val description: String,
                                 val username: String,
                                 val hasPassword: Boolean,
                                 val treatDate: Date,
                                 val cutOffDate: Date,
                                 val visibility: Boolean,
                                 val menu: Array[Byte]) {}