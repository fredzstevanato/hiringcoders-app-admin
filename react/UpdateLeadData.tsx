import React, { useEffect, useState } from 'react'
import api from './service/api'

//import { } from 'vtex.styleguide'

interface LeadProps {
  name: string
  ID: string
  type: string
  fone: string
  updated_at: string
}

const UpdateLeadData: StorefrontFunctionComponent = () => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    async function getUrl() {
      const response = await api.get(`https://stevanato--hiringcoders202105.myvtex.com/api/vtexid/pub/authenticated/user`)

      if (response.data.user) {
        setEmail(response.data.user)
        return
      }
    }
    getUrl()
    console.log(email)
  }, [email])

  useEffect(() => {
    async function sendEmailAws(email: string) {
      const headers = {
        headers: {
          'Content-Type': 'application/json',
          'header1': email
        }
      }
      await api.patch('/leads', headers) as LeadProps;
    }

    sendEmailAws(email)
  }, [email])


  return (
    <div>
      <p>{email || 'Email não capturadado ->'}</p>
    </div>
  )
}

export default UpdateLeadData
