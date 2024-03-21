import { Button } from '@/components/ui'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Contract = () => {
  const navigate=useNavigate()
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const project_type = queryParams.get('project_type');
  return (
    <div className='flex justify-end'>
      <Button variant='solid' onClick={()=>navigate(`/app/crm/contract?project_type=${project_type}`)}>Contract</Button>
    </div>
  )
}

export default Contract