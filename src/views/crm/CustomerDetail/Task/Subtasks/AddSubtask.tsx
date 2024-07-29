import { useState } from 'react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import { Field, Form, Formik, FormikContext } from 'formik'
import { DatePicker, FormItem, Input, Notification, Select, Tooltip, toast } from '@/components/ui'
import { apiGetCrmProjectsAddSubTask, apiGetCrmProjectsAddTask } from '@/services/CrmService'
import { MdOutlineAdd } from 'react-icons/md'
import * as Yup from 'yup'

type Task = {
    user_id: string;
    project_id: string;
    sub_task_name: string;
    sub_task_description: string;
    actual_sub_task_start_date: string; 
    actual_sub_task_end_date: string; 
    estimated_sub_task_start_date: string;
    estimated_sub_task_end_date: string;
    sub_task_status: string; 
    sub_task_priority: string; 
    sub_task_assignee: string;
    reporter: string;
  };

const AddSubTask = (task:any) => {
    const [dialogIsOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
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
  
  

    return (
        <div>
            <Button onClick={openDialog}  variant='solid' size='sm' className=' rounded-lg'> Add Subtask</Button>
            <Dialog isOpen={dialogIsOpen} onClose={onDialogClose} onRequestClose={onDialogClose}>
                <div className="pl-4 ">
                    <h3>Add New Subtask</h3>
                </div>
                <Formik 
                       initialValues={{
                        user_id: localStorage.getItem('userId') || '',
                        project_id: task.task.project_id,
                        task_id: task.task.taskid,
                        sub_task_name: "",
                        sub_task_description: "",
                        actual_sub_task_start_date: "",
                        actual_sub_task_end_date: "",
                        estimated_sub_task_start_date: "",
                        estimated_sub_task_end_date: "",
                        sub_task_status: "", 
                        sub_task_priority: "", 
                        sub_task_assignee: "",
                        sub_task_reporter: "",
                      }}
                      validationSchema={Yup.object().shape({
                        sub_task_name: Yup.string().required('Subtask Name is required'),
                        actual_sub_task_start_date: Yup.string(),
                        actual_sub_task_end_date: Yup.string().test(
                            'is-greater',
                            'End date must be greater than start date',
                            function (value) {
                              const { actual_sub_task_start_date } = this.parent;
                              if(value && actual_sub_task_start_date)
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
                            const response = await apiGetCrmProjectsAddSubTask(values)
                            console.log('response', response);
                            if(response.code===200){
                                setLoading(false)
                                toast.push(
                                    <Notification closable type='success' duration={2000}>Subtask Added Successfully</Notification>
                                )
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
                        {({values, errors, touched}:any)=>(
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
                                <Button type='submit' variant='solid' size='sm' loading={loading}>{loading?'Adding':'Add Subtask'}</Button>
                            </div>
                        </Form>)}
                </Formik>
            </Dialog>
        </div>
    )
}

export default AddSubTask