import React, { FC, useEffect, useState } from 'react'
import { FiDelete, FiPlus, FiThumbsUp, FiCheck, FiEdit } from 'react-icons/fi'

// import { useQuery } from 'react-apollo'

// import helloworld from './graphql/helloworld.gql'

import './AdminLeads.css'

import api from './service/api'

interface LeadProps {
  id: string
  name: string
  email: string
  type: string
  fone: string
}

interface Leads {
  ID: string
  lead: LeadProps[]
}

const AdminLeads: FC = () => {
  // const { data } = useQuery(helloworld)
  const [leads, setLeads] = useState<LeadProps[]>()
  // const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    async function getLeads() {
      const all = await api.get('/lead').then((response) => response.data.body)
      const parsedLeads = all.map((item: Leads) => item.lead) as LeadProps[]

      setLeads(parsedLeads)
    }

    getLeads()
  }, [])

  return (
    <div>
      <table>
        <caption>
          Prospecção
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>Status</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {leads?.map((lead) => (
              <tr key={lead.id}>
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.fone}</td>
                <td className="status">
                  {lead.type === 'prospect' ? (
                    <span>
                      <FiThumbsUp />
                    </span>
                  ) : (
                    <span className="lead">
                      <FiCheck />
                    </span>
                  )}
                </td>
                <td>
                  <button>{<FiPlus />}</button>
                  <button>{<FiEdit />}</button>
                  <button>{<FiDelete />}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </caption>
      </table>
    </div>
  )
}

export default AdminLeads
