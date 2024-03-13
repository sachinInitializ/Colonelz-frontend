import { apiGetCrmFileManagerProjects } from "@/services/CrmService";


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

export interface ProjectDataItem {
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
  data: ProjectDataItem[];
}

  

  export const fetchProjectData = async (projectId: string  ): Promise<ProjectDataItem[]> => {
    try {
      const response = await apiGetCrmFileManagerProjects(projectId);
      const data=response
      return data.data;
    } catch (error) {
      console.error('Error fetching lead data', error);
      throw error;
    }
  };
