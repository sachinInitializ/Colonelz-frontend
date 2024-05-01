import { apiGetCrmProjects } from '@/services/CrmService';
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

const ProjectContext = createContext([]);

export const useProjectContext = () => useContext(ProjectContext);
export const ProjectProvider = ({ children }: { children: ReactNode }) => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await apiGetCrmProjects();
            const data = response.data.projects;
            console.log('Received response from server:', data);
            setProjects(data);
        };
        fetchData();
    }, []);

    return (
        <ProjectContext.Provider value={projects}>
            {children}
        </ProjectContext.Provider>
    );
};


