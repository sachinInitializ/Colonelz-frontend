import { Button, Card } from '@/components/ui'
import React, { useEffect } from 'react'
import Subtasks from '../Subtasks/Subtasks'
import { useLocation } from 'react-router-dom'
import { apiGetCrmProjectsSingleTaskData } from '@/services/CrmService'
import AddSubTask from '../Subtasks/AddSubtask'
import EditTask from '../EditTask'

type CustomerInfoFieldProps = {
    title?: string
    value?: any
}

const TaskDetails = () => {
    const location=useLocation();
    const queryParams=new URLSearchParams(location.search);
    const task_id=queryParams.get('task') 
    const project_id=queryParams.get('project_id')
    console.log(task_id,project_id);
    

    const [taskData, setTaskData] = React.useState<any>([])
    useEffect(() => {
        const fetchData = async () => {
            const response = await apiGetCrmProjectsSingleTaskData(project_id,task_id);
            setTaskData(response.data[0]);
        }
        fetchData();
    }
    , [project_id,task_id])

    console.log(taskData);
    const header = (
        <div className="flex items-center justify-between mt-2">
            <h5 className="pl-5">Task-{taskData.task_name}</h5>
        </div>
    )
    
    const cardFooter = (
        <EditTask Data={taskData} task={true}/>
    )


    const CustomerInfoField = ({ title, value }: CustomerInfoFieldProps) => {
        return (
            <div className='flex gap-1 mb-2 pt-1'>
                <span className='text-gray-700 dark:text-gray-200 font-semibold'>{title}:</span>
                <p className="" style={{overflowWrap:"break-word"}}>
                {value }
                </p>
            </div>
        )
    }
    const formateDate = (dateString:string) => {
        const date = new Date(dateString);
        const day=date.getDate().toString().padStart(2, '0');
        const month=(date.getMonth() + 1).toString().padStart(2, '0');
        const year=date.getFullYear();
        return `${day}-${month}-${year}`;
        }

  return (
    <>
  
    <h3 className='mb-6'>Task Details</h3>
    <div className='flex flex-col gap-5 sm:flex-row'>
        <div className='sm:w-1/3 '>
    <Card 
                clickable
                className="hover:shadow-lg transition p-2 duration-150 ease-in-out dark:border dark:border-gray-600 dark:border-solid"
                header={header}
                footer={cardFooter}
                headerClass="p-0"
                footerBorder={false}
                headerBorder={false}
            >
                <CustomerInfoField title='Task Created On' value={formateDate(taskData.task_createdOn)}/>
                <CustomerInfoField title='Task Created By' value={taskData.task_createdBy}/>
                <br />
                <CustomerInfoField title='Task Name' value={taskData.task_name}/>
                <CustomerInfoField title='Task Status' value={taskData.task_status}/>
                <CustomerInfoField title='Task Priority' value={taskData.task_priority}/>
                <CustomerInfoField title='Actual Task Start Date' value={formateDate(taskData.actual_task_start_date)}/>
                <CustomerInfoField title='Actual Task End Date' value={formateDate(taskData.actual_task_end_date)}/>
                <CustomerInfoField title='Estimated Task Start Date' value={formateDate(taskData.estimated_task_start_date)}/>
                <CustomerInfoField title='Estimated Task End Date' value={formateDate(taskData.estimated_task_end_date)}/>
                <CustomerInfoField title='Task Assignee' value={taskData.task_assignee}/>
                <CustomerInfoField title='Reporter' value={taskData.reporter}/>
                <CustomerInfoField title='Number of subtasks' value={taskData.number_of_subtasks}/>
                <div><p><span className='text-gray-700 dark:text-gray-200 font-semibold'>Description:</span>{taskData.task_description}</p></div>
            </Card>
            </div>
            <div className='sm:w-2/3'>
          
                <div className='flex justify-between mb-4 items-center'>
                <h5>Subtasks</h5>
                <AddSubTask  task={{taskid:taskData.task_id,project_id:taskData.project_id}}/>
                </div>
            
            <Subtasks task={task_id}/>
            </div>
    </div>
    </>
  )
}

export default TaskDetails