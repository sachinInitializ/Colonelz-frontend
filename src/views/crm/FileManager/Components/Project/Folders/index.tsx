import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FileItem, fetchProjectData } from '../data';
import { Button, Checkbox, Dialog, Input, Notification, Segment, Select, toast } from '@/components/ui';
import { StickyFooter } from '@/components/shared';
import CreatableSelect from 'react-select/creatable';
import { CiFileOn, CiImageOn } from 'react-icons/ci';
import { apiDeleteFileManagerFiles, apiGetCrmFileManagerShareFiles, apiGetCrmProjectShareQuotation } from '@/services/CrmService';
import { apiGetUsers } from '@/services/CommonService';
import { HiShare, HiTrash } from 'react-icons/hi';
import { FolderItem } from '../../type';
import { format, parseISO } from 'date-fns';

const Index = () => {
  const [leadData, setLeadData] = useState<FileItem[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState("Internal");
  const [selectedUsername, setSelectedUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [clientNameError, setClientNameError] = useState("");
  const [clientEmailError, setClientEmailError] = useState("");
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const leadId = queryParams.get('project_id');
  const folderName = queryParams.get('folder_name'); // Assuming folder_name is in the query params
  const navigate=useNavigate()
  const [usernames, setUsernames] = useState<string[]>([]);
  const [selectedFileId, setSelectedFileId] = React.useState<string | null>(null);

  interface User {
    role: string;
    username: string;
  }

  useEffect(() => {
    const response=async()=>{
      const data = await apiGetUsers();
     const userdata=data.data
     console.log(userdata);
     
     const usernames = userdata
     .filter((user:User) => user.role === 'Executive Assistant')
     .map((user:User) => user.username);
      if (usernames) {
        console.log(usernames);
        
        setUsernames(usernames);
      }
    }
    response()
  }, [])

  
  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBody(e.target.value);
  };

  const [dialogIsOpen, setIsOpen] = useState(false)
  const [dialogIsOpen1, setIsOpen1] = useState(false)

  const openDialog = (fileId:string) => {
    setIsOpen(true)
    setSelectedFiles([fileId])
    console.log(fileId);
    
}

  const onDialogClose = () => {
    setIsOpen(false)
}
  const openDialog1 = () => {
      setIsOpen1(true)
  }
  const onDialogClose1 = () => {
      setIsOpen1(false)
  }

  

  useEffect(() => {
    const fetchDataAndLog = async () => {
      try {
        const leadData = await fetchProjectData(leadId);
        console.log(leadData);
        
        const folderData = leadData
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

  const handleFileSelect = (fileId:any) => {
    if (folderName?.toUpperCase() === "QUOTATION" || folderName?.toUpperCase() === "CONTRACT"){
      setSelectedFiles([fileId]);
    } else {
      if (selectedFiles.includes(fileId)) {
        setSelectedFiles(selectedFiles.filter((id) => id !== fileId));
      } else {
        setSelectedFiles([...selectedFiles, fileId]);
      }
    }
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
      folder_name: folderName,
      project_id: leadId,
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

  const handleFileChange = (selectedFileId:string) => {
    setSelectedFileId(selectedFileId);
  };

 const handleShareFileForApproval = async () => {
    if(selectedFileId===null){
      toast.push(
        <Notification closable type="warning" duration={2000}>
          Please select a file to share
        </Notification>,{placement:'top-center'}
      )
      return;
    }
  

    const postData = {
      user_name:  selectedUsername,
      type: 'Internal',
      file_id: selectedFileId, 
      folder_name: 'quotation',
      project_id: leadId,
    };
    
      const response=await apiGetCrmProjectShareQuotation(postData);
      const responseJson=await response.json()
      if (responseJson.code===200) {
        toast.push(
          <Notification closable type="success" duration={2000}>
            File shared successfully
          </Notification>,{placement:'top-center'}
        )
        setIsOpen1(false)
      }
      else{
        toast.push(
          <Notification closable type="danger" duration={2000}>
            {responseJson.errorMessage}
          </Notification>,{placement:'top-center'}
        )
      }
 }
  const handleShareFiles = async () => {

    if (selectedFiles.length === 0 || selectedEmails.length === 0) {
        warn('No files or email addresses selected for sharing.')
        return
    }
  
    const postData = {
      file_id: selectedFiles,
      lead_id: '',
      project_id: leadId,
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
  
      const responseData = await response.json();
      if (!response.ok) {
        console.error('Error sharing files:', responseData.errorMessage);
        return;
      }
  
  
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
        <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">FileManager</a>
      </li>
      <li>
        <span className="mx-2">/</span>
      </li>
      <li>
        <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Projects</a>
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
              <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{format(parseISO(item.date), 'dd-MM-yyyy')}</td>
              <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-center">
                <div className=' flex justify-center gap-3'> 

                  <HiTrash className='text-xl cursor-pointer hover:text-red-500' onClick={()=>deleteFiles(item.fileId)} />
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
          {folderName?.toUpperCase() === "QUOTATION" || folderName?.toUpperCase() === "CONTRACT" ? (
          <Button
            size="sm"
            className="ltr:mr-3 rtl:ml-3"
            type="button"
            variant='solid'
            onClick={()=>openDialog1()}
          >
            Share for Approval
          </Button>):null}
          
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
      <Dialog
                isOpen={dialogIsOpen1}
                style={{}}
                className='max-h-[300px]'
                onClose={onDialogClose1} 
                onRequestClose={onDialogClose1}

            >
              <h3 className='mb-5'>Share Files For Approval</h3>
               <div className=' '>
              
  
              <CreatableSelect
               options={usernames.map((username) => ({ label: username, value: username }))}
               value={selectedUsername ? { label: selectedUsername, value: selectedUsername } : null}
               placeholder="Add a username..."
               onChange={(newValue) => {
                const username = newValue ? newValue.value : '';
                setSelectedUsername(username);
                if (selectedType === 'Internal' && username === '') {
                  setUsernameError('Username is mandatory for internal type');
                } else {
                  setUsernameError('');
                }
              }}
               onCreateOption={(inputValue) => {
                 const newUsernames= [...usernames, inputValue];
                 setUsernames(newUsernames);
                 setSelectedUsername(inputValue);
               }}
                  />
                  {usernameError && <div className=" text-red-600">{usernameError}</div>}
  {clientEmailError && <div className=" text-red-600">{clientEmailError}</div>}

  <Select className='mt-4'
  options={leadData.map(file => ({ value: file.fileId, label: file.fileName }))}
  onChange={(option: any) => handleFileChange(option ? option.value : '')}
  value={leadData.find(file => file.fileId === selectedFileId) ? { value: selectedFileId, label: selectedFileId } : null}
/>
                  </div>
              
         <div className='flex justify-end'>
         <Button size="sm" variant="solid" type="submit" className='mt-5 ' onClick={handleShareFileForApproval} >
            Share
          </Button>
          </div>
            </Dialog>
    </div>
  );
};

export default Index;
