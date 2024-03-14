import React, {  useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import type { MouseEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Dialog } from '@/components/ui'

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
    status:string
    source:string
    notes?: Note[];
}
interface Note {
    _id: string;
    content: string;
    createdBy: string;
    date: string;
    status: string;
  }


const CustomerInfoField = ({ title, value }: CustomerInfoFieldProps) => {
    return (
        <div>
            <span>{title}</span>
            <p className="text-gray-700 dark:text-gray-200 font-semibold">
                {value}
            </p>
        </div>
    )
}


const CustomerProfile: React.FC<CustomerProfileProps> = ({ data }) => {

    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const myParam = queryParams.get('id') || ''
    const [dialogIsOpen, setIsOpen] = useState(false)

    const onDialogClose = (e: MouseEvent) => {
        console.log('onDialogClose', e)
        setIsOpen(false)
    }

    const onDialogOk = (e: MouseEvent) => {
        console.log('onDialogOk', e)
        setIsOpen(false)
    }

    const navigate = useNavigate()

    return (
        <div className=" flex flex-col gap-3">
            <Card>
                <div className="flex flex-col xl:justify-between h-full 2xl:min-w-[360px] mx-auto">
                    <div className="flex justify-between items-center">
                        <h5>Basic Information</h5>
                        <Button
                            variant="solid"
                            onClick={() =>
                                navigate(
                                    `/app/crm/lead-project/?id=${myParam}&name=${data?.name}&email=${data?.email}&phone=${data?.phone}&location=${data?.location}`,
                                )
                            }
                        >
                            Create Project
                        </Button>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-2 xl:grid-cols-3 gap-y-7 gap-x-4 mt-8">
                        <CustomerInfoField
                            title="Name"
                            // value={datas.data[0].name}
                            value={data?.name}
                        />
                        <CustomerInfoField title="Email" value={data?.email} />
                        <CustomerInfoField
                            title="Location"
                            value={data?.location}
                        />
                        <CustomerInfoField
                            title="Status"
                            value={data?.status}
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
                                                    title="Status"
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
                                        onClick={onDialogOk}
                                    >
                                        Okay
                                    </Button>
                                </div>
                            </div>
                        </Dialog>
                    </div>
                    <div className="mt-4 flex flex-col xl:flex-row gap-2"></div>
                </div>
            </Card>

          
        </div>
    )
}

export default CustomerProfile
