import React, {  useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import type { MouseEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Dialog, Notification, Skeleton, toast } from '@/components/ui'
import { ConfirmDialog } from '@/components/shared'
import { apiLeadsAnotherProject } from '@/services/CrmService'

type CustomerInfoFieldProps = {
    title?: string
    value?: any
}

type CustomerProfileProps = {
    data?: Partial<Customer>
}
type Customer = {
    _id: string
    name: string
    lead_id:string
    email:string
    phone:string
    location:string
    lead_manager:string
    status:string
    source:string
    notes?: Note[];
    date:string
    project:boolean
}
interface Note {
    _id: string;
    content: string;
    createdBy: string;
    date: string;
    status: string;
  }
type AddProject ={
    lead_id:string
    user_id:string | null
    type:string
}


const CustomerInfoField = ({ title, value }: CustomerInfoFieldProps) => {
    return (
        <div>
            <span>{title}</span>
            <p className="text-gray-700 dark:text-gray-200 font-semibold" style={{overflowWrap:"break-word"}}>
            {value || <Skeleton/>}
            </p>
        </div>
    )
}


const CustomerProfile: React.FC<CustomerProfileProps> = ({ data }) => {

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const myParam = queryParams.get('id') || ''
    const [dialogIsOpen, setIsOpen] = useState(false)
    const [dialogIsOpen2, setIsOpen2] = useState(false)
    const [project, setProject] = useState<AddProject>()

    const onDialogClose = () => {
        setIsOpen(false)
    }
    const openDialog2 = () => {
        setIsOpen2(true)
        setProject({lead_id:myParam,user_id:localStorage.getItem('userId'),type:'true'})
    }

    const onDialogClose2 = () => {
        setIsOpen2(false)
    }

    const navigate = useNavigate()

    const addProject=async()=>{
        console.log(project);
        
            const response=await apiLeadsAnotherProject(project)
            const responseData=await response.json()
            if(responseData.code===200){
                toast.push(
                    <Notification closable type="success" duration={2000}>
                        {responseData.message}
                    </Notification>
                )
                window.location.reload()
            }
                else{
                    toast.push(
                        <Notification closable type="danger" duration={2000}>
                            {responseData.errorMessage}
                        </Notification>
                    )
                }
            }
    return (
        <div className=" flex flex-col gap-3">
            <Card>
                <div className="flex flex-col xl:justify-between h-full 2xl:min-w-[360px] mx-auto">
                    <div className="flex justify-between items-center">
                        <h5>Basic Information</h5>
                        {data?.project?
                        <Button onClick={()=>openDialog2()}>
                            Add Another Project
                        </Button>:
                        <Button
                            variant="solid"
                            onClick={() =>
                                navigate(
                                    `/app/crm/lead-project/?id=${myParam}&name=${data?.name}&email=${data?.email}&phone=${data?.phone}&location=${data?.location}`,
                                )
                            }
                        >
                            Create Project
                        </Button>}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-y-7 gap-x-4 mt-8">
                        <CustomerInfoField
                            title="Lead Name"
                            value={data?.name}
                        />
                        <CustomerInfoField title="Email" value={data?.email} />
                        <CustomerInfoField title="Phone" value={data?.phone} />

                        <CustomerInfoField
                            title="Location"
                            value={data?.location}
                        />
                        <CustomerInfoField
                            title="Lead Manager"
                            value={data?.lead_manager

                            }
                        />
                        <CustomerInfoField
                            title="Lead Status"
                            value={data?.status}
                        />
                     <CustomerInfoField
                        title="Created Date"
                        value={data?.date ? new Date(data.date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-') : ''}
                        />
                        <CustomerInfoField
                            title="Source"
                            value={data?.source}
                        />
                       
                        <Dialog
                            isOpen={dialogIsOpen}
                            width={1000}
                            height={490}
                            onClose={onDialogClose}
                            onRequestClose={onDialogClose}
                        >
                            <div
                                style={{
                                    maxHeight: '400px',
                                    overflowY: 'auto',
                                    marginRight: '2%',
                                    marginLeft: '1%',
                                    scrollbarWidth: 'none',
                                }}
                                className=" whitespace-nowrap"
                            >
                                {data?.notes?.map((note) => (
                                    <div key={note._id} className="mb-4 mr-4">
                                        <Card>
                                            <div className="flex flex-row justify-between items-center mb-4 ">
                                                <CustomerInfoField
                                                    title="Date"
                                                    value={note.date}
                                                />
                                                <CustomerInfoField
                                                    title="Lead Status"
                                                    value={note.status}
                                                />
                                            </div>
                                            <div>
                                                <p>Description</p>
                                                <p className="text-gray-700 dark:text-gray-200 font-semibold text-wrap">
                                                    {note.content}</p>
                                            </div>
                                        </Card>
                                    </div>
                                ))}
                                <div className="text-right mt-6 mb-4 mr-[2%]">
                                    <Button
                                        variant="solid"
                                    >
                                        Okay
                                    </Button>
                                </div>
                            </div>
                        </Dialog>
                    </div>
                    <div className='mt-7'>
                    <CustomerInfoField
                            title="Description "
                            value={data?.notes && data.notes[0] ? data.notes[0].content : <Skeleton/>}
                        />
                        </div>
                    <div className="mt-4 flex flex-col xl:flex-row gap-2"></div>
                </div>
            </Card>

            <ConfirmDialog
          isOpen={dialogIsOpen2}
          type="success"
          onClose={onDialogClose2}
          confirmButtonColor="green-600"
          onCancel={onDialogClose2}
            onConfirm={()=>addProject()}
          title={`Add Project`}
          onRequestClose={onDialogClose2}>
            <p> Are you sure, You want to add project? </p>            
        </ConfirmDialog>

          
        </div>
    )
}

export default CustomerProfile
