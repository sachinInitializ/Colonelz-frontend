import { CalendarView } from '@/components/shared'
import { apiGetCrmProjectsTaskData } from '@/services/CrmService'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const Timeline = () => {
    const location=useLocation()
    const queryParams = new URLSearchParams(location.search);
    const projectId=queryParams.get('project_id') || '';
    const [taskData,setTaskData]=useState<any>(null)
    function formatDate(inputDate: string): string {
        const date = new Date(inputDate);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed, add 1 to match calendar months
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
  
    useEffect(() => {
        const TaskData=async()=>{
            const response = await apiGetCrmProjectsTaskData(projectId);
            setTaskData(response.data)
        }
        TaskData();
  
    }, [])
   console.log(taskData);
   
  const event=taskData?.map((task:any)=>({start:formatDate(task.estimated_task_start_date),end:formatDate(task.estimated_task_end_date),title:task.task_name,
    eventColor:['A',"D"].includes(task.task_name[0])?'blue':'red'})
)
console.log(event);

   return( <div><CalendarView
    editable
                selectable
                events={event}
               /></div>
  )
}

export default Timeline