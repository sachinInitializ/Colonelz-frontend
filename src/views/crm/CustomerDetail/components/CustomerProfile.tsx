import { useEffect, useState } from 'react'
import Card from '@/components/ui/Card'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaPinterestP,
} from 'react-icons/fa'
import { HiPencilAlt, HiOutlineTrash } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import {
    deleteCustomer,
    openEditCustomerDetailDialog,
    useAppDispatch,
    Customer,
} from '../store'
import EditCustomerProfile from './EditCustomerProfile'
import { DatePicker, FormItem, Input } from '@/components/ui'
import axios from 'axios'

type CustomerInfoFieldProps = {
    title?: string
    value?: string
    onChange?: (value: string) => void
}

type CustomerProfileProps = {
    data?: Partial<Customer>
}

const formatDate = (dateString: string | undefined) => {
    if (!dateString) return ''


    const date = new Date(dateString)
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' }

  const CustomerInfoField = ({ title, value }: CustomerInfoFieldProps) => {
    return (
      <div>
        <span>{title}</span>
        <p className="text-gray-700 dark:text-gray-200 font-semibold capitalize">
          {title === 'Project Start Date' || title === 'Timeline' ? formatDate(value) : value}
        </p>
      </div>
    )
  }


    return new Intl.DateTimeFormat('en-GB', options).format(date)
}

const CustomerInfoField = ({
    title,
    value,
    onChange,
}: CustomerInfoFieldProps) => {
    if (title === 'Project Id' || title === 'Project Type' || title === 'Project Start Date') {
        return (
            <div>
                <span>{title}</span>
                <p className="text-gray-700 dark:text-gray-200 font-semibold">
                    {value}
                </p>
            </div>
        )
    } else {
        return (
            <div>
                <span>{title}</span>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange && onChange(e.target.value)}
                    className="text-gray-700 dark:text-gray-200 font-semibold"
                />
            </div>
        )
    }
}


const CustomerProfileAction = ({
    id,
    data,
}: {
    id?: string
    data?: Partial<Customer>
}) => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [editedData, setEditedData] = useState<Partial<Customer>>({})

    const onDialogClose = () => {
        setDialogOpen(false)
    }

    const onDialogOpen = () => {
        setEditedData(data || {})
        setDialogOpen(true)
    }

    const onEdit = async () => {
        try {
            const response = await fetch(
                'https://col-u3yp.onrender.com/v1/api/admin/update/project/',
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(editedData),
                },
            )
            console.log(response)
            if (response.ok) {
               setDialogOpen(false)
               toast.push(
                   <Notification title={'Update Success'} type="success">
                       Data successfully updated
                   </Notification>,
               )
               // Reload the page after successfully updating the data
               window.location.reload()
            } else {
                // Handle error
                throw new Error('Failed to update project data')
            }
        } catch (error) {
            console.error('Error updating project data:', error)
            // Show error notification
            toast.push(
                <Notification title={'Error'} type="error">
                    Failed to update project data
                </Notification>,
            )
        } finally {
            // Close the dialog
            setDialogOpen(false)
        }
    }

    const handleChange = (key: string, value: string) => {
        setEditedData({
            ...editedData,
            [key]: value,
        })
    }

    const API_URL = 'https://your-api-url.com';
    
    interface ProjectData {
        project_id:string | undefined;
        project_status: string | undefined;
        description: string | undefined;
        timeline_date: Date ;
        project_budget: string | undefined;
      }
      



const [projectData, setProjectData] = useState<ProjectData>({
    project_id: data?.project_id,
    project_status: data?.project_status,
    description: data?.description,
    timeline_date: new Date(`${data?.timeline_date}`),
    project_budget: data?.project_budget,
  });

  const handleUpdate = async () => {
    try {
      // Make a PUT request to update the project data
     
      const response = await axios.put(`https://col-u3yp.onrender.com/v1/api/admin/update/project/`, projectData);
      console.log('Update successful', response.data);
    } catch (error) {
      console.error('Update failed', error);
    }
  };


    return (
        <>
            <Button
                block
                icon={<HiPencilAlt />}
                variant="solid"
                onClick={onDialogOpen}
            >
                Edit
            </Button>
            <ConfirmDialog
                isOpen={dialogOpen}
                title="Update project"
                confirmButtonColor="green-600"
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
                onCancel={onDialogClose}
                onConfirm={onEdit}
            >
               <div>
    
      <form>
        <div className=' grid grid-cols-2 gap-4'>
        <FormItem label='Project Status'>
        <Input
          type="text"
          value={projectData.project_status}
          onChange={(e) => setProjectData({ ...projectData, project_status: e.target.value })}
        />
        </FormItem>
        <FormItem label='Budget'>
        <Input
          type="text"
          value={projectData.project_budget}
          onChange={(e) => setProjectData({ ...projectData, project_budget: e.target.value })}
        />
        </FormItem>
        <FormItem label='DescripTion'>
        <Input
          type="text"
          value={projectData.description}
          onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
        />
        </FormItem>
        <FormItem label='Timeline Date'>
        <DatePicker
          selected={projectData.timeline_date}
          onChange={(date: Date) => setProjectData({ ...projectData, timeline_date: date })}
        />
        </FormItem>
        </div>
        {/* Add other input fields for project_status, timeline_date, project_budget, etc. */}
        
      </form>
    </div>
            </ConfirmDialog>
            <EditCustomerProfile />
        </>
    )
}

const CustomerProfile = ({ data }: CustomerProfileProps) => {
    return (
        <Card>
            <div className="flex flex-col xl:justify-between h-full 2xl:min-w-[360px] mx-auto">
                <div className="flex xl:flex-row gap-4 justify-between">
                    <div className="flex xl:flex-row items-center gap-4">
                        <h4 className="font-bold capitalize">{data?.project_name}</h4>
                    </div>
                    <div className="mt-4 flex flex-col xl:flex-row gap-2">
                        <CustomerProfileAction id={data?.id} data={data} />
                    </div>
                </div>
                
                   
                   

                <div className="grid grid-cols-3 sm:grid-cols-3 max-sm:grid-cols-1 max-sm:grid xl:grid-cols-4 gap-y-7 gap-x-5 mt-8 capitalize">
                    <CustomerInfoField title="Project Id" value={data?.project_id} />
                    <CustomerInfoField 
                        title="Project Type"
                        value={data?.project_type}
                    />

                    <CustomerInfoField
                        title="Project status"
                        value={data?.project_status}
                    />
                    <CustomerInfoField
                        title="Project Start Date"
                        value={formatDate(data?.project_start_date)}
                    />
                    <CustomerInfoField
                        title="Timeline"
                        value={formatDate(data?.timeline_date)}
                    />
                    <CustomerInfoField
                        title="Project Budget"
                        value={data?.project_budget}
                    />
                    <CustomerInfoField
                        title="Description"
                        value={data?.description}
                    />
                </div>
            </div>
          
        </Card>
    )
}

export default CustomerProfile
