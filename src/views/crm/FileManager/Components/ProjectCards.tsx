import { Card } from '@/components/ui'
import React from 'react'
import { ProjectDataItem } from './type';

interface CardsProps {
    data: ProjectDataItem; // Assuming LeadDataItem is the type for your data
  }

const Cards: React.FC<CardsProps> = ({ data }) => {
  return (
    <div><Card>
       <p>Project Id: {data.project_id}</p>
       <p>Project Name: {data.project_Name}</p>
        </Card></div>
  )
}

export default Cards