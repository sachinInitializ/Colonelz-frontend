import React, { useState, ChangeEvent, FormEvent } from 'react';

import ValueType from 'react-select';
import DatePicker from '@/components/ui/DatePicker/DatePicker';
import { StickyFooter } from '@/components/shared';
import { Button, Card, Dialog, FormContainer, FormItem, Input, Select } from '@/components/ui';
import { AiOutlineSave } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import type { MouseEvent } from 'react'
import DateTimepicker from '@/components/ui/DatePicker/DateTimepicker';

interface FormData {
  lead_id: string | null;
  status: string;
  date: Date | null;
  content: string;
  createdBy: string;
}

const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('id');

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

interface CustomerProfilePropss {
    data: {
      // Define the structure of the data object here
      _id: string;
      name: string;
      lead_id: string;
      email: string;
      phone: string;
      location: string;
      status: string;
      source: string;
      date: string;
      // Make notes optional
      createdAt: string;
      __v: number;
      // Add other properties as needed
    };
  }

const YourFormComponent: React.FC<CustomerProfileProps> = ({data}) => {
   
    
  const initialFormData: FormData = {
    lead_id: myParam,
    status: '',
    date: null,
    content: '',
    createdBy: 'Client',
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [selectedStatus, setSelectedStatus] = useState<ValueType<{ value: string; label: string }>>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const statusOptions = [
    { value: 'noresponse', label: 'No Response' },
    { value: 'notInterested', label: 'Not Interested' },
    { value: 'followUp', label: 'Follow Up' },
    { value: 'interested', label: 'Interested' },
    // Add other status options as needed
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

  const handleDateChange = (date: Date | null) => {
    setFormData({ ...formData, date });
    setErrors({
      ...errors,
      date: '',
    });
  };

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
    if (!selectedStatus) {
      validationErrors.status = 'Status is required';
    }
    if (!formData.date) {
      validationErrors.date = 'Date is required';
    }
    if (!formData.content.trim()) {
      validationErrors.content = 'Content is required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Assuming you have an API endpoint for updating leads
      const response = await fetch('https://col-u3yp.onrender.com/v1/api/admin/update/lead/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Update successful, show success alert
        alert('Update successful');
        navigate(-1);
      } else {
        // Update failed, show error alert
        alert('Update failed');
      }
    } catch (error) {
      // Handle any other errors
      console.error('Error:', error);
      alert('An error occurred');
    }
  };


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
  return (
    <div>
          <div className='flex justify-between items-center'>
              <h5>Actions</h5>
              <Button variant='solid' onClick={() => openDialog()} >View Last Update</Button>
              </div>
    <form onSubmit={handleFormSubmit}>
      <FormContainer>
    
        <div className='grid grid-cols-3 gap-5'>
          <FormItem>
            Status:
            <Select
              value={selectedStatus}
              onChange={handleStatusChange}
              options={statusOptions}
            />
            {errors.status && <span className="text-red-500">{errors.status}</span>}
          </FormItem>

          <FormItem>
            Date:
            <DateTimepicker
              size='md'
              selected={formData.date}
              onChange={handleDateChange}
              dateFormat="MM/dd/yyyy"
            />
            {errors.date && <span className="text-red-500">{errors.date}</span>}
            </FormItem>
          
          </div>
          <div className='flex justify-between items-center '>
          <FormItem
                label="Today's Update"
                labelClass="!justify-start"
                className='w-2/3'
            >
                <Input
                     textArea
                     name="content"
                     value={formData.content}
                     onChange={handleInputChange}
                />
                </FormItem>
          <Button
              size="sm"
              variant="solid"
              type="submit"
              className=''
            >
              Submit
            </Button>
         
            </div>

        
      </FormContainer>
    </form>

    <Dialog
                isOpen={dialogIsOpen}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
                width={1000}
                height={490}
            >
              <div style={{ maxHeight: '400px', overflowY: 'auto', marginRight:"2%", marginLeft:"1%", scrollbarWidth:'none'  }} className='scrollbar-hide  whitespace-nowrap'>
        {data?.notes?.map((note) => (
          <div key={note._id} className='mb-4 mr-4'>
            <Card>
              <div className='flex flex-row justify-between items-center mb-4 '>
                <CustomerInfoField title="Date" value={new Date(note.date).toISOString().split('T')[0]} />
                <CustomerInfoField title="Status" value={note.status} />
              </div>
              <CustomerInfoField title="Description" value={note.content} />
            </Card>
            
          </div>
        ))}
        <div className="text-right mt-6 mb-4 mr-[2%]">
        <Button variant="solid" onClick={onDialogOk}>
          Okay
        </Button>
      </div>
      </div>
      
            </Dialog>
    </div>
  );
};

export default YourFormComponent;
