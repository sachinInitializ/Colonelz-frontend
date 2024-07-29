import { useState } from 'react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import { Field, Form, Formik, FormikContext } from 'formik'
import { DatePicker, FormItem, Input, Notification, Select, Tooltip, toast } from '@/components/ui'
import { apiGetCrmProjectsAddSubTask, apiGetCrmProjectsAddTask, apiGetCrmProjectsSubTaskUpdate } from '@/services/CrmService'
import { MdOutlineAdd } from 'react-icons/md'
import { HiOutlinePencil } from 'react-icons/hi'
import { useLocation } from 'react-router-dom'
import * as Yup from 'yup'

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
    { label: "In Progress", value: "In Progress"},
    { label: "Pending", value: "Pending" },
    { label: "Completed", value: "Completed" },
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
                      validationSchema={Yup.object().shape({
                        sub_task_name: Yup.string().required('Subtask Name is required'),
                        actual_sub_task_start_date: Yup.string().required('Actual Start Date is required'),
                        actual_sub_task_end_date: Yup.string().required('Actual End Date is required').test(
                            'is-greater',
                            'End date must be greater than start date',
                            function (value) {
                              const { actual_sub_task_start_date } = this.parent;
                              return new Date(value) > new Date(actual_sub_task_start_date);
                            }
                          
                        ),

                        estimated_sub_task_start_date: Yup.string().required('Estimated Start Date is required'),
                        estimated_sub_task_end_date: Yup.string().required('Estimated End Date is required').test(
                            'is-greater',
                            'End date must be greater than start date',
                            function (value) {
                              const { estimated_sub_task_start_date } = this.parent;
                              return new Date(value) > new Date(estimated_sub_task_start_date);
                            }
                          
                        
                        ),
                        sub_task_status: Yup.string().required('Subtask Status is required'),
                        sub_task_priority: Yup.string().required('Subtask Priority is required'),
                        sub_task_assignee: Yup.string().required('Subtask Assignee is required'),
                        sub_task_reporter: Yup.string().required('Subtask Reporter is required'),
                      })}
                     onSubmit={async(values, actions) => {
                         
                         setLoading(true)
                         const response = await apiGetCrmProjectsSubTaskUpdate(values)
                         console.log('response', response);
                         setLoading(false)
                         if(response.code===200){
                                toast.push(
                                    <Notification closable type='success' duration={2000}>Subtask Updated Successfully</Notification>
                                )
                                setLoading(false)
                                window.location.reload()
                            }
                            else{
                                setLoading(false)
                                toast.push(
                                    <Notification closable type='danger' duration={2000}>{response.errorMessage}</Notification>
                                )
                            }
                            
                     }}
                     >
                        {({values, errors, touched}:any) => (
                        <Form className=' p-4 max-h-96 overflow-y-auto'>
                            <div className=' grid grid-cols-2 gap-x-5'>
                            <FormItem label='Subtask Name'
                            asterisk
                            invalid={errors.sub_task_name && touched.sub_task_name}
                            errorMessage={errors.sub_task_name}
                            >
                                <Field name='sub_task_name'  component={Input} placeholder='Subtask Name'/>
                            </FormItem>


                            <FormItem label='Subtask Assignee'
                            asterisk
                            invalid={errors.sub_task_assignee && touched.sub_task_assignee}
                            errorMessage={errors.sub_task_assignee}
                            >
                                <Field name='sub_task_assignee'  component={Input} placeholder='Subtask Assignee'/>
                            </FormItem>
                            <FormItem label='Subtask Status'
                            asterisk
                            invalid={errors.sub_task_status && touched.sub_task_status}
                            errorMessage={errors.sub_task_status}
                            >
                                <Field name='sub_task_status'  placeholder=''>
                                    {({field}:any)=>(
                                        <Select
                                        placeholder={task.Data.sub_task_status}
                                        options={statusOptions}
                                        name='sub_task_status'
                                        onChange={(value) => { field.onChange({ target: {name:'sub_task_status', value: value?.value } }) }}
                                        />
                                    )}
                                </Field>
                            </FormItem>


                            <FormItem label='Actual Start Date'
                           
                            >
                                <Field name='actual_sub_task_start_date'  placeholder='Start date'>
                                    {({field}:any)=>(
                                        <DatePicker name='actual_sub_task_start_date'
                                        value={field.value}
                                        onChange={(value) => { field.onChange({ target: {name:'actual_sub_task_start_date', value: `${value}` } }) }}
                                        />
                                    )}
                                </Field>
                            </FormItem>
                            <FormItem label='Actual End Date'
                            invalid={errors.actual_sub_task_end_date && touched.actual_sub_task_end_date}
                            >
                                <Field name='actual_sub_task_end_date' placeholder='End Date'>
                                    {({field}:any)=>(
                                        <DatePicker name='actual_sub_task_end_date'
                                        value={field.value}
                                        onChange={(value) => { field.onChange({ target: {name:'actual_sub_task_end_date', value: `${value }`} }) }}
                                        />
                                    )}
                                </Field>
                                <div className=' text-red-600'>{errors.actual_sub_task_end_date}</div>
                            </FormItem>

                            <FormItem label='Estimated Start Date'
                            asterisk
                            invalid={errors.estimated_sub_task_start_date && touched.estimated_sub_task_start_date}
                            errorMessage={errors.estimated_sub_task_start_date}
                            >
                                <Field name='estimated_sub_task_start_date'  placeholder='Start date'>
                                    {({field}:any)=>(
                                        <DatePicker name='estimated_sub_task_start_date'
                                        value={field.value}
                                        onChange={(value) => { field.onChange({ target: {name:'estimated_sub_task_start_date', value: `${value}` } }) }}
                                        />
                                    )}
                                </Field>
                            </FormItem>

                            <FormItem label='Estimated End Date'
                            asterisk
                            invalid={errors.estimated_sub_task_end_date && touched.estimated_sub_task_end_date}
                                    
                            >
                                <Field name='estimated_sub_task_end_date' placeholder='End Date'>
                                    {({field}:any)=>(
                                        <DatePicker name='estimated_sub_task_end_date'
                                        value={field.value}
                                        onChange={(value) => { field.onChange({ target: {name:'estimated_sub_task_end_date', value: `${value }`} }) }}
                                        />
                                    )}
                                </Field>
                                <div className=' text-red-600'>{errors.estimated_sub_task_end_date}</div>
                            </FormItem>
                            <FormItem label='Reporting To'
                            asterisk
                            invalid={errors.sub_task_reporter && touched.sub_task_reporter}
                            errorMessage={errors.sub_task_reporter} 
                            >
                                <Field name='sub_task_reporter'  component={Input} placeholder='Reporting to'/>
                            </FormItem>


                            <FormItem label='Priority'
                            asterisk
                            invalid={errors.sub_task_priority && touched.sub_task_priority}
                            errorMessage={errors.sub_task_priority}
                            >
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
                        </Form>)}
                </Formik>
            </Dialog>
        </div>
    )
}

export default EditSubTask