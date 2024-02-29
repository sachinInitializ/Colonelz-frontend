

export interface FileItem {
  fileUrl: string;
  fileId: string;
}

export interface FolderItem {
  folder_name: string;
  files: FileItem[];
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

  

  export const fetchProjectData = async (projectId: string | null): Promise<ProjectDataItem[]> => {
    try {
      const response = await fetch(`https://col-u3yp.onrender.com/v1/api/admin/project/getfile/?project_id=${projectId}`);
      const data: ApiResponse = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching lead data', error);
      throw error;
    }
  };
