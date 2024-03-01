import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FileItem, fetchLeadData } from '../data';
import { Button, Segment } from '@/components/ui';
import { HiCheckCircle } from 'react-icons/hi';
import classNames from 'classnames';

const Index = () => {
  const [leadData, setLeadData] = useState<FileItem[]>([]);
  const [active,setactive]=useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const leadId = queryParams.get('lead_id');
  const folderName = queryParams.get('folder_name');

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
    setactive(true)
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
      <Segment selectionType="multiple" className='grid grid-cols-3 gap-4'>
        {leadData.map((file) => (
          <Segment.Item
            key={file.fileId}
            value={file.fileId}
          >
            {({ active, value, onSegmentItemClick, disabled }) => {
              return (
                <div
                  className={classNames(
                    'flex',
                    'ring-1',
                    'justify-between',
                    'border',
                    'rounded-md ',
                    'border-gray-300',
                    'py-5 px-4',
                    'cursor-pointer',
                    'select-none',
                    'w-100',
                    'md:w-[260px]',
                    active
                      ? 'ring-cyan-500 border-cyan-500'
                      : 'ring-transparent',
                    disabled
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:ring-cyan-500 hover:border-cyan-500'
                  )}
                  onClick={() => {
                    handleFileSelect(file.fileId);
                    onSegmentItemClick();
                  }}
                >
                  <div>
                    <h6>{file.fileName}</h6>
                    <p>hello</p>
                  </div>
                  {active && (
                    <HiCheckCircle className="text-cyan-500 text-xl" />
                  )}
                </div>
              );
            }}
          </Segment.Item>
        ))}
      </Segment>
      <Button onClick={handleShareFiles}>Share Selected Files</Button>

      {/* Toast container */}
      
    </div>
  );
};

export default Index;
