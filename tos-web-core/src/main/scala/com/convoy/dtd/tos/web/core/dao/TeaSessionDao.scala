package com.convoy.dtd.tos.web.core.dao

import com.convoy.dtd.johnston.domain.api.dao.GenericDao
import com.convoy.dtd.tos.web.api.entity.teasession.TeaSessionBean
import org.springframework.data.jpa.repository.Query

trait TeaSessionDao extends GenericDao[TeaSessionBean, Long] {
  def findByVisibility(visibility:Boolean):List[TeaSessionBean]
  def findByName(name:String):List[TeaSessionBean]
  def getLastId():Long
}
