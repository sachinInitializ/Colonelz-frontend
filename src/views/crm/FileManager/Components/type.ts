// Define export types for each nested structure in the JSON

export type FileItem = {
    fileUrl: string;
    fileId: string;
  };
  
  export type FolderItem = {
    folder_name: string;
    files: FileItem[];
  };
  
  export type LeadDataItem = {
    lead_id: string;
    lead_Name: string;
    files: FolderItem[];
  };
  
  export type ProjectDataItem = {
    project_Name: string;
    project_id: string;
    files: FolderItem[];
  };
  
  export type ApiResponseData = {
    leadData: LeadDataItem[];
    projectData: ProjectDataItem[];
  };
  
  export type ApiResponse = {
    message: string;
    status: boolean;
    errorMessage: string;
    code: number;
    data: ApiResponseData;
  };
  