import { apiGetCrmProjects } from '@/services/CryptoService';
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface ProjectContextType {
  projects: any[];
  apiData: any;
  loading:boolean;
}

const ProjectContext = createContext<ProjectContextType>({ projects: [], apiData: {},loading:true });

export const useProjectContext = () => useContext(ProjectContext);
export const ProjectProvider = ({ children }: { children: ReactNode }) => {
    const [projects, setProjects] = useState([]);
    const [apiData, setApiData] = useState();
    const [loading, setLoading] = useState(true);
useEffect(() => {
    const fetchData = async () => {
        const response = await apiGetCrmProjects();
        const data = response.data.projects;
        console.log('Received response from server:', data);
        setProjects(data);
        setLoading(false);
        setApiData(response.data);
    };
    fetchData();
}
, []);

    return (
        <ProjectContext.Provider value={{ projects, apiData,loading }}>
            {children}
        </ProjectContext.Provider>
    );
};