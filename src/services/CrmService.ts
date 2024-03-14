import appConfig from '@/configs/app.config';
import ApiService from './ApiService'
import Cookies from 'js-cookie';

const { apiPrefix } = appConfig
const token = Cookies.get('auth')
const userId = Cookies.get('userId')
console.log('token',token);




export async function apiGetMomData() {
    const response = await fetch(`${apiPrefix}admin/getall/project/mom?id=65c32e19e0f36d8e1f30955c`, {
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
    console.log('Received response from server:', data);
    return data;
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
export async function apiGetCrmSingleProjects(projectId:string) {
    const response = await fetch(`${apiPrefix}admin/getsingle/project/?project_id=${projectId}&id=${userId}`, {
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
export async function apiGetCrmProjectsMom(projectId:string) {
    const response = await fetch(`${apiPrefix}admin/getall/mom/?project_id=${projectId}`, {
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
export async function apiGetCrmFileManagerProjects(projectId:string) {
    const response = await fetch(`${apiPrefix}admin/project/getfile/?project_id=${projectId}`, {
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
export async function apiGetCrmFileManagerLeads(leadId:string) {
    const response = await fetch(`${apiPrefix}admin/lead/getfile/?lead_id=${leadId}`, {
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
    console.log('Received response from server:', data);
    return data;
}
export async function apiGetCrmLeadsDetails(leadId:string | null) {
    const response = await fetch(`${apiPrefix}admin/getsingle/lead/?lead_id=${leadId}`, {
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

export async function apiGetCrmCreateLead(formData: any) {
    const response = await fetch(`${apiPrefix}admin/create/lead/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
        
    });

    return response;
}
export async function apiGetCrmCreateLeadToProject(formData: any) {
    const response = await fetch(`${apiPrefix}admin/create/lead/project`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
        
    });

    return response;
}
export async function apiGetCrmLeadsUpdates(formData: any) {
    const response = await fetch(`${apiPrefix}admin/update/lead/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
           'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
        
    });

    return response;
}

export async function apPutCrmCustomer<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/crm/customers',
        method: 'put',
        data,
    })
}

export async function apiGetCrmCustomerDetails<
    T,
    U extends Record<string, unknown>
>(params: U) {
    return ApiService.fetchData<T>({
        url: '/crm/customer-details',
        method: 'get',
        params,
    })
}

export async function apiDeleteCrmCustomer<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return ApiService.fetchData<T>({
        url: '/crm/customer/delete',
        method: 'delete',
        data,
    })
}

export async function apiGetCrmMails<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/crm/mails',
        method: 'get',
        params,
    })
}

export async function apiGetCrmMail<T, U extends Record<string, unknown>>(
    params: U
) {
    return ApiService.fetchData<T>({
        url: '/crm/mail',
        method: 'get',
        params,
    })
}
