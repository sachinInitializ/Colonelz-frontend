export type Attendees = {
    client_name: string[] | null;
    organisor: string[];
    architect: string[];
    consultant_name: string[];
  };
  
  export type MomData = {
    mom_id: string;
    meetingdate: string;
    source: string;
    attendees: Attendees;
    remark: string;
    imaportant_note: string;
    files: any[]; // Add a proper type for files if needed
  };
  
  export type ApiResponse = {
    message: string;
    status: boolean;
    errorMessage: string;
    code: number;
    data: MomData[];
    subrow:ApiResponse[]
  };
  const response1 = await fetch('https://col-u3yp.onrender.com/v1/api/admin/getall/mom/?project_id=COLP-266329');
const jsonData1= await response1.json();

export const ordersData =jsonData1.data
  export const momApiResponse: ApiResponse  =jsonData1.data