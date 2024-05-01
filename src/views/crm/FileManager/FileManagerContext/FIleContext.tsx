import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiGetCrmFileManager } from "@/services/CrmService";
import { ApiResponse, LeadDataItem, ProjectDataItem, TemplateDataItem } from "../Components/type";

interface DataContextValue {
  leadData: LeadDataItem[];
  projectData: ProjectDataItem[];
  templateData: TemplateDataItem[];
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiGetCrmFileManager();
        setData(response);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  const value = {
    leadData: data?.data.leadData || [],
    projectData: data?.data.projectData || [],
    templateData: data?.data.templateData || [],
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = (): DataContextValue => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};