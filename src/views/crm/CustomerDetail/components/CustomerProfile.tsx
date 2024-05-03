import {  useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useLocation } from 'react-router-dom'
import {
    Customer, Data, Project,
} from '../store'
import { DatePicker, Dialog, FormItem, Input, Notification, Select, toast } from '@/components/ui'
import Cookies from 'js-cookie'
import { apiGetCrmSingleProjectEdit } from '@/services/CrmService'


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
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-based in JavaScript
  const year = date.getFullYear()

  return `${day}-${month}-${year}`
}

const CustomerInfoField = ({
    title,
    value,
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
                <p className="text-gray-700 dark:text-gray-200 font-semibold">
                    {value}
                </p>
            </div>
        );
    }
};


interface ProjectUpdateData {
  user_id: string | null;
    project_id: string | null;
    timeline_date: string;
    project_budget: string;
    project_status: string;
    designer:string
  }
  const ProjectUpdate: React.FC<Data> = (data) => {
    const location=useLocation()
    const searchParams = new URLSearchParams(location.search);
    const projectId = searchParams.get('project_id');
    const userId = searchParams.get('id');
    const [formData, setFormData] = useState<ProjectUpdateData>({
      user_id:"66165c25e3a558d03a48cbb2",
      project_id: projectId,
      timeline_date: new Date(data.data.timeline_date).toISOString().split('T')[0],
      project_budget: data.data.project_budget,
      project_status: data.data.project_status,
      designer:data.data.designer
    });
  
 
   
  
    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  const handleDateChange = (date: Date | null) => {
    if (date) {
      setFormData({
        ...formData,
        timeline_date: date.toISOString().split('T')[0],
      });
    }
  };
  

  const handleUpdate = async () => {
    try {
      const response = await apiGetCrmSingleProjectEdit(formData);
      const data=await response.json()
      console.log(data);
      
      console.log(data.code===200);
      if (data.code===200) {
        toast.push(
          <Notification closable type="success" duration={2000}>
              Project data updated successfully
          </Notification>
      )
      // window.location.reload()
      } else {
        toast.push(
          <Notification closable type="danger" duration={2000}>
             {data.errorMessage}
          </Notification>
      )
      }
    } catch (error) {
      toast.push(
        <Notification closable type="danger" duration={2000}>
           Error updating project status
        </Notification>
    )
    }
  };
  


    const projectStatusOptions = [
      { value: 'completed', label: 'Completed' },
      { value: 'designing', label: 'Designing' },
      { value: 'executing', label: 'Executing' },
  ]
  
    return (
      <div>
        <form>
        <FormItem label="Timeline Date">
          <DatePicker
            selected={new Date(formData.timeline_date)}
            onChange={handleDateChange}
          />
        </FormItem>
          <br />
          <FormItem label='Project Budget'>
            
            <Input
              type="text"
              name="project_budget"
              value={formData.project_budget}
              onChange={handleInputChange}
            />
          </FormItem>
          <FormItem label='Project Incharge'>
            
            <Input
              type="text"
              name="designer"
              value={formData.designer}
              onChange={handleInputChange}
            />
          </FormItem>
          <br />
          <FormItem>
            Project Status:
            <Select 
                        options={projectStatusOptions}
                        value={projectStatusOptions.find(
                            (option) =>
                                option.value === formData.project_status,
                        )}
                        onChange={(selectedOption) => {
                            setFormData({
                                ...formData,
                                project_status: selectedOption
                                    ? (
                                          selectedOption as {
                                              value: string
                                              label: string
                                          }
                                      ).value
                                    : '',
                            })
                           
                           
                          }}
                    />
          </FormItem>
          <br />
          <Button type="button" 
           variant='solid'
             onClick={handleUpdate}
           >
            Update Project
          </Button>
        </form>
      </div>
    );
  };
  


const CustomerProfile = ({ data }: CustomerProfileProps) => {
    const [dialogIsOpen, setIsOpen] = useState(false)

    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = () => {
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
                        title="Client Name"
                        value={data?.client[0]?.client_name}
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
                        title="Project End Date"
                        value={formatDate(data?.timeline_date)}
                    />
                    <CustomerInfoField
                        title="Project Budget"
                        value={data?.project_budget}
                    />
                    <CustomerInfoField
                        title="Project Incharge"
                        value={data?.designer}
                    />
                </div>
                    <div  className=' mt-7'>
                      <span>Description</span>
                      <p className=' text-wrap text-gray-700 dark:text-gray-200 font-semibold'>{data?.description}</p>
                    </div>
            </div>
          
        </Card>
    )
}

export default CustomerProfile
