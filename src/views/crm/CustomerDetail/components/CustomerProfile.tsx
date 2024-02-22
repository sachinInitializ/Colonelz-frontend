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
import { useLocation, useNavigate } from 'react-router-dom'
import {
    deleteCustomer,
    openEditCustomerDetailDialog,
    useAppDispatch,
    Customer,
} from '../store'
import EditCustomerProfile from './EditCustomerProfile'
import { DatePicker, Dialog, FormItem, Input } from '@/components/ui'
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
        );
    } else if (title === 'Description') {
        return (
            <div>
                <span>{title}</span>
                <div dangerouslySetInnerHTML={{ __html: value || '' }} className='text-gray-700 dark:text-gray-200 font-semibold' />
            </div>
        );
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
        );
    }
};


interface ProjectUpdateData {
    project_id: string | null;
    timeline_date: string;
    project_budget: string;
    project_status: string;
  }
  const ProjectUpdate: React.FC = (data) => {
    const location=useLocation()
    const searchParams = new URLSearchParams(location.search);
    const projectId = searchParams.get('project_id');
    const [formData, setFormData] = useState<ProjectUpdateData>({
      project_id: projectId,
      timeline_date: new Date(data.data.timeline_date).toISOString().split('T')[0],
      project_budget: data.data.project_budget,
      project_status: data.data.project_status,
    });
  
   console.log(data);
   
  
    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  console.log(data);
  const handleDateChange = (date: Date) => {
    setFormData({
      ...formData,
      timeline_date: date.toISOString().split('T')[0], // Convert date to string
    });
  };
  
    const handleUpdate = async () => {
        try {
          alert('Updated successfully')
          const response = await axios.put(
              'https://col-u3yp.onrender.com/v1/api/admin/update/project/',
              formData
              );
              window.location.reload();
        console.log("hello");
        
  
        // Assuming you want to show a success message or perform other actions after the update
        // You can add your logic here
      } catch (error) {
        console.error('Update failed', error);
  
        // Assuming you want to show an error message or perform other actions on update failure
        // You can add your logic here
      }
    };
  
    return (
      <div>
        <h1>Update Project</h1>
        <form>
         
        
          
        <FormItem label="Timeline Date">
          <DatePicker
            selected={new Date(formData.timeline_date)}
            onChange={handleDateChange}
          />
        </FormItem>
          <br />
          <FormItem label='Project Buget'>
            
            <Input
              type="text"
              name="project_budget"
              value={formData.project_budget}
              onChange={handleInputChange}
            />
          </FormItem>
          <br />
          <FormItem>
            Project Status:
            <Input
              type="text"
              name="project_status"
              value={formData.project_status}
              onChange={handleInputChange}
            />
          </FormItem>
          <br />
          <button type="button" onClick={handleUpdate}>
            Update Project
          </button>
        </form>
      </div>
    );
  };
  


const CustomerProfile = ({ data }: CustomerProfileProps) => {
    const [dialogIsOpen, setIsOpen] = useState(false)

    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = (e: MouseEvent) => {
        console.log('onDialogClose', e)
        setIsOpen(false)
    }

    const onDialogOk = (e: MouseEvent) => {
        console.log('onDialogOk', e)
        setIsOpen(false)
    }
    return (
        <Card>
            <div className="flex flex-col xl:justify-between h-full 2xl:min-w-[360px] mx-auto">
                <div className="flex xl:flex-row gap-4 justify-between">
                    <div className="flex xl:flex-row items-center gap-4">
                        <h4 className="font-bold capitalize">{data?.project_name}</h4>
                    </div>
                    <div className="mt-4 flex flex-col xl:flex-row gap-2">
                    <Button variant="solid" onClick={() => openDialog()}>
                Edit
            </Button>
                    </div>
                </div>
                
                   
                   
                <Dialog
                isOpen={dialogIsOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
         <ProjectUpdate data={data}/>
            </Dialog>
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
