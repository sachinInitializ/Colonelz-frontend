import { Card } from '@/components/ui'
import React from 'react'
import { FaHome } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Template = () => {
  const navigate=useNavigate()
  return (
    <div className='grid grid-cols-3 gap-4'>
      <Card onClick={()=>navigate('/app/crm/fileManager/project/templates/commercial')}>Commercial</Card>
    
      <Card onClick={()=>navigate('/app/crm/fileManager/project/templates/residential')}>
        <div className='flex gap-4'>
          <div className=' text-lg' ><FaHome/></div>
       <p> Residential</p>
        </div></Card>
      
      </div>
  )
}

export default Template