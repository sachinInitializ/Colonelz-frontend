import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FileItem, fetchProjectData } from '../data';
import { Button, Checkbox, Dialog, Input, Notification, Segment, Select, toast } from '@/components/ui';
import { StickyFooter } from '@/components/shared';
import CreatableSelect from 'react-select/creatable';
import { CiFileOn } from 'react-icons/ci';
import { apiDeleteFileManagerFiles, apiGetCrmFileManagerShareFiles, apiGetCrmProjectShareQuotation } from '@/services/CrmService';
import { apiGetUsers } from '@/services/CommonService';

const Index = () => {
  const [leadData, setLeadData] = useState<FileItem[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState("Internal");
  const [selectedUsername, setSelectedUsername] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
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
  const [usernames, setUsernames] = useState([]);

  useEffect(() => {
    const response=async()=>{
      const data = await apiGetUsers();
     const userdata=data.data
     const usernames = userdata
     .filter(user => user.role === 'PROCUREMENT')
     .map(user => user.username);
      if (usernames) {
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

  const openDialog = () => {
      setIsOpen(true)
  }
  const openDialog1 = () => {
      setIsOpen1(true)
  }
  const onDialogClose1 = () => {
      setIsOpen1(false)
  }

  const onDialogClose = () => {
      setIsOpen(false)
  }

  useEffect(() => {
    const fetchDataAndLog = async () => {
      try {
        const leadData = await fetchProjectData(leadId);
        const folderdata=leadData[0].files
        // Assuming leadData is an array and contains the necessary data structure
        const selectedFolder = folderdata.find((folder) => folder.folder_name === folderName);

        if (selectedFolder) {
          setLeadData(selectedFolder.files);
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
  const deleteFiles = async () => {
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

  const options = [
    { value: 'Internal', label: 'Internal' },
    { value: 'Client', label: 'Client' }
  ];

 const handleShareFileForApproval = async () => {
    if(selectedFiles.length===0){
      toast.push(
        <Notification closable type="warning" duration={2000}>
          Please select a file to share
        </Notification>,{placement:'top-center'}
      )
      return;
    }
    if (selectedType === 'Client' && (clientName === '' || clientEmail === '')) {
      setClientNameError('Client Name is mandatory for Client');
      setClientEmailError('Client Email is mandatory for Client');
      return;
    }

    const postData = {
      user_name:  selectedUsername,
      type: selectedType,
      file_id: selectedFiles[0], 
      folder_name: 'quotation',
      project_id: leadId,
      client_name: clientName,
      client_email: clientEmail, 
    };
    try{
      const response=await apiGetCrmProjectShareQuotation(postData);
      const responseJson=await response.json()
      if (response.ok) {
        toast.push(
          <Notification closable type="success" duration={2000}>
            File shared successfully
          </Notification>,{placement:'top-center'}
        )
        setIsOpen1(false)
      }
    }
    catch(error){
      console.error('Error sharing files:', error);
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



  return (
    <div>
        <div className='flex justify-between'>
      <h3 className='mb-5'>Files</h3>
      <div>
        <Button variant='solid' color='red-600' className='mr-3' onClick={()=>deleteFiles()}>Delete</Button>
      <Button
       variant='solid'
       onClick={() => openDialog()}
      >Share</Button>
      </div>
      </div>
      {leadData && leadData.length > 0 ? (
        <div className='grid grid-cols-2 xl:grid-cols-6 sm:grid-cols-4 gap-4'>
          {leadData.map((file) => {
          if (!file || typeof file.fileName !== 'string') {
            return null; 
          }
  
          const fileExtension = file.fileName.split('.').pop().toLowerCase();
  
          return (
            <a href={file.fileUrl} target='_blank' rel='noreferrer' key={file.fileId}>
              <div
                key={file.fileId}
                className='min-h-[200px] max-h-[250px] flex justify-between'
              >
                <Checkbox 
                  checked={selectedFiles.includes(file.fileId)}
                  onChange={() => handleFileSelect(file.fileId)}
                />
                <div className='flex items-center flex-col justify-center'>
                  {['png', 'jpg', 'jpeg', 'gif'].includes(fileExtension) ? (
                    <img src={file.fileUrl} alt={file.fileName} className='h-auto w-auto max-h-[140px]' />
                  ) : (
                    <span  ><CiFileOn className=' text-8xl'/></span>
                  )}
                  <p className=' capitalize text-wrap overflow-hidden overflow-ellipsis whitespace-nowrap' style={{overflowWrap:"anywhere"}}>
                  {file.fileName.length > 20 ? `${file.fileName.substring(0, 20)}...` : file.fileName}
                    </p>
                </div>
              </div>
            </a>
          );
        })}
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
          <textarea
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
      <Dialog
                isOpen={dialogIsOpen1}
                style={{}}
                className='max-h-[300px]'
                onClose={onDialogClose1} 
                onRequestClose={onDialogClose1}

            >
              <h3 className='mb-5'>Share Files For Approval</h3>
               <div className=' gap-3 grid'>
               <Select
    defaultValue={options[0]}
    size='sm'
    options={options}
    onChange={(selectedOption) => {
      setSelectedType(selectedOption.value);
      if (selectedOption.value === 'Internal' && selectedUsername === '') {
        setUsernameError('Username is mandatory for internal type');
      } else {
        setUsernameError('');
      }
    }}
  />
  
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

<Input
    type="text"
    placeholder="Client Name"
    value={clientName}
    onChange={(e) => {
      setClientName(e.target.value);
      if (selectedType === 'Client' && e.target.value === '') {
        setClientNameError('Client Name is mandatory for Client');
      } else {
        setClientNameError('');
      }
    }}
  />
 {clientNameError && <div className=" text-red-600">{clientNameError}</div>}
<Input
    type="email"
    placeholder="Client Email"
    value={clientEmail}
    onChange={(e) => {
      setClientEmail(e.target.value);
      if (selectedType === 'Client' && e.target.value === '') {
        setClientEmailError('Client Email is mandatory for Client');
      } else {
        setClientEmailError('');
      }
    }}
  />
    
 
  {clientEmailError && <div className=" text-red-600">{clientEmailError}</div>}
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
