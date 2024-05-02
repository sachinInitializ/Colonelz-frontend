import { Card } from '@/components/ui'
import React from 'react'
import { FaHome, FaRegBuilding, FaRegFolderOpen } from 'react-icons/fa'
import { MdOutlineMiscellaneousServices } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const Template = () => {
  const navigate=useNavigate()
  const role = localStorage.getItem('role')
  return (
    <div className='grid xl:grid-cols-4 sm:grid-cols-3 gap-4 cursor-pointer'>
     {role !== 'Jr. Executive HR & Marketing' && (
  <>
    <Card 
      className=''
      onClick={()=>navigate('/app/crm/fileManager/project/templates/commercial')} 
    >  
      <div className='flex gap-4 '>
        <div className=' text-lg' ><FaRegBuilding/></div>
        <p> Commecial</p>
      </div>
    </Card>
    <Card onClick={()=>navigate('/app/crm/fileManager/project/templates/residential')}>
      <div className='flex gap-4 '>
        <div className=' text-lg' ><FaHome/></div>
        <p> Residential</p>
      </div>
    </Card>
  </>
)}
      <Card onClick={()=>navigate('/app/crm/fileManager/project/templates/miscellaneous/subfolder?type=company data&folder=company policies')}>  <div className='flex gap-4'>
          <div className=' text-lg ' ><FaRegFolderOpen/></div>
       <p> Company Policies</p>
        </div></Card>
      
      </div>
  )
}

export default Template