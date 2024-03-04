import { Card } from '@/components/ui'
import React from 'react'
import { LeadDataItem } from './type';
import { useNavigate } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa';
import { useTheme } from '@emotion/react';

interface CardsProps {
    data: LeadDataItem; // Assuming LeadDataItem is the type for your data
  }
  const Cards: React.FC<CardsProps> = ({ data }) => {
  const navigate=useNavigate();
  const theme=useTheme()
  return (
    <div><Card className=' cursor-pointer ' onClick={()=>navigate(`/app/crm/fileManager/leads?lead_id=${data.lead_id}`)}>
    <div className=' flex sm:flex-row justify-between items-center flex-col gap-2'>
     <div className=' text-xl '> <FaRegUser className={`${theme} text-amber-500`}/> </div>
      <div>
       <p>Lead Id: {data.lead_id}</p>
       <p>Lead Name: {data.lead_Name}</p>
       </div>
       </div>
        </Card></div>
        
  )
}

export default Cards