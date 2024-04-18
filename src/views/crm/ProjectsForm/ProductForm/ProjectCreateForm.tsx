// File: FileUploadForm.tsx

import React, { useState } from 'react'
import axios from 'axios'
import Select from 'react-select'
import DatePicker from '@/components/ui/DatePicker/DatePicker'
import { Button, FormItem, Input, Upload } from '@/components/ui'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { RichTextEditor, StickyFooter } from '@/components/shared'
import { HiOutlineCloudUpload } from 'react-icons/hi'

interface FormData {
    project_name: string
    project_type: string
    description: string
    leadmanager: string
    designer: string
    supervisor: string
    visualizer: string
    role: string
    project_status: string
    project_start_date: Date
    timeline_date: Date
    project_end_date: Date
    project_budget: string
    project_location: string
    senior_designer: string
    client_name: string
    client_contact: string
    id: string
    client_email: string
    files: File[]
}

const FileUploadForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        project_name: '',
        project_type: '',
        description: '',
        leadmanager: '',
        designer: '',
        supervisor: '',
        visualizer: '',
        role: '',
        project_status: '',
        project_start_date: new Date(),
        timeline_date: new Date(),
        project_end_date: new Date(),
        project_budget: '',
        project_location: '',
        senior_designer: '',
        client_name: '',
        client_contact: '',
        id: '65c32e19e0f36d8e1f30955c',
        client_email: '',
        files: [],
    })

    const [errors, setErrors] = useState<{ [key: string]: string }>({})

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target

        // Check if it's the description field
        if (name === 'description') {
            setFormData({
                ...formData,
                description: value,
            })
        } else {
            // For other input fields
            setFormData({
                ...formData,
                [name]: value,
            })
        }

        setErrors({
            ...errors,
            [name]: '',
        })
    }

    const handleRichTextChange = (value: string) => {
        setFormData({
            ...formData,
            description: value,
        })

        // You can perform additional actions if needed
        // For example, updating errors or other state based on rich text changes
    }

    // ...

    const handleFileChange = (files: FileList | null) => {
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

    // ...

    const handleDateChange = (date: Date | null, fieldName: string) => {
        setFormData({
            ...formData,
            [fieldName]: date ? format(date, 'MM-dd-yyyy') : null,
        })
        setErrors({
            ...errors,
            date: '',
        })
    }
    const navigate = useNavigate()
    const projectTypeOptions = [
        { value: 'commercial', label: 'Commercial' },
        { value: 'residential', label: 'Residential' },
    ]
    const projectStatusOptions = [
        { value: 'completed', label: 'Completed' },
        { value: 'designing', label: 'Designing' },
        { value: 'executing', label: 'Executing' },
    ]

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const validationErrors: { [key: string]: string } = {}

        if (!formData.client_name.trim()) {
            validationErrors.client_name = "Client's Name is required"
        }
        if (
            !formData.client_email.trim() ||
            !/^\S+@\S+\.\S+$/.test(formData.client_email.trim())
        ) {
            validationErrors.client_email = 'Valid email is required'
        }
        if (
            !formData.client_contact.trim() ||
            !/^\d{10}$/.test(formData.client_contact.trim()) ||
            /\s/.test(formData.client_contact.trim()) ||
            /^\s|\s$/.test(formData.client_contact)
        ) {
            validationErrors.client_contact =
                'Valid 10-digit contact number without spaces'
        }

        if (!formData.project_type.trim()) {
            validationErrors.project_type = 'Project Type is required'
        }
        if (!formData.project_name.trim()) {
            validationErrors.project_name = ' Name is required'
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        try {
            const formDataToSend = new FormData()
            // Append non-file fields
            for (const key in formData) {
                if (key !== 'files') {
                    formDataToSend.append(key, formData[key])
                }
            }
            // Append files
            formData.files.forEach((file) => {
                formDataToSend.append('files', file)
            })

            const response = await fetch(
                'https://col-back1.test.psi.initz.run/v1/api/admin/create/project/',
                {
                    method: 'POST',
                    body: formDataToSend,
                },
            )
            console.log(response)

            if (response.ok) {
                const confirmation = window.confirm(
                    'Project creation successful.',
                )
                if (confirmation) {
                    navigate('/app/crm/projectslist')
                    window.location.reload()
                }
            } else {
                alert('Project creation failed')
            }
        } catch (error) {
            console.error('Error:', error)
            alert('An error occurred')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-6 sm:grid-cols-2">
                <FormItem label="Client Name">
                    <Input
                        required
                        size="sm"
                        type="text"
                        id="client_name"
                        name="client_name"
                        value={formData.client_name}
                        onChange={handleInputChange}
                    />
                    {errors.client_name && (
                        <span className="text-red-500">
                            {errors.client_name}
                        </span>
                    )}
                </FormItem>
                <FormItem label="Client Contact">
                    <Input
                        required
                        size="sm"
                        type="text"
                        id="client_contact"
                        name="client_contact"
                        value={formData.client_contact}
                        onChange={handleInputChange}
                    />
                    {errors.client_contact && (
                        <span className="text-red-500">
                            {errors.client_contact}
                        </span>
                    )}
                </FormItem>
                <FormItem label="Client Email">
                    <Input
                        size="sm"
                        type="text"
                        id="client_email"
                        name="client_email"
                        value={formData.client_email}
                        onChange={handleInputChange}
                    />
                    {errors.client_email && (
                        <span className="text-red-500">
                            {errors.client_email}
                        </span>
                    )}
                </FormItem>
                <FormItem label="Project Name">
                    <Input
                        size="sm"
                        type="text"
                        id="project_name"
                        name="project_name"
                        value={formData.project_name}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.project_name && (
                        <span className="text-red-500">
                            {errors.project_name}
                        </span>
                    )}
                </FormItem>
                <FormItem label="Project Type">
                    <Select
                        options={projectTypeOptions}
                        value={projectTypeOptions.find(
                            (option) => option.value === formData.project_type,
                        )}
                        onChange={(selectedOption) => {
                            setFormData({
                                ...formData,
                                project_type: selectedOption
                                    ? (
                                          selectedOption as {
                                              value: string
                                              label: string
                                          }
                                      ).value
                                    : '',
                            })
                            setErrors({
                                ...errors,
                                project_type: '',
                            })
                        }}
                    />
                    {errors.project_type && (
                        <span className="text-red-500">
                            {errors.project_type}
                        </span>
                    )}
                </FormItem>
                <FormItem label="Lead Manager">
                    <Input
                        size="sm"
                        type="text"
                        id="leadmanager"
                        name="leadmanager"
                        value={formData.leadmanager}
                        onChange={handleInputChange}
                        required
                    />
                </FormItem>
                <FormItem label=" Designer">
                    <Input
                        size="sm"
                        type="text"
                        id="designer"
                        name="designer"
                        value={formData.designer}
                        onChange={handleInputChange}
                        required
                    />
                </FormItem>

                <FormItem label="Visualizer">
                    <Input
                        size="sm"
                        type="text"
                        id="visualizer"
                        name="visualizer"
                        value={formData.visualizer}
                        onChange={handleInputChange}
                        required
                    />
                </FormItem>

                <FormItem label="Project Status">
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
                            setErrors({
                                ...errors,
                                project_status: '',
                            })
                        }}
                        required
                    />
                </FormItem>
                <FormItem label="Project Start Date">
                    <DatePicker
                        size="sm"
                        selected={
                            formData.project_start_date
                                ? new Date(formData.project_start_date)
                                : null
                        }
                        onChange={(date) =>
                            handleDateChange(date, 'project_start_date')
                        }
                        dateFormat="MM/dd/yyyy"
                    />
                    {errors.project_start_date && (
                        <span className="text-red-500">
                            {errors.project_start_date}
                        </span>
                    )}
                </FormItem>
                <FormItem label="Project End Date">
                    <DatePicker
                        size="sm"
                        selected={
                            formData.timeline_date
                                ? new Date(formData.timeline_date)
                                : null
                        }
                        onChange={(date) =>
                            handleDateChange(date, 'timeline_date')
                        }
                        dateFormat="MM/dd/yyyy"
                    />
                </FormItem>
                <FormItem label="Project Budget">
                    <Input
                        size="sm"
                        type="text"
                        id="project_budget"
                        name="project_budget"
                        value={formData.project_budget}
                        onChange={handleInputChange}
                        required
                    />
                </FormItem>
                <FormItem label="Project Location">
                    <Input
                        size="sm"
                        type="text"
                        id="project_location"
                        name="project_location"
                        value={formData.project_location}
                        onChange={handleInputChange}
                        required
                    />
                </FormItem>
                <FormItem label="Description">
                    <RichTextEditor
                        value={formData.description}
                        id="description"
                        name="description"
                        onChange={handleRichTextChange}
                    />
                </FormItem>

                <div>
                    <FormItem label="Files">
                        <Upload onChange={(files) => handleFileChange(files)}>
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
            </div>
            <StickyFooter
                className="-mx-8 px-8 flex items-center justify-between py-4"
                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            >
                <div className="md:flex items-center">
                    <Button
                        size="sm"
                        className="ltr:mr-3 rtl:ml-3"
                        type="button"
                        onClick={() => {
                            navigate(-1)
                            // window.location.reload()
                        }}
                    >
                        Discard
                    </Button>
                    <Button size="sm" variant="solid" type="submit">
                        Submit
                    </Button>
                </div>
            </StickyFooter>
        </form>
    )
}

export default FileUploadForm
