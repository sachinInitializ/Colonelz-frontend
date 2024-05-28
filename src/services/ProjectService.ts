import appConfig from '@/configs/app.config';
import Cookies from 'js-cookie';

const { apiPrefix } = appConfig
const token = localStorage.getItem('auth');
const userId=localStorage.getItem('userId');
console.log('token:', token);



export async function apiGetCrmFileManager() {
    const response = await fetch(`${apiPrefix}admin/getfile/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        },
        
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Received response from server:', data);
    return data;
}
