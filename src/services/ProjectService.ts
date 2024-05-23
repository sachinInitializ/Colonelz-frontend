import appConfig from '@/configs/app.config';
import ApiService from './ApiService'


const { apiPrefix } = appConfig
const token = localStorage.getItem('auth'); 
const userId = localStorage.getItem('userId');



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

export async function apiGetCrmProjectMakeContract(formData: any) {
    const response = await fetch(`${apiPrefix}admin/view/contract`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
        
    });

    return response;
}
export async function apiGetCrmSingleProjectQuotation(projectId:string ) {
    const response = await fetch(`${apiPrefix}admin/get/quotationdata/?project_id=${projectId}`, {
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
export async function apiGetCrmProjectShareQuotation(formData: any) {
    const response = await fetch(`${apiPrefix}admin/share/quotation`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
        
    });

    return response;
}
export async function apiGetCrmProjectShareContractApproval(formData: any) {
    const response = await fetch(`${apiPrefix}admin/contract/approval`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
        
    });

    return response;
}







export async function apiGetProjectList<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/project/list',
        method: 'post',
        data,
    })
}

export async function apiPutProjectList<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/project/list/add',
        method: 'put',
        data,
    })
}

export async function apiGetScrumBoards<T>() {
    return ApiService.fetchData<T>({
        url: '/project/scrum-board/boards',
        method: 'post',
    })
}

export async function apiGetScrumBoardtMembers<T>() {
    return ApiService.fetchData<T>({
        url: '/project/scrum-board/members',
        method: 'post',
    })
}

export async function apiGetScrumBoardtTicketDetail<T>() {
    return ApiService.fetchData<T>({
        url: '/project/scrum-board/tickets/detail',
        method: 'get',
    })
}
