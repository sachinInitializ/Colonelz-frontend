import Cookies from 'js-cookie';
import ApiService from './ApiService'
import appConfig from '@/configs/app.config';

const { apiPrefix } = appConfig
const token = localStorage.getItem('auth'); 
const userId = localStorage.getItem('userId');
export async function apiGetNotification(userId: string | null) {
    const response = await fetch(`${apiPrefix}admin/get/notification?userId=${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        }
    });    
    return response.json();
}

export async function apiGetUserData(UserId:string | null) {
    const response = await fetch(`${apiPrefix}users/getdata?userId=${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        }
    });
    const data = await response.json();
    return data;
}
export async function apiGetRoleDetails() {
    const response = await fetch(`${apiPrefix}admin/get/role`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        }
    });
    const data = await response.json();
    return data;
}
export async function apiGetRoleWiseDetails() {
    const response = await fetch(`${apiPrefix}admin/rolewise/access?role=ADMIN`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        }
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
}



export async function apiEditRoles(Data: any,id:string |null) {
    const response = await fetch(`${apiPrefix}admin/update/role?id=${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(Data)
    });

    return response;}
export async function addProfilePhoto(Data: any) {
    const response = await fetch(`${apiPrefix}users/profileurl`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: Data
    });

    return response;}
export async function addcontractinfileManager(Data: any) {
    const response = await fetch(`${apiPrefix}admin/view/contract`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: Data
    });

    return response;}

export async function EditPassword(Data: any) {
    const response = await fetch(`${apiPrefix}users/change/password`, {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(Data)
    });

    return response;}
export async function apiGetUsers() {
    const response = await fetch(`${apiPrefix}admin/get/alluser?id=${localStorage.getItem('userId')}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
}

export async function apiDeleteUsers(userId: string) {
    const response=await fetch(`${apiPrefix}admin/delete/user?userId=${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId: userId })
    });
    return response;
}
    
export async function addMemberToProject(Data: any) {
    const response = await fetch(`${apiPrefix}admin/add/member`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(Data)
    });

    return response;}
export async function apiPutNotificationUpdate(notificationId: string,type:string) {
    const response = await fetch(`${apiPrefix}admin/update/notification`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ userId: userId,type: type, notification_id: notificationId })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
}

export async function apiGetNotificationList() {
    return ApiService.fetchData<
        {
            id: string
            target: string
            description: string
            date: string
            image: string
            type: number
            location: string
            locationLabel: string
            status: string
            readed: boolean
        }[]
    >({
        url: '/notification/list',
        method: 'get',
    })
}

export async function apiGetSearchResult<T>(data: { query: string }) {
    return ApiService.fetchData<T>({
        url: '/search/query',
        method: 'post',
        data,
    })
}


export async function apiGetCrmProjects() {
    const response = await fetch(`${apiPrefix}admin/getall/project/?id=${userId}`, {
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

export async function apiGetCrmLeads() {
    const response = await fetch(`${apiPrefix}admin/getall/lead/`, {
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
    return data;
}
