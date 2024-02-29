import { Card } from '@/components/ui'
import React from 'react'
import { ProjectDataItem } from './type';
import { useNavigate } from 'react-router-dom';

interface CardsProps {
    data: ProjectDataItem; // Assuming LeadDataItem is the type for your data
  }
  const Cards: React.FC<CardsProps> = ({ data }) => {
  const navigate=useNavigate();
  return (
    <div><Card className=' cursor-pointer' onClick={()=>navigate(`/app/crm/fileManager/project?project_id=${data.project_id}`)}>
       <p>Project Id: {data.project_id}</p>
       <p>Project Name: {data.project_Name}</p>
        </Card></div>
  )
}

export default Cards