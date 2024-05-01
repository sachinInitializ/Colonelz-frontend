// src/services/api.ts
import axios from 'axios';

interface UserData {
  _id: string;
  name: string;
  lead_id: string;
  email: string;
  phone: string;
  location: string;
  status: string;
  source: string;
  // Add other properties as needed
}

const apiBaseUrl = 'https://colonelz.test.psi.initz.run/v1/api/admin'; // Replace 'YOUR_API_BASE_URL' with the actual base URL of your API

// export const fetchData = async (): Promise<UserData[]> => {
//   try {
//     const response = await axios.get<UserData[]>(`${apiBaseUrl}/getsingle/lead/`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw error;
//   }
// }

export const fetchDetails = async (id: string): Promise<UserData> => {
  try {
    // Assuming your API expects the ID as a query parameter
    const response = await axios.get<UserData>(`${apiBaseUrl}getsingle/lead/?lead_id=${id}`);
    
    // Alternatively, if your API expects the ID in the request body, you can use the following:
    // const response = await axios.post<UserData>(`${apiBaseUrl}/users/details`, { id });

    return response.data;
  } catch (error) {
    console.error(`Error fetching details for user ${id}:`, error);
    throw error;
  }
}
