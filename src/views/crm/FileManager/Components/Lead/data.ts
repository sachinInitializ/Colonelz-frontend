import { apiGetCrmFileManagerLeads } from "@/services/CrmService";

export interface FileItem {
    fileUrl: string;
    fileId: string;
    fileName:string
  }
  
  export interface FolderItem {
    folder_name: string;
    files: FileItem[];
  }
  export interface Data {
    data:FolderItem[]
  }
  
  export interface LeadDataItem {
    _id: string;
    lead_id: string;
    lead_name: string;
    files: FolderItem[];
    createdAt: string;
    __v: number;
    project_id: string;
    project_name: string;
  }
  
  export interface ApiResponse {
    message: string;
    status: boolean;
    errorMessage: string;
    code: number;
    data: LeadDataItem[];
  }
  

  export const fetchLeadData = async (leadId: string ): Promise<LeadDataItem[]> => {
    try {
      const response = await apiGetCrmFileManagerLeads(leadId);
      const data: ApiResponse = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching lead data', error);
      throw error;
    }
  };
