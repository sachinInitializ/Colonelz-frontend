import React, {  useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import dayjs from 'dayjs'
import type { MouseEvent } from 'react'
import { HiPencilAlt, HiOutlineTrash } from 'react-icons/hi'
import { useLocation, useNavigate } from 'react-router-dom'
import {
    deleteCustomer,
    openEditCustomerDetailDialog,
    useAppDispatch,
    Customer,
} from '../store'
import { Dialog, Dropdown } from '@/components/ui'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import axios from 'axios'

type CustomerInfoFieldProps = {
    title?: string
    value?: string
}

type CustomerProfileProps = {
    data?: Partial<Customer>
}
type InitialData = {
    id?: string
    name?: string
    email?: string
    phone?: string
    location?: string
    status?: string
    source?: string
    content?: string
    createBy?: string
    lead_id?: string
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


interface CustomerProfilePropss {
    data: {
        // Define the structure of the data object here
        _id: string
        name: string
        lead_id: string
        email: string
        phone: string
        location: string
        status: string
        source: string
        date: string
        notes?: Note[] // Make notes optional
        createdAt: string
        __v: number
        files: File[]
        // Add other properties as needed
    }
}
interface File {
    date: string
    files: Array<string>
}
interface Note {
    _id: string
    content: string
    createdBy: string
    date: string
    status: string
}

const CustomerProfile: React.FC<CustomerProfileProps> = ({ data }) => {

    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    // const urlParams = new URLSearchParams(window.location.search);
    // let myParam = urlParams.get('id');
    // console.log(typeof(myParam));
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


    const Toggle = <Button>Files</Button>

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
                        <Dropdown renderTitle={Toggle}>
                            {data?.files?.map((file) => {
                                return (
                                    <div key={file}>
                                        {file.files.map((item) => {
                                            return (
                                                <div key={item}>
                                                    <a
                                                        href={item}
                                                        target="_blank"
                                                        rel='noreferrer'
                                                    >
                                                        <Dropdown.Item eventKey="a">
                                                            File
                                                        </Dropdown.Item>
                                                    </a>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                            })}
                        </Dropdown>
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
                                            <CustomerInfoField
                                                title="Description"
                                                value={note.content}
                                            />
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

            {showSuccessMessage && (
                <ConfirmDialog
                    isOpen={showSuccessMessage}
                    type="success"
                    title="Success"
                    onClose={() => setShowSuccessMessage(false)}
                >
                    <p>Data added successfully!</p>
                </ConfirmDialog>
            )}
            {showErrorMessage && (
                <Notification title={'Submission Error'} type="error">
                    Error submitting data. Please try again.
                </Notification>
            )}
        </div>
    )
}

export default CustomerProfile
