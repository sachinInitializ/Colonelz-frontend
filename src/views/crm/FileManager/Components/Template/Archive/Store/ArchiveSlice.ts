type File = {
    fileUrl: string;
    fileName: string;
    fileId: string;
    fileSize: string;
    date: string;
    folder_name?: string;
    updated_date?: string;
    sub_folder_name_first?: string;
    sub_folder_name_second?: string;
    folder_id?: string;
  };
  
export  type DataItem = {
    lead_id: string;
    project_id: string;
    folder_name: string;
    files: File[] 
    type: string;
    created_at: string;
  };
  
export type Response = {
    message: string;
    status: boolean;
    errorMessage: string;
    code: number;
    data: DataItem[];
  };