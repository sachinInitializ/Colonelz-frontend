import { apiGetCrmProjectsMom } from '@/services/CrmService';
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';


const MomContext = createContext({ leadData: null, client: null });

export const useMomContext = () => useContext(MomContext);

export interface ApiResponse {
  message: string;
  status: boolean;
  errorMessage: string;
  code: number;
  data: Data;
}

interface Data {
  client_name: string;
  mom_data: MomData[];
}

interface MomData {
  mom_id: string;
  meetingdate: string;
  location: string;
  attendees: Attendees;
  remark: string;
  files: File[];
}

interface Attendees {
  client_name: string;
  organisor: string;
  designer: string;
  attendees: string;
}

interface File {
  fileUrl: string;
  fileName: string;
  fileId: string;
  fileSize: string;
  date: string;
}

export const MomProvider = ({ children }: { children: ReactNode }) => {
  const [leadData, setLeadData] = useState(null);
  const [client, setClient] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const projectId = searchParams.get('project_id');
    if (projectId) {
      const fetchData = async () => {
        try {
          const response = await apiGetCrmProjectsMom(projectId);
          const data = response;
          setLeadData(data.data.mom_data);
          setClient(data.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }
  }, [location.search]);

  return (
    <MomContext.Provider value={{ leadData, client }}>
      {children}
    </MomContext.Provider>
  );
};