import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FileItem, fetchProjectData } from '../data';
import { Card } from '@/components/ui';

const Index = () => {
  const [leadData, setLeadData] = useState<FileItem[]>([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const leadId = queryParams.get('project_id');
  const folderName = queryParams.get('folder_name'); // Assuming folder_name is in the query params

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
  

  return (
    <div>
      <h3 className=' mb-5'>Files</h3>
    <div className='grid grid-cols-5 gap-3'>
      {leadData.map((file) => (
        <a key={file.fileId} href={file.fileUrl} target='_blank' rel='noreferrer'>
        <Card  >
            File
        </Card>
        </a>
      ))}
    </div>
    </div>
  );
};

export default Index;
