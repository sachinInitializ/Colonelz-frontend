import { Card } from '@/components/ui'
import React from 'react'
import { FaFolder } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Commercial = () => {
    const navigate=useNavigate()
  return (
    <div className='grid grid-cols-3 gap-4'>
     <Card onClick={()=>navigate('/app/crm/fileManager/project/templates/commercial/subfolder')}>
      <div className='flex gap-4'>
      <div className={` text-xl mr-3 text-yellow-500`}>
                                  <FaFolder />
                              </div>
     <p> Design</p>
      </div></Card>
  
    <Card onClick={()=>navigate('/app/crm/fileManager/project/templates/commercial/subfolder')}>
      <div className='flex gap-4'>
      <div className={` text-xl mr-3 text-yellow-500`}>
                                  <FaFolder />
                              </div>
     <p> Design and Execution</p>
      </div></Card>
    
    </div>
  )
}

export default Commercial