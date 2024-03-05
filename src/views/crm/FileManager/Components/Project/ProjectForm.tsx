import { Button, FormItem, Notification, Upload, toast } from '@/components/ui';
import React, { useState } from 'react';
import { HiOutlineCloudUpload } from 'react-icons/hi';
import { useLocation } from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';
import { Data } from './data';

interface FormData {
  project_id: string | null;
  folder_name: string;
  files: File[];
}

type Option = {
  value: string;
  label: string;
};

const YourFormComponent: React.FC<Data> = (data) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const projectId = queryParams.get('project_id');
  const [formData, setFormData] = useState<FormData>({
    project_id: projectId,
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
function closeAfter2000ms(data:string,type:string) {
  toast.push(
      <Notification closable type={type} duration={2000}>
          {data}
      </Notification>,{placement:'top-center'}
  )
}

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.folder_name || formData.files.length === 0) {
      toast.push(
        <Notification closable type="warning" duration={3000}>
          Please select a folder and upload at least one file.
        </Notification>,
        { placement: 'top-center' }
      );
      return;
    }
    const postData = new FormData();

    if (formData.project_id !== null) {
      postData.append('project_id', formData.project_id);
    }
    postData.append('folder_name', formData.folder_name);

    formData.files.forEach((file) =>
    postData.append('files', file),
)

    try {
      const response = await fetch(
        'https://col-u3yp.onrender.com/v1/api/admin/project/fileupload',
        {
          method: 'POST',
          body: postData,
        },
      );

    
      const responseData = await response.json(); 
      console.log('Response Data:', responseData);
  
      if (response.ok) {
        closeAfter2000ms('File uploaded successfully.','success');
      
        window.location.reload();
      } else {
        closeAfter2000ms(`Error: ${responseData.message}`,'warning');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      closeAfter2000ms('An error occurred while submitting the form.','warning');
    }
  };

const uniqueFolderNames = Array.from(
    new Set(data.data.map((folderItem) => folderItem.folder_name.trim())),
)

const clientOptions: Option[] = uniqueFolderNames.map((folderName) => ({
    value: folderName,
    label: folderName,
}))

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
