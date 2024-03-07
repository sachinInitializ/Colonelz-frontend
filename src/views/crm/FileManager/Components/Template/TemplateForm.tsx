import { Button, FormItem, Notification, Upload, toast } from '@/components/ui';
import React, { useEffect, useState } from 'react';
import { HiOutlineCloudUpload } from 'react-icons/hi';
import { useLocation } from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';
import { getTemplateData } from '../data';
import {  FoldersItem } from '../type';

interface FormData {
  sub_folder_name_first: string | null,
  sub_folder_name_second: string ,
  folder_name: string | null;
  files: File[];
  type:string
}

type Option = {
  value: string;
  label: string;
};

const YourFormComponent: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const folderName = queryParams.get('folder');
  const type = queryParams.get('type');
  const [leadData, setLeadData] = useState<FoldersItem[]>([]);
  const [formData, setFormData] = useState<FormData>({
    sub_folder_name_first: folderName,
    sub_folder_name_second: '',
    folder_name: type,
    files: [],
    type:'template'
  });
  useEffect(() => {
    const fetchDataAndLog = async () => {
      try {
        const templateData = await getTemplateData();
        console.log(templateData);
  
        // Filter folders based on query parameters
        const filteredFolders = templateData.filter((folder) => {
          return (
            folder.files[0].folder_name === type &&
            folder.files[0].sub_folder_name_first === folderName
          );
        });
  console.log(filteredFolders);
  
        if (filteredFolders.length > 0) {
          setLeadData(filteredFolders[0].files);
        } else {
          console.warn('No matching folder found.');
          // Handle case where no matching folder is found based on query parameters
        }
  
        console.log(leadData);
        
      } catch (error) {
        console.error('Error fetching lead data', error);
      }
    };
  
    fetchDataAndLog();
  }, [type, folderName]);

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

    if (!formData.sub_folder_name_second|| formData.files.length === 0) {
      toast.push(
        <Notification closable type="warning" duration={3000}>
          Please select a folder and upload at least one file.
        </Notification>,
        { placement: 'top-center' }
      );
      return;
    }
    const postData = new FormData();
    
    postData.append('sub_folder_name_second', formData.sub_folder_name_second);
    postData.append('folder_name', formData.folder_name);
    postData.append('sub_folder_name_first', formData.sub_folder_name_first);
    postData.append('type', formData.type);

    formData.files.forEach((file) =>
    postData.append('files', file),
)

    try {
      const response = await fetch(
        'https://col-back.onrender.com/v1/api/admin/template/fileupload',
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
    new Set(leadData.map((folderItem) => folderItem.sub_folder_name_second.trim())),
)

const clientOptions: Option[] = uniqueFolderNames.map((folderName) => ({
    value: folderName,
    label: folderName,
}))

  return (
    <form 
    className=' overflow-y-auto max-h-[400px]' 
    style={{scrollbarWidth:'none'}}
    onSubmit={handleSubmit}
     >
     <h3 className='mb-5'>Project File Upload</h3>
      <div className='mb-5'>
        <CreatableSelect
        name='sub_folder_name_second'
         options={clientOptions}
          onChange={(selectedOption) =>
            handleSelectChange(selectedOption, 'sub_folder_name_second')
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
