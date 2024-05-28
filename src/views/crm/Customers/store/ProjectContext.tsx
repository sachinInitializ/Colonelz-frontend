import { apiGetCrmProjects } from '@/services/CryptoService';
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface ProjectContextType {
  projects: any[];
  apiData: any;
}

const ProjectContext = createContext<ProjectContextType>({ projects: [], apiData: {} });

export const useProjectContext = () => useContext(ProjectContext);
export const ProjectProvider = ({ children }: { children: ReactNode }) => {
    const [projects, setProjects] = useState([]);
    const [apiData, setApiData] = useState();
useEffect(() => {
    const fetchData = async () => {
        const response = await apiGetCrmProjects();
        const data = response.data.projects;
        console.log('Received response from server:', data);
        setProjects(data);
        setApiData(response.data);
    };
    fetchData();
}
, []);

    return (
        <ProjectContext.Provider value={{ projects, apiData }}>
            {children}
        </ProjectContext.Provider>
    );
};