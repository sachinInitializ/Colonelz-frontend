import React, { useState, FormEvent } from 'react'
import {
    Button,
    DatePicker,
    FormContainer,
    FormItem,
    Input,
    Notification,
    Select,
    Upload,
    toast,
} from '@/components/ui'
import CreatableSelect from 'react-select/creatable' // Import CreatableSelect
import { useLocation, useNavigate } from 'react-router-dom'
import { HiOutlineCloudUpload } from 'react-icons/hi'

type Option = {
    value: string
    label: string
}

interface FormData {
    client_name: string
    organisor: string
    designer: string
    attendees: string
    meetingDate: string
    location: string
    remark: string
    files: File[]
    project_id: string
}

const YourFormComponent: React.FC = () => {
    const navigate = useNavigate()
    interface QueryParams {
        project_id: string
        client_name: string
    }
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)

    // Create an object to store and map the query parameters
    const allQueryParams: QueryParams = {
        project_id: queryParams.get('project_id') || '',
        client_name: queryParams.get('client_name') || '',
    }
    const [formData, setFormData] = useState<FormData>({
        client_name: '',
        organisor: '',
        designer: '',
        attendees: '',
        meetingDate: '',
        location: '',
        remark: '',
        files: [],
        project_id: allQueryParams.project_id,
    })
    const [errors, setErrors] = useState<{ [key: string]: string }>({})

    // Options for the client select input
    const clientOptions: Option[] = [
        {
            value: allQueryParams.client_name,
            label: allQueryParams.client_name,
        },
        // Add more client options if needed
    ]
    const organisorOptions: Option[] = [
        {},
        // Add more client options if needed
    ]
    const architectOptions: Option[] = [
        {},
        // Add more client options if needed
    ]
    const consultant_nameOptions: Option[] = [
        {},
        // Add more client options if needed
    ]

    const handleSelectChange = (
        selectedOption: Option | Option[] | null,
        fieldName: string,
    ) => {
        const selectedValues = Array.isArray(selectedOption)
            ? selectedOption.map((option) => option.value)
            : selectedOption
              ? [selectedOption.value]
              : []

        setFormData({
            ...formData,
            [fieldName]: selectedValues,
        })

        setErrors({
            ...errors,
            [fieldName]: '',
        })
    }

    const handleInputChange = (name: keyof FormData, value: string) => {
        setFormData({ ...formData, [name]: value })
        setErrors({
            ...errors,
            [name]: '',
        })
    }

    const handleFileChange = (files: FileList | null) => {
        console.log(files);
        
        if (files) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                files: Array.from(files),
            }))
            setErrors({
                ...errors,
                files: '',
            })
        }
    }

    const optionsSource = [
        { value: 'At Office', label: 'At Office' },
        { value: 'At Site', label: 'At Site' },
        { value: 'At Client place', label: 'At Client Place' },
        { value: 'Other', label: 'Other' },
    ]

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const validationErrors: { [key: string]: string } = {}
        if (formData.client_name.length === 0) {
            validationErrors.client_name = "Client's Name is required"
        }
        if (formData.organisor.length === 0) {
            validationErrors.organisor = "Organisor's Name is required"
        }
        if (formData.designer.length === 0) {
            validationErrors.designer = "Designer's Name is required"
        }
        if (!formData.meetingDate) {
            validationErrors.meetingDate = 'Meeting Date is required'
        }
        if (!formData.location) {
            validationErrors.location = 'Location is required'
        }

        // Validate remark

        // Set errors if any
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        const formatNames = (names: string | string[]) => {
            if (typeof names === 'string') {
                return names // Return the single name as is
            } else if (names.length === 1) {
                return names[0]
            } else {
                const firstNames = names.slice(0, -1).join(', ') // Join all but the last name with ','
                const lastName = names[names.length - 1] // Get the last name
                return `${firstNames} & ${lastName}` // Combine with ' & '
            }
        }

        try {
            const formDataToSend = new FormData()
            formDataToSend.append('meetingdate', formData.meetingDate)
            formDataToSend.append('project_id', formData.project_id)
            formDataToSend.append('location', formData.location)
            formDataToSend.append('remark', formData.remark)
            formDataToSend.append(
                'client_name',
                formatNames(formData.client_name),
            )
            formDataToSend.append('organisor', formatNames(formData.organisor))
            formDataToSend.append('designer', formatNames(formData.designer))
            formDataToSend.append('attendees', formatNames(formData.attendees))

            formData.files.forEach((file) =>
                formDataToSend.append('files', file),
            )

            const response = await fetch(
                'https://colonelzadmin.prod.initz.run/v1/api/admin/create/mom/',
                {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem('auth')}`
                    },
                    method: 'POST',
                    body: formDataToSend,
                },
            )
            const responseData=await response.json()
            if (response.ok) {
                toast.push(
                    <Notification closable type="success" duration={2000}>
                        Mom Created Successfully
                    </Notification>
                )
                window.location.reload()
                navigate(-1)
                // Redirect to home page or any other page after successful creation
            } else {
                toast.push(
                    <Notification closable type="success" duration={2000}>
                        {responseData.errorMessage}
                    </Notification>
                )
            }
        } catch (error) {
            console.error('Error:', error)
            alert('An error occurred')
        }
    }

    return (
        <div>
            <h5>MOM Details</h5>
            <form onSubmit={handleSubmit} className="mt-4">
                <FormContainer>
                    <div className="grid grid-cols-3 gap-5">
                        <FormItem label="Client's Name">
                            
                            <Select
                                isMulti
                                componentAs={CreatableSelect}
                                options={clientOptions}
                                onChange={(selectedOption) =>
                                    handleSelectChange(
                                        selectedOption,
                                        'client_name',
                                    )
                                }
                            />
                            {errors.client_name && (
                                <span className="text-red-500">
                                    {errors.client_name}
                                </span>
                            )}
                        </FormItem>
                        <FormItem label="Organised By">
                            {/* Use CreatableSelect to allow selecting or creating a new client name */}
                            <Select
                                isMulti
                                componentAs={CreatableSelect}
                                options={organisorOptions}
                                onChange={(selectedOption) =>
                                    handleSelectChange(
                                        selectedOption,
                                        'organisor',
                                    )
                                }
                            />
                            {errors.organisor && (
                                <span className="text-red-500">
                                    {errors.organisor}
                                </span>
                            )}
                        </FormItem>
                        <FormItem label="Designer's Name">
                            <Select
                                isMulti
                                componentAs={CreatableSelect}
                                options={architectOptions}
                                onChange={(selectedOption) =>
                                    handleSelectChange(
                                        selectedOption,
                                        'designer',
                                    )
                                }
                            />
                            {errors.designer && (
                                <span className="text-red-500">
                                    {errors.designer}
                                </span>
                            )}
                        </FormItem>
                        <FormItem label="Others">
                            {/* Use CreatableSelect to allow selecting or creating a new client name */}
                            <Select
                                isMulti
                                componentAs={CreatableSelect}
                                options={consultant_nameOptions}
                                onChange={(selectedOption) =>
                                    handleSelectChange(
                                        selectedOption,
                                        'attendees',
                                    )
                                }
                            />
                            {errors.consultant_name && (
                                <span className="text-red-500">
                                    {errors.attendees}
                                </span>
                            )}
                        </FormItem>
                        {/* Add similar FormItem and Select components for other fields */}
                        <FormItem label="Date">
                            <DatePicker
                                selected={
                                    formData.meetingDate
                                        ? new Date(formData.meetingDate)
                                        : null
                                }
                                onChange={(date) =>
                                    handleInputChange(
                                        'meetingDate',
                                        date?
                                        date.toISOString():"",
                                    )
                                }
                            />
                            {errors.meetingDate && (
                                <span className="text-red-500">
                                    {errors.meetingDate}
                                </span>
                            )}
                        </FormItem>
                        <FormItem label="Location">
                            <Select
                            size='sm'
                                options={optionsSource}
                                value={optionsSource.find(
                                    (option) =>
                                        option.value === formData.location,
                                )}
                                onChange={(selectedOption) =>
                                    handleInputChange(
                                        'location',
                                        selectedOption?selectedOption.value:"",
                                    )
                                }
                            />
                            {errors.location && (
                                <span className="text-red-500">
                                    {errors.location}
                                </span>
                            )}
                        </FormItem>
                        <FormItem label="Remark">
                            <Input
                            textArea
                                name="remark"
                                value={formData.remark}
                                onChange={(e) =>
                                    handleInputChange('remark', e.target.value)
                                }
                            />
                        </FormItem>

                        <FormItem label="File">
                            <Upload multiple
                                onChange={(files) => handleFileChange(files)}
                            >
                                <Button
                                    variant="solid"
                                    icon={<HiOutlineCloudUpload />}
                                    type="button"
                                >
                                    Upload your file
                                </Button>
                            </Upload>
                        </FormItem>
                    </div>
                    <div className="">
                        <Button type="submit" className="mr-4" variant="solid">
                            Submit
                        </Button>
                        <Button type="submit" onClick={() => navigate(-1)}>
                            Discard
                        </Button>
                    </div>
                </FormContainer>
            </form>
        </div>
    )
}

export default YourFormComponent
