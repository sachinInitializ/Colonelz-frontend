import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import { HiOutlineTrash } from 'react-icons/hi';
import { AiOutlineSave } from 'react-icons/ai';
import axios from 'axios';

type InitialData = {
  role: 'ADMIN'
  project_name?: string
  client_name?: string
  client_contact?: string
  client_email?: string
  project_type?: string
  description?: string
  leadmanager?: string
  junior_designer?: string
  senior_designer?: string
  supervisor?: string
  visualizer?: string
  project_status?: string
  project_start_date?: string
  timeline_date?: string
  project_end_date?: string
  project_budget?: string
  project_location?: string
  id: '65c32e19e0f36d8e1f30955c'
  files:[]
};

type FormModel = Omit<InitialData, 'tags'> & {
  tags: { label: string; value: string }[] | string[];
};

type ProductFormProps = {
  initialData?: InitialData;
  type: 'edit' | 'new';
  onDiscard?: () => void;
  onDelete?: () => void;
};

const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  type,
  onDiscard,
  onDelete,
}) => {
  const [formData, setFormData] = useState<Partial<FormModel>>({
    project_name: 'sdfg',
    project_type: 'sdf',
    description: 'asdf',
    leadmanager: 'dsf',
    junior_designer: 'dsfg',
    supervisor: 'dsf',
    visualizer: 'adsf',
    role: 'ADMIN',
    project_status: 'asf',
    project_start_date: '22-01-2022',
    timeline_date: '22-01-2022',
    project_end_date:'22-01-2022',
    project_budget: 'sas',
    project_location: 'df',
    senior_designer: 'sdf',
    client_name: 'asdf',
    client_contact: '1234567890',
    id: '65c32e19e0f36d8e1f30955c',
    client_email: 'sdfdg@gmail.com',
    files: [],
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData((prevData) => ({ ...prevData, files }));
  };

  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  };
  
  // Update your handleSubmit function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'files') {
          value.forEach((file: File) => {
            formDataToSend.append('files', file);
          });
        } else if (
          ['project_start_date', 'timeline_date', 'project_end_date'].includes(key)
        ) {
          // Convert date strings to date objects
          formDataToSend.append(key, formatDate(value as string));
        } else {
          formDataToSend.append(key, value as string);
        }
      });
  
      const response = await axios.post(
        'https://col-back1.test.psi.initz.run/v1/api/admin/create/project/',
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      console.log(response);
      setShowSuccessMessage(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          {/* Basic Information Fields */}
          <label>
            Project Name:
            <input
              type="text"
              name="project_name"
              value={formData.project_name || ''}
              onChange={handleInputChange}
            />
          </label>
          {/* ... Add other input fields as needed */}
          <label>
            Upload Files:
            <input
              type="file"
              name="files"
              onChange={handleFileChange}
              multiple
            />
          </label>
        </div>

        {/* Other form sections */}
        {/* ... Add other form sections as needed */}

        <div>
          <Button size="sm" onClick={onDiscard}>
            Discard
          </Button>
          <Button size="sm" variant="solid" type="submit" icon={<AiOutlineSave />}>
            Save
          </Button>
          {type === 'edit' && (
            <Button
              size="sm"
              variant="plain"
              onClick={onDelete}
              icon={<HiOutlineTrash />}
            >
              Delete
            </Button>
          )}
        </div>
      </form>

      {showSuccessMessage && (
        <div>
          <p>Data added successfully!</p>
        </div>
      )}
    </>
  );
};

export default ProductForm;
