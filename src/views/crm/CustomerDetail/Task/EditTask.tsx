import { useState } from 'react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import { Field, Form, Formik, FormikContext } from 'formik'
import { DatePicker, FormItem, Input, Notification, Select, toast } from '@/components/ui'
import { apiGetCrmProjectsAddTask, apiGetCrmProjectsTaskUpdate } from '@/services/CrmService'
import { HiOutlinePencil } from 'react-icons/hi'

type Task = {
    user_id: string;
    project_id: string;
    task_name: string;
    task_description: string;
   actual_task_start_date: string;
    actual_task_end_date: string;
    estimated_task_start_date: string;
    estimated_task_end_date: string; 
    task_status: string; 
    task_priority: string; 
    task_assignee: string;
    reporter: string;
    task_id: string;
  };
  type Data={
    Data:Task
  }

  interface EditTaskProps extends Data {
    task: boolean;
  }

const EditTask = ({ Data, task }: EditTaskProps) => {
    const [dialogIsOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    console.log(task);
    
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
    { label: "Pending", value: "Pending" },
    { label: "In Progress", value: "In Progress" },
    { label: "Completed", value: "Completed" },
    { label: "Cancelled", value: "Cancelled" },
  ];
  


    return (
        <div>
            <div onClick={openDialog}>{task?(<Button className='flex justify-center items-center gap-1' variant='solid' block><span> <HiOutlinePencil/></span><span>  Edit Task</span></Button>):<HiOutlinePencil/>}</div>
            <Dialog isOpen={dialogIsOpen} onClose={onDialogClose} onRequestClose={onDialogClose}>
                <div className="pl-4 ">
                    <h3>Edit Task</h3>
                </div>
                <Formik 
                       initialValues={{
                        task_id: Data.task_id,
                        user_id: localStorage.getItem('userId') || '',
                        project_id: Data.project_id,
                        task_name: Data.task_name,
                        task_description: Data.task_description,
                        actual_task_start_date: new Date(Data.actual_task_start_date),
                        actual_task_end_date: new Date(Data.actual_task_end_date),
                        estimated_task_start_date: new Date(Data.estimated_task_start_date),
                        estimated_task_end_date: new Date(Data.estimated_task_end_date),
                        task_status: statusOptions.find((option)=>option.value===Data.task_status),  
                        task_priority: priorityOptions.find((option)=>option.value===Data.task_priority), 
                        task_assignee: Data.task_assignee,
                        reporter: Data.reporter,
                      }}
                     onSubmit={async(values, actions) => {
                        setLoading(true)
                        try{
                            const response = await apiGetCrmProjectsTaskUpdate(values)
                            console.log('response', response);
                            setLoading(false)
                            if(response.code===200){
                                toast.push(
                                    <Notification closable type='success' duration={2000}>Task Updated Successfully</Notification>
                                )
                            }
                        }
                        catch(error){
                            setLoading(false)
                            console.error('Error Adding Task:', error);
                        }  
                     }} >
                        <Form className=' p-4 max-h-96 overflow-y-auto'>
                            <div className=' grid grid-cols-2 gap-x-5'>
                            <FormItem label='Task Name'>
                                <Field name='task_name'  component={Input} placeholder='Task Name'/>
                            </FormItem>
                            <FormItem label='Task Assignee'>
                                <Field name='task_assignee'  component={Input} placeholder='Task'/>
                            </FormItem>
                            <FormItem label='Task Status'>
                                <Field name='task_status'  placeholder='Task'>
                                    {({field}:any)=>(
                                        <Select
                                        options={statusOptions}
                                        name='task_status'
                                        value={field.value}
                                        onChange={(value) => { field.onChange({ target: {name:'task_status', value: value?.value } }) }}
                                        />
                                    )}
                                </Field>
                            </FormItem>
                            <FormItem label='Actual Start Date'>
                            <Field name='actual_task_start_date' placeholder='Start date'>
                                {({field}: any) => (
                                    <DatePicker name='actual_task_start_date'
                                        value={field.value}
                                        onChange={(value) => {
                                            field.onChange({ target: {name: 'actual_task_start_date', value: `${value}`} })
                                        }}
                                    />
                                )}
                            </Field>
                            </FormItem>
                            <FormItem label='Actual End Date'>
                                <Field name='actual_task_end_date' placeholder='End Date'>
                                    {({field}:any)=>(
                                        <DatePicker name='actual_task_end_date'
                                        value={field.value}
                                        onChange={(value) => { 
                                            field.onChange({ target: {name: 'actual_task_end_date', value: `${value}`} })
                                        }}
                                        />
                                    )}
                                </Field>
                            </FormItem>

                            <FormItem label='Estimated Start Date'>
                            <Field name='estimated_task_start_date' placeholder='Start date'>
                                {({field}: any) => (
                                    <DatePicker name='estimated_task_start_date'
                                        value={field.value}
                                        onChange={(value) => {
                                            field.onChange({ target: {name: 'estimated_task_start_date', value: `${value}`} })
                                        }}
                                    />
                                )}
                            </Field>
                            </FormItem>
                            <FormItem label='Estimated End Date'>
                                <Field name='estimated_task_end_date' placeholder='End Date'>
                                    {({field}:any)=>(
                                        <DatePicker name='estimated_task_end_date'
                                        value={field.value}
                                        onChange={(value) => { 
                                            field.onChange({ target: {name: 'estimated_task_end_date', value: `${value}`} })
                                        }}
                                        />
                                    )}
                                </Field>
                            </FormItem>
                            <FormItem label='Reporting To'>
                                <Field name='reporter'  component={Input} placeholder='Reporting to'/>
                            </FormItem>
                            <FormItem label='Priority'>
                                <Field name='task_priority'  placeholder='Task Priority'>
                                    {({field}:any)=>(
                                        <Select
                                        name='task_priority'
                                        options={priorityOptions}
                                        value={field.value}
                                        onChange={(value) => { field.onChange({ target: {name:'task_priority', value: value?.value } }) }}
                                        />
                                    )}          
                                </Field>
                            </FormItem>
                            </div>
                            <FormItem label='Desription'>
                                <Field name='task_description' placeholder='Task Description'>
                                    {({field}:any)=>{
                                        return (
                                            <Input textArea name='task_description'
                                            {...field}/>
                                        )
                                    }}
                                </Field>
                            </FormItem>
                            <div className='flex justify-end'>
                                <Button type='submit' variant='solid' size='sm' loading={loading}>{loading?'Updating...':'Update'}</Button>
                            </div>
                        </Form>
                </Formik>
            </Dialog>
        </div>
    )
}

export default EditTask