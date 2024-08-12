import { apiGetRoleWiseDetails } from '@/services/CommonService';
import React, { createContext, useContext, useState, useEffect } from 'react';

type RoleAccessPermissions = {
    read?: string[];
    create?: string[];
    update?: string[];
    delete?: string[];
    restore?: string[];
  };
  
  type ModuleNames = 
    | "user"
    | "lead"
    | "project"
    | "task"
    | "file"
    | "mom"
    | "archive"
    | "contract"
    | "quotation"
    | "addMember"
    | "role";
  
  type RoleAccessData = {
    message: string;
    status: boolean;
    errorMessage: string;
    code: number;
    data: {
      [key in ModuleNames]?: RoleAccessPermissions;
    };
  };

// Define the context's shape
interface RoleContextType {
    roleData: RoleAccessData;
    fetchRoleData: () => Promise<void>;
}

// Create the context
const RoleContext = createContext<RoleContextType >(undefined!);

// Provide the context
export const RoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [roleData, setRoleData] = useState<RoleAccessData >(undefined!);

    const fetchRoleData = async () => {
        try {
            const data = await apiGetRoleWiseDetails(); 
            if (data.status) {
                setRoleData(data);
            }
        } catch (error) {
            console.error('Failed to fetch role data:', error);
        }
    };

    useEffect(() => {
        fetchRoleData();
    }, []);

    return (
        <RoleContext.Provider value={{ roleData, fetchRoleData }}>
            {children}
        </RoleContext.Provider>
    );
};

export const useRoleContext = () => {
    const context = useContext(RoleContext);
    if (!context) {
        throw new Error('useRoleContext must be used within a RoleProvider');
    }
    return context;
};
