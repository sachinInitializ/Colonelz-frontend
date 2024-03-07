export type FileItem = {
    fileUrl: string;
    fileId: string;
    fileName:string;
    date:string
  };
  
  export type FolderItem = {
    folder_name: string;
    files: FileItem[];
  };
  export type FoldersItem = {
    folder_name: string;
    folder_id:string;
    sub_folder_name_first:string
    sub_folder_name_second:string
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
  export type TemplateDataItem={
    type:string
    files:FoldersItem[]
  }
  
  export type ApiResponseData = {
    leadData: LeadDataItem[];
    projectData: ProjectDataItem[];
    templateData:TemplateDataItem[]
  };
  
  export type ApiResponse = {
    message: string;
    status: boolean;
    errorMessage: string;
    code: number;
    data: ApiResponseData;
  };
  