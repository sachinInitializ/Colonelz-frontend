import React, { useState, ChangeEvent, FormEvent } from 'react';
import ValueType from 'react-select';
import { Button, FormContainer, FormItem, Input, Select } from '@/components/ui';
import { useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns'
import DatePicker from '@/components/ui/DatePicker/DatePicker';
import { StickyFooter } from '@/components/shared';

interface FormData {
  lead_id: string | null;
  status: string;
  content: string;
  createdBy: string;
  client_name: string;
  client_email: string;
  client_contact: string;
  location: string;
  description: string;
  project_type: string;
  project_name: string;
  project_status:string;
  timeline_date:Date;
  project_budget:string;
  project_start_date:Date;
}

interface CustomerProfileProps {
  data?: Partial<Customer>;
}

type Customer = {
  _id: string;
  name: string;
  lead_id: string;
  email: string;
  phone: string;
  location: string;
  status: string;
  source: string;
  notes: string[];
};

const YourFormComponent: React.FC<CustomerProfileProps> = ({ data }) => {
    interface QueryParams {
        id: string;
        name: string;
        email: string;
        phone: string;
        location: string;
      }
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    
    // Create an object to store and map the query parameters
    const allQueryParams: QueryParams = {
      id: queryParams.get('id') || '',
      name: queryParams.get('name') || '',
      email: queryParams.get('email') || '',
      phone: queryParams.get('phone') || '',
      location: queryParams.get('location') || '',
    };

  const initialFormData: FormData = {
    lead_id: allQueryParams.id,
    status: '',
    content: '',
    createdBy: 'Client',
    client_name: allQueryParams.name,
    client_email: allQueryParams.email,
    client_contact: allQueryParams.phone,
    location: allQueryParams.location,
    description: '',
    project_type: '',
    project_name: '',
    project_status:'df',
    project_start_date: new Date(),
    timeline_date: new Date(),
    project_budget:'',
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [selectedStatus, setSelectedStatus] = useState<ValueType<{ value: string; label: string }>>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const projectTypeOptions = [
    { value: 'commercial', label: 'Commercial' },
    { value: 'residential', label: 'Residential' },
  ];
  const projectStatusOptions = [
    { value: 'execution', label: 'Executing' },
    { value: 'design', label: 'Designing' },
    { value: 'completed', label: 'Completed' },
  ];

  const handleStatusChange = (selectedOption: ValueType<{ value: string; label: string }>) => {
    setSelectedStatus(selectedOption);
    setFormData({
      ...formData,
      status: selectedOption ? (selectedOption as { value: string; label: string }).value : '',
    });
    setErrors({
      ...errors,
      status: '',
    });
  };

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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate the form data
    const validationErrors: { [key: string]: string } = {};

   
    if (!formData.client_name.trim()) {
      validationErrors.client_name = "Client's Name is required";
    }
    if (!formData.client_email.trim() || !/^\S+@\S+\.\S+$/.test(formData.client_email.trim())) {
      validationErrors.client_email = 'Valid email is required';
    }
    if (!formData.client_contact.trim() || !/^\d{10}$/.test(formData.client_contact.trim())) {
      validationErrors.client_contact = 'Valid 10-digit contact number is required';
    }
    if (!formData.location.trim()) {
      validationErrors.location = 'Location is required';
    }
    if (!formData.description.trim()) {
      validationErrors.description = 'Description is required';
    }
    if (!formData.project_type.trim()) {
      validationErrors.project_type = 'Project Type is required';
    }
  
    if (!formData.project_name.trim()) {
      validationErrors.project_name = 'Project Name is required';
    }
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Assuming you have an API endpoint for creating projects
      const response = await fetch('https://col-u3yp.onrender.com/v1/api/admin/create/lead/project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Project creation successful, show success alert
        alert('Project creation successful');
        navigate(-1);
      } else {
        // Project creation failed, show error alert
        alert('Project creation failed');
      }
    } catch (error) {
      // Handle any other errors
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  return (
    <div>
      <div className='flex justify-between items-center max-sm:flex-col mb-6'>
        <h5>Basic Information</h5>
        <Button
          variant='solid'
          onClick={() =>
            navigate(
              `/app/crm/lead-project/?id=${myParam}&name=${data?.name}&email=${data?.email}&phone=${data?.phone}&location=${data?.location}`
            )
          }
        >
          Create Project
        </Button>
      </div>
      <form onSubmit={handleFormSubmit}>
        <FormContainer>
         
          
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 xl:grid-cols-3 '>
            <FormItem label="Client's Name" className=''>
              <Input name='client_name' value={formData.client_name} onChange={handleInputChange} />
              {errors.client_name && <span className='text-red-500'>{errors.client_name}</span>}
            </FormItem>
            <FormItem label='Client Email' className=''>
              <Input name='client_email' value={formData.client_email} onChange={handleInputChange} />
              {errors.client_email && <span className='text-red-500'>{errors.client_email}</span>}
            </FormItem>
            <FormItem label='Client Contact' className=''>
              <Input name='client_contact' value={formData.client_contact} onChange={handleInputChange} />
              {errors.client_contact && <span className='text-red-500'>{errors.client_contact}</span>}
            </FormItem>
            <FormItem label='Project Name' className=''>
              <Input name='project_name' value={formData.project_name} onChange={handleInputChange} />
              {errors.project_name && <span className='text-red-500'>{errors.project_name}</span>}
            </FormItem>
            <FormItem label='Location' className=''>
              <Input name='location' value={formData.location} onChange={handleInputChange} />
              {errors.location && <span className='text-red-500'>{errors.location}</span>}
            </FormItem>
            <FormItem label='Project Budget' className=''>
              <Input name='project_budget' value={formData.project_budget} onChange={handleInputChange} />
              {errors.project_budget && <span className='text-red-500'>{errors.project_budget}</span>}
            </FormItem>
            <FormItem label='Project Type' className=''>
            <Select
                options={projectTypeOptions}
                value={projectTypeOptions.find((option) => option.value === formData.project_type)}
                onChange={(selectedOption) => {
                  setFormData({
                    ...formData,
                    project_type: selectedOption ? (selectedOption as { value: string; label: string }).value : '',
                  });
                  setErrors({
                    ...errors,
                    project_type: '',
                  });
                }}
              />
              {errors.project_type && <span className='text-red-500'>{errors.project_type}</span>}
            </FormItem>
            <FormItem label='Project Status' className=''>
            <Select
                options={projectStatusOptions}
                value={projectStatusOptions.find((option) => option.value === formData.project_status)}
                onChange={(selectedOption) => {
                  setFormData({
                    ...formData,
                    project_status: selectedOption ? (selectedOption as { value: string; label: string }).value : '',
                  });
                  setErrors({
                    ...errors,
                    project_status: '',
                  });
                }}
              />
              {errors.project_status && <span className='text-red-500'>{errors.project_status}</span>}
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
                <FormItem label="Timeline Date">
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
                    {errors.timeline_date && (
                        <span className="text-red-500">
                            {errors.timeline_date}
                        </span>
                    )}
                </FormItem>
       
            <FormItem label='Description' className=''>
              <Input name='description' value={formData.description} onChange={handleInputChange} textArea />
            </FormItem>
           
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
                        }}
                    >
                        Discard
                    </Button>
                    <Button size="sm" variant="solid" type="submit">
                        Submit
                    </Button>
                </div>
            </StickyFooter>
        </FormContainer>
      </form>
    </div>
  );
};

export default YourFormComponent;
