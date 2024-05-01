import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FileItem, fetchLeadData } from '../data';
import { Button, Checkbox, Dialog, Dropdown, FormItem, Input, Notification, Segment, Select, toast } from '@/components/ui';
import { StickyFooter } from '@/components/shared';
import CreatableSelect from 'react-select/creatable';
import { CiFileOn, CiImageOn } from 'react-icons/ci';
import LeadDataContext from '../LeadDataContext';
import { apiDeleteFileManagerFiles, apiGetCrmFileManagerLeads, apiGetCrmFileManagerShareContractFile, apiGetCrmFileManagerShareFiles } from '@/services/CrmService';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { apiGetUsers } from '@/services/CommonService';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { HiShare, HiTrash } from 'react-icons/hi';
interface User {
  username: string;
  role:string
}
const Index = () => {
  const [leadData, setLeadData] = useState<FileItem[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const leadId = queryParams.get('lead_id');
  const folderName = queryParams.get('folder_name');
   const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchDataAndLog = async () => {
      try {
        const usersData = await apiGetUsers();
        setUsers(usersData?.data);
      } catch (error) {
        console.error('Error fetching users', error);
      }
    };

    fetchDataAndLog();
  }, []);
  const adminUsers = users.filter(user => user.role === 'ADMIN');
  
  const navigate=useNavigate()
  

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBody(e.target.value);
  };

  const [dialogIsOpen, setIsOpen] = useState(false)

  const openDialog = (fileId:string) => {
      setIsOpen(true)
      setSelectedFiles([fileId])
      console.log(fileId);
      
  }

  const onDialogClose = () => {
      
      setIsOpen(false)
  }
  const [dialogIsOpen1, setIsOpen1] = useState(false)

  const openDialog1 = () => {
      setIsOpen1(true)
  }

  const onDialogClose1 = () => {
      
      setIsOpen1(false)
  }

  
  useEffect(() => {
    const fetchDataAndLog = async () => {
      try {
        const leadData = await apiGetCrmFileManagerLeads(leadId);
        const folderData = leadData?.data
        console.log(folderData);
        
        const selectedFolder = folderData.find((folder:any) => folder.folder_name === folderName);

        if (selectedFolder) {
          setLeadData(selectedFolder.files);
          console.log(selectedFolder.files);
          
        }
      } catch (error) {
        console.error('Error fetching lead data', error);
      }
    };

    fetchDataAndLog();
  }, [leadId, folderName]);

