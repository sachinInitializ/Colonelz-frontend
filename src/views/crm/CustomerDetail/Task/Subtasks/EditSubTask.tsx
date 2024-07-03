import { useState } from 'react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import { Field, Form, Formik, FormikContext } from 'formik'
import { DatePicker, FormItem, Input, Notification, Select, Tooltip, toast } from '@/components/ui'
import { apiGetCrmProjectsAddSubTask, apiGetCrmProjectsAddTask, apiGetCrmProjectsSubTaskUpdate } from '@/services/CrmService'
import { MdOutlineAdd } from 'react-icons/md'
import { HiOutlinePencil } from 'react-icons/hi'
import { useLocation } from 'react-router-dom'

type SubTask = {
    project_id: string;
    task_id: string;
    sub_task_id: string;
    sub_task_name: string;
    sub_task_description: string;
    actual_sub_task_start_date: string;
    actual_sub_task_end_date: string;
    estimated_sub_task_start_date: string;
    estimated_sub_task_end_date: string;
    sub_task_status: string;
    sub_task_priority: string;
    sub_task_createdOn: string;
    sub_task_reporter: string;
    sub_task_createdBy: string;
    sub_task_assignee: string;
};

  type Data={
    Data:SubTask
  }

const EditSubTask = (task:Data) => {
    const [dialogIsOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const location=useLocation();
    const queryParams=new URLSearchParams(location.search);
    const project_id=queryParams.get('project_id')
const openDialog = () => {
    setIsOpen(true)
}

const onDialogClose = () => {
    setIsOpen(false)
}

const priorityOptions = [
    { label: "Low", value: "Low" },
    { label: "Medium", value: "Medium" },
    { label: "High", value: "High" },
  ];
  
  const statusOptions = [
    { label: "On Work", value: "On Work" },
    { label: "Completed", value: "Completed" },
    { label: "Pending", value: "Pending" },
    { label: "Cancelled", value: "Cancelled" },
  ];
  
  console.log(task);
  

    return (
        <div>
            <div onClick={openDialog} className=' flex justify-center items-center gap-1'><HiOutlinePencil/></div>
            <Dialog isOpen={dialogIsOpen} onClose={onDialogClose} onRequestClose={onDialogClose}>
                <div className="pl-4 ">
                    <h3>Edit Subtask</h3>
                </div>
                <Formik 
                       initialValues={{
                        user_id: localStorage.getItem('userId') || '',
                        project_id: project_id || '',
                        task_id: task.Data.task_id,
                        sub_task_id: task.Data.sub_task_id,
                        sub_task_name: task.Data.sub_task_name,
                        sub_task_description: task.Data.sub_task_description,
                        actual_sub_task_start_date: new Date(task.Data.actual_sub_task_start_date),
                        actual_sub_task_end_date: new Date(task.Data.actual_sub_task_end_date),
                        estimated_sub_task_start_date: new Date(task.Data.estimated_sub_task_start_date),
                        estimated_sub_task_end_date: new Date(task.Data.estimated_sub_task_end_date),
                        sub_task_status: task.Data.sub_task_status, 
                        sub_task_priority: task.Data.sub_task_priority, 
                        sub_task_assignee: task.Data.sub_task_assignee,
                        sub_task_reporter: task.Data.sub_task_reporter,
                      }}
                     onSubmit={async(values, actions) => {
                        setLoading(true)
                        try{
                            const response = await apiGetCrmProjectsSubTaskUpdate(values)
                            console.log('response', response);
                            setLoading(false)
                            if(response.code===200){
                                toast.push(
                                    <Notification closable type='success' duration={2000}>Subtask Updated Successfully</Notification>
                                )
                            }
                        }
                        catch(error){
                            setLoading(false)
                            console.error('Error Adding Task:', error);
                        }
                            
                     }}
                     >
                        <Form className=' p-4 max-h-96 overflow-y-auto'>
                            <div className=' grid grid-cols-2 gap-x-5'>
                            <FormItem label='Subtask Name'>
                                <Field name='sub_task_name'  component={Input} placeholder='Subtask Name'/>
                            </FormItem>
                            <FormItem label='Subtask Assignee'>
                                <Field name='sub_task_assignee'  component={Input} placeholder='Subtask Assignee'/>
                            </FormItem>
                            <FormItem label='Subtask Status'>
                                <Field name='sub_task_status'  placeholder=''>
                                    {({field}:any)=>(
                                        <Select
                                        options={statusOptions}
                                        name='sub_task_status'
                                        value={statusOptions.find((option)=>option.value===task.Data.sub_task_status)}
                                        onChange={(value) => { field.onChange({ target: {name:'sub_task_status', value: value?.value } }) }}
                                        />
                                    )}
                                </Field>
                            </FormItem>
                            <FormItem label='Actual Start Date'>
                                <Field name='actual_sub_task_start_date'  placeholder='Start date'>
                                    {({field}:any)=>(
                                        <DatePicker name='actual_sub_task_start_date'
                                        value={field.value}
                                        onChange={(value) => { field.onChange({ target: {name:'actual_sub_task_start_date', value: `${value}` } }) }}
                                        />
                                    )}
                                </Field>
                            </FormItem>
                            <FormItem label='Actual End Date'>
                                <Field name='actual_sub_task_end_date' placeholder='End Date'>
                                    {({field}:any)=>(
                                        <DatePicker name='actual_sub_task_end_date'
                                        value={field.value}
                                        onChange={(value) => { field.onChange({ target: {name:'actual_sub_task_end_date', value: `${value }`} }) }}
                                        />
                                    )}
                                </Field>
                            </FormItem>

                            <FormItem label='Estimated Start Date'>
                                <Field name='estimated_sub_task_start_date'  placeholder='Start date'>
                                    {({field}:any)=>(
                                        <DatePicker name='estimated_sub_task_start_date'
                                        value={field.value}
                                        onChange={(value) => { field.onChange({ target: {name:'estimated_sub_task_start_date', value: `${value}` } }) }}
                                        />
                                    )}
                                </Field>
                            </FormItem>

                            <FormItem label='Estimated End Date'>
                                <Field name='estimated_sub_task_end_date' placeholder='End Date'>
                                    {({field}:any)=>(
                                        <DatePicker name='estimated_sub_task_end_date'
                                        value={field.value}
                                        onChange={(value) => { field.onChange({ target: {name:'estimated_sub_task_end_date', value: `${value }`} }) }}
                                        />
                                    )}
                                </Field>
                            </FormItem>
                            <FormItem label='Reporting To'>
                                <Field name='sub_task_reporter'  component={Input} placeholder='Reporting to'/>
                            </FormItem>
                            <FormItem label='Priority'>
                                <Field name='sub_task_priority'  placeholder='Task Priority'>
                                    {({field}:any)=>(
                                        <Select
                                        name='sub_task_priority'
                                        options={priorityOptions}
                                        value={priorityOptions.find((option)=>option.value===task.Data.sub_task_priority)}
                                        onChange={(value) => { field.onChange({ target: {name:'sub_task_priority', value: value?.value } }) }}
                                        />
                                    )}          
                                </Field>
                            </FormItem>
                            </div>
                            <FormItem label='Desription'>
                                <Field name='sub_task_description' placeholder='Task Description'>
                                    {({field}:any)=>{
                                        return (
                                            <Input textArea name='sub_task_description'
                                            {...field}/>
                                        )
                                    }}
                                </Field>
                            </FormItem>
                            <div className='flex justify-end'>
                                <Button type='submit' variant='solid' size='sm' loading={loading}>{loading?'Updating':'Update Subtask'}</Button>
                            </div>
                        </Form>
                </Formik>
            </Dialog>
        </div>
    )
}

export default EditSubTask