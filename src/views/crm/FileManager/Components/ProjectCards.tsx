import { Card } from '@/components/ui'
import React from 'react'
import { ProjectDataItem } from './type';
import { useNavigate } from 'react-router-dom';
import { GoProjectRoadmap } from 'react-icons/go';

interface CardsProps {
    data: ProjectDataItem; // Assuming LeadDataItem is the type for your data
  }
  const Cards: React.FC<CardsProps> = ({ data }) => {
  const navigate=useNavigate();
  return (
    <div><Card className=' cursor-pointer' onClick={()=>navigate(`/app/crm/fileManager/project?project_id=${data.project_id}`)}>
       <div className=' flex sm:flex-row justify-between items-center flex-col gap-2'>
     <div className=' text-xl '> <GoProjectRoadmap className={` text-amber-500`}/> </div>
      <div>
       <p>Project Id: {data.project_id}</p>
       <p>Project Name: {data.project_Name}</p>
       </div>
       </div>
        </Card></div>
  )
}

export default Cards