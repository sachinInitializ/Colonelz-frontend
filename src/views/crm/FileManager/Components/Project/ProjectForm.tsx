import { Button, FormItem, Upload } from '@/components/ui';
import React, { useState } from 'react';
import { HiOutlineCloudUpload } from 'react-icons/hi';
import CreatableSelect from 'react-select/creatable';

interface FormData {
  project_id: string;
  folder_name: string;
  files: File[];
}

type Option = {
  value: string;
  label: string;
};

const YourFormComponent: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    project_id: 'COLP-692488',
    folder_name: '',
    files: [],
  });

  const handleSelectChange = (
    selectedOption: Option | Option[] | null,
    fieldName: string,
  ) => {
    const selectedValues = Array.isArray(selectedOption)
      ? selectedOption.map((option) => option.value)
      : selectedOption
      ? [selectedOption.value]
      : [];

    // Trim spaces from the selected value
    const trimmedValue = selectedValues.length > 0 ? selectedValues[0].trim() : '';

    setFormData({
      ...formData,
      [fieldName]: trimmedValue,
    });
  };
  

  const handleFileChange = (files: FileList | null) => {
    if (files) {
        setFormData((prevFormData) => ({
            ...prevFormData,
            files: Array.from(files),
        }))
      
    }
}

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create FormData object
    const postData = new FormData();

    // Append data to FormData
    postData.append('project_id', formData.project_id);
    postData.append('folder_name', formData.folder_name);

    // Append files to FormData
    formData.files.forEach((file) =>
    postData.append('files', file),
)

    // Use postData to make a POST request to your API
    try {
      const response = await fetch(
        'https://col-u3yp.onrender.com/v1/api/admin/project/fileupload',
        {
          method: 'POST',
          body: postData,
        },
      );

      // Handle the response as needed
      console.log('Response:', response);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const clientOptions: Option[] = [
    {
      value: 'devashish',
      label: 'devashish',
    },
    // Add more client options if needed
  ];

  return (
    <form onSubmit={handleSubmit} className=' overflow-y-auto max-h-[400px]' style={{scrollbarWidth:'none'}}>
     <h3 className='mb-5'>Project File Upload</h3>
      <div className='mb-5'>
        <CreatableSelect
        name='folder_name'
          options={clientOptions}
          onChange={(selectedOption) =>
            handleSelectChange(selectedOption, 'folder_name')
          }
        />
      </div>

      <FormItem label="File">
                            <Upload
                                onChange={(files) => handleFileChange(files)}
                            >
                                <Button
                                    
                                    icon={<HiOutlineCloudUpload />}
                                    type="button"
                                >
                                    Upload your file
                                </Button>
                            </Upload>
                        </FormItem>
              <div className='flex justify-end'>

      <Button type="submit" variant='solid'>Submit</Button>
      </div>
    </form>
  );
};

export default YourFormComponent;
