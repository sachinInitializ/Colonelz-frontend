import { Card } from '@/components/ui'
import React from 'react'
import { LeadDataItem } from './type';
import { useNavigate } from 'react-router-dom';

interface CardsProps {
    data: LeadDataItem; // Assuming LeadDataItem is the type for your data
  }
  const Cards: React.FC<CardsProps> = ({ data }) => {
  const navigate=useNavigate();
  return (
    <div><Card className=' cursor-pointer' onClick={()=>navigate(`/app/crm/fileManager/lead?lead_id=${data.lead_id}`)}>
       <p>Lead Id: {data.lead_id}</p>
       <p>Lead Name: {data.lead_Name}</p>
        </Card></div>
  )
}

export default Cards