console.log(leadData);

  

  // const handleFileSelect = (fileId: string) => {
  //   let updatedSelectedFiles;
  //   if (folderName === 'contract') {
  //     updatedSelectedFiles = [fileId];
  //   } else {
  //     updatedSelectedFiles = selectedFiles.includes(fileId)
  //       ? selectedFiles.filter((id) => id !== fileId)
  //       : [...selectedFiles, fileId];
  //   }
  //   setSelectedFiles(updatedSelectedFiles);
  // };
  const deleteFiles = async (fileId:string) => {
    selectedFiles.push(fileId)
    function warn(text:string) {
      toast.push(
          <Notification closable type="warning" duration={2000}>
              {text}
          </Notification>,{placement:'top-center'}
      )
  }
    if (fileId.length === 0) {
      warn('No files selected for deletion.')
      return;
    }
    
    const postData = {
      file_id: selectedFiles,
      folder_name: folderName,
      lead_id: leadId,
    };
    try {
      await apiDeleteFileManagerFiles(postData);
      toast.push(
        <Notification closable type="success" duration={2000}>
          Files deleted successfully
        </Notification>,{placement:'top-center'}
      )
      window.location.reload()
    } catch (error) {
      toast.push(
        <Notification closable type="danger" duration={2000}>
          Error deleting files
        </Notification>,{placement:'top-center'}
      )
    }
    
  }


  const handleShareFiles = async () => {

    if (selectedFiles.length === 0 || selectedEmails.length === 0) {
      warn('No files or email addresses selected for sharing.')
      return;
    }
  
    const postData = {
      file_id: selectedFiles,
      lead_id: leadId,
      project_id: '',
      email:  selectedEmails,
      subject: subject,
      body: body,
    };

    function closeAfter2000ms(text:string) {
      toast.push(
          <Notification closable type="success" duration={2000}>
              {text}
          </Notification>,{placement:'top-center'}
      )
  }
  function warn(text:string) {
    toast.push(
        <Notification closable type="warning" duration={2000}>
            {text}
        </Notification>,{placement:'top-center'}
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
      closeAfter2000ms('Successfully Shared')
      
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


function formatDate(dateString:string) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

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
      <h3 className='mb-5'>Files</h3>
      <div>
  
      </div>
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
        <Link to={`/app/crm/fileManager/leads?lead_id=${leadId}`} className="text-blue-600 dark:text-blue-400 hover:underline">Leads</Link>
      </li>
      <li>
        <span className="mx-2">/</span>
      </li>
    
      <li className="text-gray-500">{folderName}</li>
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
          {leadData.map((item) => (
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                <div className="flex items-center gap-2">
                {getFileIcon(item.fileName)}
                  <a className="font-medium cursor-pointer" href={item.fileUrl} target='_blank'>
                    {item.fileName}
                  </a>
                </div>
              </td>
              <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
              {getFileType(item.fileName)}
            </td>
              <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{formatFileSize(item.fileSize)}</td>
              <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{formatDate(item.date)}</td>
              <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-center">
                <div className=' flex justify-center gap-3'> 

                  <HiTrash className='text-xl cursor-pointer' onClick={()=>deleteFiles(item.fileId)} />
                  <HiShare className='text-xl cursor-pointer'  onClick={() => openDialog(item.fileId)}/>  
                  </div>

              </td>
            </tr>))}
          
          </tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
         ) : (
          <p className='h-[65vh]'>No files</p>
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
          {
            folderName==='contract' &&(
              <Button variant='solid' size='sm'  onClick={() => openDialog1()}>
                Share For Approval
              </Button>
            )
          }
          
        </div>
      </StickyFooter>
      <Dialog
                isOpen={dialogIsOpen1}
                style={{}}
                className='max-h-[300px]'
                onClose={onDialogClose1} 
                onRequestClose={onDialogClose1}
            >
 <Formik
  initialValues={{
    lead_id: leadId,
    folder_name: folderName,
    file_id:"" ,
    user_name: '',
    type: "Internal",
  }}
  validationSchema={Yup.object({
    lead_id: Yup.string().required('Required'),
    folder_name: Yup.string().required('Required'),
    file_id: Yup.string().required('Required'),
    user_name: Yup.string().required('Required'),
    type: Yup.string().required('Required'),
  })}
  onSubmit={async(values, { setSubmitting }) => {
    const response = await apiGetCrmFileManagerShareContractFile(values)
    const responseData = await response.json()
    if(responseData.code===200){
      toast.push(
        <Notification closable type="success" duration={2000}>
          Shared for approval successfully
        </Notification>,{placement:'top-center'}
      )
    }
    else{
      toast.push(
        <Notification closable type="danger" duration={2000}>
          {responseData.errorMessage}
        </Notification>,{placement:'top-center'}
      )
    }
  }}
>
  {({ handleChange, handleBlur, values }) => (
    <Form>
      <h3 className='mb-5'>Share For Approval</h3>
      <FormItem label='Username' className=''>
      <Select
  options={adminUsers.map(user => ({ value: user.username, label: user.username })) as any}
  onChange={(option: any) => handleChange('user_name')(option ? option.value : '')}
  value={adminUsers.find(user => user.username === values.user_name) ? { value: values.user_name, label: values.user_name } : null}
/>

<FormItem label='File' className='mt-4'>
  <Select
    options={leadData.map(file => ({ value: file.fileId, label: file.fileName })) as any}
    onChange={(option: any) => handleChange('file_id')(option ? option.value : '')}
    value={leadData.find(file => file.fileId === values.file_id) ? { value: values.file_id, label: values.file_id } : null}
  />
</FormItem>
        
      
      </FormItem>

      <Button type="submit" variant='solid'>Share</Button>
    </Form>
  )}
</Formik>
            </Dialog>
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
          required
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
          required
           textArea
            className='mt-1 p-2 w-full border rounded-md'
            value={body}
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
    </div>
  );
};

export default Index;
