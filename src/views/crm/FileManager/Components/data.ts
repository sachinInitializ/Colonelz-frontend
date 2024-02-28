import { ApiResponse, LeadDataItem, ProjectDataItem } from "./type";

let cachedData: ApiResponse | null = null;

export const fetchData = async (): Promise<ApiResponse> => {
  try {
    if (cachedData) {
      // If data is already cached, return it
      return cachedData;
    }

    const response = await fetch('https://col-u3yp.onrender.com/v1/api/admin/getfile/');
    const data: ApiResponse = await response.json();
    
    // Cache the data for future calls
    cachedData = data;

    return data;
  } catch (error) {
    console.error('Error fetching data', error);
    throw error;
  }
};

// Exporting leadData and projectData
export const getLeadData = async (): Promise<LeadDataItem[]> => {
  const data = await fetchData();
  return data.data.leadData;
};

export const getProjectData = async (): Promise<ProjectDataItem[]> => {
  const data = await fetchData();
  return data.data.projectData;
};
