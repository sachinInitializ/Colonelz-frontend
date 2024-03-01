import React, { useEffect, useState } from 'react'
import { FolderItem,fetchLeadData} from './data';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Card } from '@/components/ui';


const Index = () => {
    const [leadData, setLeadData] = useState<FolderItem[]>([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const leadId = queryParams.get('lead_id');
    useEffect(() => {
      const fetchDataAndLog = async () => {
        try {
          const leadData = await fetchLeadData(leadId);
          console.log(leadData);
          setLeadData(leadData[0].files);
        } catch (error) {
          console.error('Error fetching lead data', error);
        }
      };
  
      fetchDataAndLog();
    }, []);
    const navigate=useNavigate()
  return (
    <div>
      <div className=' mb-5 flex justify-between'>
    <h3 className=''>Folder</h3>
    <Button variant='solid' size='sm' onClick={()=>navigate("/app/crm/fileManager/leads/upload")}>Upload</Button>
    </div>
    <div className='grid grid-cols-4 gap-3'>
        {leadData.map((item)=>(
           <Card key={item.folder_name} className=' cursor-pointer' onClick={()=>navigate(`/app/crm/fileManager/leads/folder?lead_id=${leadId}&folder_name=${item.folder_name}`)}>
            <p>{item.folder_name}</p>
           </Card>
        ))}
    </div>
    </div>
  )
}

export default Index