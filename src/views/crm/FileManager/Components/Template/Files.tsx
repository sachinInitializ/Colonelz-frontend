import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Checkbox, Dialog, FormItem, Input, Notification, Upload, toast } from '@/components/ui';
import { StickyFooter } from '@/components/shared';
import CreatableSelect from 'react-select/creatable';
import { CiFileOn, CiImageOn } from 'react-icons/ci';
import { getTemplateData } from '../data';
import {  FileItem } from '../type';
import { apiDeleteFileManagerFiles, apiGetCrmFileManagerCreateTemplateFolder, apiGetCrmFileManagerShareFiles } from '@/services/CrmService';
import { HiShare, HiTrash } from 'react-icons/hi';
import { format, parseISO } from 'date-fns';
import { Field, Form, Formik } from 'formik';

const Index = () => {
  const [leadData, setLeadData] = useState<FileItem[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const folderName = queryParams.get('folder');
  const type = queryParams.get('type');
  const subfolder = queryParams.get('subfolder');
  const folderId = queryParams.get('folder_id');
  
  const navigate=useNavigate()

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBody(e.target.value);
  };

  const [dialogIsOpen, setIsOpen] = useState(false)
  const [dialogIsOpen2, setIsOpen2] = useState(false)

  const openDialog = (fileId:string) => {
    setIsOpen(true)
    setSelectedFiles([fileId])
    console.log(fileId);
    
}

  const onDialogClose = () => {
      setIsOpen(false)
  }

  const onDialogClose2 = () => {
    setIsOpen2(false)
}
const openDialog2 = () => {
    setIsOpen2(true)
}

  useEffect(() => {
    const fetchDataAndLog = async () => {
      try {
        const templateData = await getTemplateData();
        console.log(templateData);
        const filteredFolders = templateData.filter((folder) => {
         if(folder.files[0]?.sub_folder_name_second){
          
          return (
            folder.files[0]?.folder_name === type &&
            folder.files[0]?.sub_folder_name_first === folderName &&
            folder.files[0]?.sub_folder_name_second === subfolder
          );}
        });

  
        if (filteredFolders.length > 0) {
          setLeadData(filteredFolders[0].files[0].files);
          console.log(filteredFolders[0].files[0].files);
          
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
  }, [type, folderName, subfolder]);

  const handleFileSelect = (fileId: string) => {
  
    const updatedSelectedFiles = selectedFiles.includes(fileId)
      ? selectedFiles.filter((id) => id !== fileId)
      : [...selectedFiles, fileId];
    setSelectedFiles(updatedSelectedFiles);

  };

  const deleteFiles = async (fileId:string) => {
    selectedFiles.push(fileId)
    function warn(text:string) {
      toast.push(
          <Notification closable type="warning" duration={2000}>
              {text}
          </Notification>,{placement:'top-center'}
      )
  }
    if (selectedFiles.length === 0) {
      warn('No files selected for deletion.')
      return;
    }
    
    const postData = {
      file_id: selectedFiles,
      folder_name: subfolder,
      type:'template',
    };
    try {
      const response=await apiDeleteFileManagerFiles(postData);
      const responseJson=await response.json()
      console.log(responseJson);
      
      if (response.ok) {
        toast.push(
          <Notification closable type="success" duration={2000}>
            Files deleted successfully
          </Notification>,{placement:'top-center'}
        )
        window.location.reload()
      }
      else{
        toast.push(
          <Notification closable type="danger" duration={2000}>
            {responseJson.errorMessage}
          </Notification>,{placement:'top-center'}
        )
      }
    
    } catch (error) {
      console.error('Error deleting files:', error);
    }
    
  }
  const handleShareFiles = async () => {

    if (selectedFiles.length === 0 || selectedEmails.length === 0) {
        warn('No files or email addresses selected for sharing.')
        return
    }
  
    const postData = {
      folder_id:folderId,
        type:'template',
      file_id: selectedFiles,
      email: selectedEmails,
      subject: subject,
      body: body,
    };

      function closeAfter2000ms() {
      toast.push(
          <Notification closable type="success" duration={2000}>
              Successfully Shared
          </Notification>
      )
  }

      function warn(text: string) {
          toast.push(
              <Notification closable type="warning" duration={2000}>
                  {text}
              </Notification>,
              { placement: 'top-center' },
          )
      }



    try {
      const response = await apiGetCrmFileManagerShareFiles(postData);
  
      if (!response.ok) {
        console.error('Error sharing files:', response.statusText);
        return;
      }
  
      const responseData = await response.json();
  
      console.log('Files shared successfully:', responseData);
  
      setSelectedFiles([]);
      setSelectedEmails([]);
      setSubject('')
      setBody('')
      onDialogClose()
      closeAfter2000ms()
     
      
      const updatedLeadData = leadData.map((file) => ({ ...file, active: false }));
      setLeadData(updatedLeadData);
    } catch (error) {
      console.error('Error sharing files:', error);
    }
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    const imageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'tiff', 'ico'];
    if (imageExtensions.includes(extension as string)) {
      return <CiImageOn className='text-xl' />;
    }
    switch (extension) {
      case 'docx':
        return <CiFileOn className='text-xl' />;
      case 'png':
        return <CiImageOn className='text-xl' />;
      case 'pptx':
        return <CiFileOn className='text-xl' />;
      default:
        return <CiFileOn className='text-xl' />;
    }
  };
  const getFileType = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase() || '';
    const imageExtensions = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'tiff', 'ico'];
    const documentExtensions = ['docx', 'doc', 'txt', 'pdf'];
    const presentationExtensions = ['pptx', 'ppt'];
    const spreadsheetExtensions = ['xlsx', 'xls', 'csv'];
    const audioExtensions = ['mp3', 'wav', 'ogg'];
    const videoExtensions = ['mp4', 'avi', 'mov'];
  
    if (imageExtensions.includes(extension)) {
      return 'Image';
    } else if (documentExtensions.includes(extension)) {
      return 'Document';
    } else if (presentationExtensions.includes(extension)) {
      return 'Presentation';
    } else if (spreadsheetExtensions.includes(extension)) {
      return 'Spreadsheet';
    } else if (audioExtensions.includes(extension)) {
      return 'Audio';
    } else if (videoExtensions.includes(extension)) {
      return 'Video';
    } else {
      return 'File';
    }
  };

  function formatFileSize(fileSizeInKB: string | undefined): string {
    if (!fileSizeInKB) {
      return '-';
    }
  
    const size = Number(fileSizeInKB.split(' ')[0]);
    if (size < 1024) {
      return `${size.toFixed(2)} KB`;
    } else {
      return `${(size / 1024).toFixed(2)} MB`;
    }
  }

  return (
    <div>
        <div className='flex justify-between'>
      <h3 className='mb-5'>Company Data</h3>
      <Button className='' size='sm' variant='solid' onClick={()=>openDialog2()}>
        Upload Files
      </Button>
      </div>
      {leadData && leadData.length > 0 ? (
        
        <div className="h-screen w-full">
        <div className="flex-1 p-4">
        <div className="flex items-center mb-4">
    <nav className="flex">
      <ol className="flex items-center space-x-2">
      <li>
              <Link to={`/app/crm/fileManager`} className="text-blue-600 dark:text-blue-400 hover:underline">FileManager</Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li>
              <Link to={`/app/crm/fileManager`} className="text-blue-600 dark:text-blue-400 hover:underline">Company Data</Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            {type !== 'company data' && (
              <>
            <li>
              <Link to={`/app/crm/fileManager/project/templates/${type}`} className="text-blue-600 dark:text-blue-400 hover:underline">{type}</Link>
            </li>
          
          <li>
            <span className="mx-2">/</span>
          </li></>)}
        <li>
          <Link to={`/app/crm/fileManager/project/templates/${type==="company data"?"miscellaneous":`${type}`}/subfolder?type=${type}&folder=${folderName}`} className="text-blue-600 dark:text-blue-400 hover:underline">{folderName}</Link>
        </li>
        <li>
          <span className="mx-2">/</span>
        </li>
      
        <li className="text-gray-500">{subfolder}</li>
      </ol>
    </nav>
  </div>
  
          <div className="border rounded-lg shadow-sm dark:border-gray-700">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&amp;_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                      Name
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                      Type
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                      Size
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                      Modified
                    </th>
                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 ">
                      Actions
                    </th>
                  </tr>
                </thead>
            <tbody className="[&amp;_tr:last-child]:border-0">
            {leadData.map((file) => {
          if (!file || typeof file.fileName !== 'string') {
            console.log(file);
            
            return null; 
          }
          return(
              <tr key={file.fileId} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  <div className="flex items-center gap-2">
                  {getFileIcon(file.fileName)}
                    <a className="font-medium cursor-pointer" href={file.fileUrl} target='_blank'>
                      {file.fileName}
                    </a>
                  </div>
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                {getFileType(file.fileName)}
              </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{formatFileSize(file.fileSize)}</td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{format(parseISO(file.date),'dd-MM-yyyy')}</td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-center">
                  <div className=' flex justify-center gap-3'> 
  
                    <HiTrash className='text-xl cursor-pointer hover:text-red-500' onClick={()=>deleteFiles(file.fileId)} />
                    <HiShare className='text-xl cursor-pointer'  onClick={() => openDialog(file.fileId)}/>  
                    </div>
  
                </td>
              </tr>)})}
            
            </tbody>
  
              </table>
            </div>
          </div>
        </div>
      </div>
         ) : (
          <p>No files</p>
        )}
      <StickyFooter
        className="-mx-8 px-8 flex items-center justify-between py-4 mt-7"
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
            Back
          </Button>
          <Button size="sm" variant="solid" type="submit" onClick={handleShareFiles}>
            Share
          </Button>
        </div>
      </StickyFooter>
      <Dialog
                isOpen={dialogIsOpen}
                style={{}}
                className='max-h-[300px]'
                onClose={onDialogClose} 
                onRequestClose={onDialogClose}

            >
              <h3 className='mb-5'>Share Files</h3>

          <CreatableSelect
          
    isMulti
    value={selectedEmails.map((email) => ({ label: email, value: email }))}
    
    placeholder="Add email addresses..."
    onChange={(newValues) => {
      const emails = newValues ? newValues.map((option) => option.value) : [];
      setSelectedEmails(emails);
    }}
    onCreateOption={(inputValue) => {
      const newEmails = [...selectedEmails, inputValue];
      setSelectedEmails(newEmails);
    }}
  />

<div className='mt-4'>
          <label className='block text-sm font-medium text-gray-700'>Subject</label>
          <input
            type='text'
            className='mt-1 p-2 w-full border rounded-md'
            value={subject}
            placeholder='Enter subject...'
            onChange={handleSubjectChange}
          />
        </div>

        <div className='mt-4'>
          <label className='block text-sm font-medium text-gray-700'>Body</label>
          <Input
            className='mt-1 p-2 w-full border rounded-md'
            value={body}
            textArea
            placeholder='Enter body...'
            onChange={handleBodyChange}
          />
        </div>
  
         <div className='flex justify-end'>
         <Button size="sm" variant="solid" type="submit" className='mt-5 ' onClick={handleShareFiles} >
            Share
          </Button>
          </div>
            </Dialog>

            <Dialog  isOpen={dialogIsOpen2}
                className='max-h-[300px]'
                onClose={onDialogClose2} 
                onRequestClose={onDialogClose2}>
                    <h3 className=''>Upload Files</h3>
                    <Formik
                    initialValues={{
                      type:"template",
                      folder_name:type,
                      sub_folder_name_first:folderName,
                      sub_folder_name_second:subfolder,
                      files:[]}}
                    onSubmit={async(values) => {
                      if(values.files.length===0){
                        toast.push(
                          <Notification closable type="warning" duration={2000}>
                              No files selected for upload
                          </Notification>,{placement:'top-center'}
                      )}
                      else{
                        console.log(values);
                        let formData = new FormData();
                        formData.append('type', values.type || '');
                        formData.append('folder_name', values.folder_name || '');
                        formData.append('sub_folder_name_first', values.sub_folder_name_first || '');
                        formData.append('sub_folder_name_second', values.sub_folder_name_second || '');
                        for (let i = 0; i < values.files.length; i++) {
                          formData.append('files', values.files[i]);
                        }
                        const response=await apiGetCrmFileManagerCreateTemplateFolder(formData)
                        const responseData=await response.json()
                        console.log(responseData);
                        
                        if(responseData.code===200){
                          toast.push(
                            <Notification closable type="success" duration={2000}>
                                Files uploaded successfully
                            </Notification>,{placement:'top-center'}
                        )
                        window.location.reload()
                      }
                    else{
                      toast.push(
                        <Notification closable type="danger" duration={2000}>
                            {responseData.errorMessage}
                        </Notification>,{placement:'top-center'}
                    )
                    }}
                    }}
                    >
                      <Form className='mt-4'>
                        <FormItem label=''>
                          <Field name='files'>
                            {({ field, form }: any) => (
                              <Upload
                                onChange={(files: File[], fileList: File[]) => {
                                  form.setFieldValue('files', files);
                                }}
                                multiple
                              />
                            )}
                          </Field>
                        </FormItem>
                        <Button variant='solid' type='submit'>Submit</Button>
                      </Form>
                    </Formik>
            </Dialog>
    </div>
  );
};

export default Index;
