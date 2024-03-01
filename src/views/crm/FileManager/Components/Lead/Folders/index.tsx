import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FileItem, fetchLeadData } from '../data';
import { Button, Checkbox, Segment } from '@/components/ui';
import { StickyFooter } from '@/components/shared';
import { GiFiles } from 'react-icons/gi';

const Index = () => {
  const [leadData, setLeadData] = useState<FileItem[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const leadId = queryParams.get('lead_id');
  const folderName = queryParams.get('folder_name');
  const navigate=useNavigate()

  useEffect(() => {
    const fetchDataAndLog = async () => {
      try {
        const leadData = await fetchLeadData(leadId);
        const folderData = leadData[0].files;
        const selectedFolder = folderData.find((folder) => folder.folder_name === folderName);

        if (selectedFolder) {
          setLeadData(selectedFolder.files);
        }
      } catch (error) {
        console.error('Error fetching lead data', error);
      }
    };

    fetchDataAndLog();
  }, [leadId, folderName]);

  const handleFileSelect = (fileId: string) => {
    const updatedSelectedFiles = selectedFiles.includes(fileId)
      ? selectedFiles.filter((id) => id !== fileId)
      : [...selectedFiles, fileId];
    setSelectedFiles(updatedSelectedFiles);

  };

  const handleShareFiles = async () => {
    // Check if there are selected files before attempting to share
    if (selectedFiles.length === 0) {
      console.warn('No files selected for sharing.');
      return;
    }
  
    // Implement your POST API call here with the selectedFiles data
    const postData = {
      file_id: selectedFiles,
      lead_id: leadId,
      project_id: '',
      email: ['amaurya@initializ.io', 'dgupta@initializ.io'],
      subject: 'Testing',
      body: 'Testing 123',
    };
  
    try {
      const response = await fetch('https://col-u3yp.onrender.com/v1/api/admin/share/file', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers if needed
        },
        body: JSON.stringify(postData),
      });
  
      if (!response.ok) {
        console.error('Error sharing files:', response.statusText);
        // Handle error, show error message, etc.
        return;
      }
  
      // Assuming the API response contains success information
      const responseData = await response.json();
  
      // Show success toast or handle success in your application
      console.log('Files shared successfully:', responseData);
  
      // Clear selected files after sharing
      setSelectedFiles([]);
  
      // Reset active state of segment items
      const updatedLeadData = leadData.map((file) => ({ ...file, active: false }));
      setLeadData(updatedLeadData);
    } catch (error) {
      console.error('Error sharing files:', error);
      // Handle error, show error message, etc.
    }
  };
  

  return (
    <div>
      <h3 className='mb-5'>Files</h3>
      <Segment selectionType="multiple" className='grid grid-cols-4 gap-4'>
        {leadData.map((file) => {
          if (!file || typeof file.fileName !== 'string') {
            return null; // Skip rendering if the file or fileName is undefined or not a string
          }
  
          const fileExtension = file.fileName.split('.').pop().toLowerCase();
  
          return (
            <a href={file.fileUrl} target='_blank' rel='noreferrer' key={file.fileId}>
              <Segment.Item
                key={file.fileId}
                value={file.fileId}
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
                    // Render a file icon based on file type (you can replace this with your file icon)
                    <span  ><GiFiles className=' text-8xl'/></span>
                  )}
                  <p className=' text-left'>{file.fileName}</p>
                </div>
              </Segment.Item>
            </a>
          );
        })}
      </Segment>
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
      {/* Toast container */}
    </div>
  );
};

export default Index;
