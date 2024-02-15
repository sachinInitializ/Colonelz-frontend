import React, { useState, ChangeEvent, FormEvent } from 'react'
import { Button, FormContainer, FormItem, Input, Select } from '@/components/ui'
import CreatableSelect from 'react-select/creatable' // Import CreatableSelect
import { useLocation, useNavigate } from 'react-router-dom'

type Option = {
    value: string
    label: string
}


interface FormData {
    client_name: string
    organisor: string
    architect: string
    consultant_name: string
    meetingDate: string
    source: string
    remark: string
    imaportant_note: string
    files: File[]
    project_id: string
}

const YourFormComponent: React.FC = () => {
    const navigate = useNavigate()
    interface QueryParams {

        project_id: string;
    
      
      }
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    
    // Create an object to store and map the query parameters
    const allQueryParams: QueryParams = {
      project_id: queryParams.get('project_id') || '',
    };

    const [formData, setFormData] = useState<FormData>({
        client_name:'' ,
        organisor: '',
        architect:'' ,
        consultant_name: '',
        meetingDate: '',
        source: '',
        remark: '',
        imaportant_note: '',
        files: [],
        project_id: allQueryParams.project_id,
    })
    const [errors, setErrors] = useState<{ [key: string]: string }>({})

    // Options for the client select input
    const clientOptions: Option[] = [
        { value: 'Abhishek Singh', label: 'Abhishek Singh' },
        // Add more client options if needed
    ]
    const organisorOptions: Option[] = [
        { value: 'Honey Singh', label: 'Honey Singh' },
        // Add more client options if needed
    ]
    const architectOptions: Option[] = [
        { value: 'Sahid Kapur', label: 'Sahid Kapur' },
        // Add more client options if needed
    ]
    const consultant_nameOptions: Option[] = [
        { value: 'Abhishek Singh', label: 'Abhishek Singh' },
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

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
        setErrors({
            ...errors,
            [name]: '',
        })
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        setFormData({ ...formData, files })
        setErrors({
            ...errors,
            files: '',
        })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        // Validate the form data
        // Validate the form data
        const validationErrors: { [key: string]: string } = {}

        // Validate client_name
        if (formData.client_name.length === 0) {
            validationErrors.client_name = "Client's Name is required"
        }

        // Validate organisor
        if (formData.organisor.length === 0) {
            validationErrors.organisor = "Organisor's Name is required"
        }

        // Validate architect
        if (formData.architect.length === 0) {
            validationErrors.architect = "Architect's Name is required"
        }

        // Validate consultant_name
        if (formData.consultant_name.length === 0) {
            validationErrors.consultant_name = "Consultant's Name is required"
        }

        // Validate meetingDate
        if (!formData.meetingDate) {
            validationErrors.meetingDate = 'Meeting Date is required'
        }

        // Validate source
        if (!formData.source) {
            validationErrors.source = 'Source is required'
        }

        // Validate remark
        if (!formData.remark) {
            validationErrors.remark = 'Remark is required'
        }

        // Validate imaportant_note
        if (!formData.imaportant_note) {
            validationErrors.imaportant_note = 'Important Note is required'
        }

        // Validate files
        if (formData.files.length === 0) {
            validationErrors.files = 'File is required'
        }

        // Set errors if any
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        const formatNames = (names: string | string[]) => {
            if (typeof names === 'string') {
                return names; // Return the single name as is
            } else if (names.length === 1) {
                return names[0];
            } else {
                const firstNames = names.slice(0, -1).join(', '); // Join all but the last name with ','
                const lastName = names[names.length - 1]; // Get the last name
                return `${firstNames} & ${lastName}`; // Combine with ' & '
            }
        };

        try {
            const formDataToSend = new FormData()
            formDataToSend.append('meetingdate', formData.meetingDate)
            formDataToSend.append('project_id', formData.project_id)
            formDataToSend.append('source', formData.source)
            formDataToSend.append('remark', formData.remark)
            formDataToSend.append('imaportant_note', formData.imaportant_note)
         
            formDataToSend.append('client_name', formatNames(formData.client_name));
            formDataToSend.append('organisor', formatNames(formData.organisor));
            formDataToSend.append('architect', formatNames(formData.architect));
            formDataToSend.append('consultant_name', formatNames(formData.consultant_name));

            formData.files.forEach((file) =>
                formDataToSend.append('files', file),
            )

            const response = await fetch(
                'https://col-u3yp.onrender.com/v1/api/admin/create/mom/',
                {
                    method: 'POST',
                    body: formDataToSend,
                },
            )

            if (response.ok) {
                alert('MOM created successfully')
                window.location.reload();
                navigate(-1)
                // Redirect to home page or any other page after successful creation
            } else {
                alert('Failed to create MOM')
            }
        } catch (error) {
            console.error('Error:', error)
            alert('An error occurred')
        }
    }
    const clicks=()=>{
      
      window.location.reload();
    }

    return (
        <div>
            <h5>MOM Details</h5>
            <form onSubmit={handleSubmit} className='mt-4'>
                <FormContainer>
                    <div className='grid grid-cols-3 gap-5'>
                    <FormItem label="Client's Name">
                        {/* Use CreatableSelect to allow selecting or creating a new client name */}
                        <CreatableSelect
                            isMulti
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
                    <FormItem label="Organisor's Name">
                        {/* Use CreatableSelect to allow selecting or creating a new client name */}
                        <CreatableSelect
                            isMulti
                            options={organisorOptions}
                            onChange={(selectedOption) =>
                                handleSelectChange(selectedOption, 'organisor')
                            }
                        />
                        {errors.organisor && (
                            <span className="text-red-500">
                                {errors.organisor}
                            </span>
                        )}
                    </FormItem>
                    <FormItem label="Architect's Name">
                        {/* Use CreatableSelect to allow selecting or creating a new client name */}
                        <CreatableSelect
                            isMulti
                            options={architectOptions}
                            onChange={(selectedOption) =>
                                handleSelectChange(selectedOption, 'architect')
                            }
                        />
                        {errors.architect && (
                            <span className="text-red-500">
                                {errors.architect}
                            </span>
                        )}
                    </FormItem>
                    <FormItem label="Consultant's  Name">
                        {/* Use CreatableSelect to allow selecting or creating a new client name */}
                        <CreatableSelect
                            isMulti
                            options={consultant_nameOptions}
                            onChange={(selectedOption) =>
                                handleSelectChange(
                                    selectedOption,
                                    'consultant_name',
                                )
                            }
                        />
                        {errors.consultant_name && (
                            <span className="text-red-500">
                                {errors.consultant_name}
                            </span>
                        )}
                    </FormItem>
                    {/* Add similar FormItem and Select components for other fields */}
                    <FormItem label="Meeting Date">
                        <Input
                            type="date"
                            name="meetingDate"
                            value={formData.meetingDate}
                            onChange={handleInputChange}
                        />
                        {errors.meetingDate && (
                            <span className="text-red-500">
                                {errors.meetingDate}
                            </span>
                        )}
                    </FormItem>
                    <FormItem label="Source">
                        <Input
                            name="source"
                            value={formData.source}
                            onChange={handleInputChange}
                        />
                        {errors.source && (
                            <span className="text-red-500">
                                {errors.source}
                            </span>
                        )}
                    </FormItem>
                    <FormItem label="Remark">
                        <Input
                            name="remark"
                            value={formData.remark}
                            onChange={handleInputChange}
                        />
                        {errors.remark && (
                            <span className="text-red-500">
                                {errors.remark}
                            </span>
                        )}
                    </FormItem>
                    <FormItem label="Important Note">
                        <Input
                            name="imaportant_note"
                            value={formData.imaportant_note}
                            onChange={handleInputChange}
                        />
                        {errors.imaportant_note && (
                            <span className="text-red-500">
                                {errors.imaportant_note}
                            </span>
                        )}
                    </FormItem>
                    <FormItem label="File">
                        <Input
                            type="file"
                            name="files"
                            onChange={handleFileChange}
                            multiple
                        />
                        {errors.files && (
                            <span className="text-red-500">{errors.files}</span>
                        )}
                    </FormItem>
                    </div>
                    <div className=''>
                    <Button type="submit" className='mr-4' variant='solid'>Submit</Button>
                    <Button type="submit" variant='solid' onClick={clicks}>Discard</Button>
                    </div>
                </FormContainer>
            </form>
        </div>
    )
}

export default YourFormComponent