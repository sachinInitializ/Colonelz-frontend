import appConfig from '@/configs/app.config';
import ApiService from './ApiService'


const { apiPrefix } = appConfig
const token = localStorage.getItem('auth');
const userId=localStorage.getItem('userId');
export async function apiGetCryptoDashboardData<T>() {
    return ApiService.fetchData<T>({
        url: '/crypto/dashboard',
        method: 'get',
    })
}

export async function apiGetPortfolioData<T>() {
    return ApiService.fetchData<T>({
        url: '/crypto/portfolio',
        method: 'get',
    })
}

export async function apiGetWalletData<T>() {
    return ApiService.fetchData<T>({
        url: '/crypto/wallets',
        method: 'get',
    })
}

export async function apiGetTransctionHistoryData<
    T,
    U extends Record<string, unknown>
>(data: U) {
    return ApiService.fetchData<T>({
        url: '/crypto/wallets/history',
        method: 'post',
        data,
    })
}

export async function apiGetMarketData<T, U extends Record<string, unknown>>(
    data: U
) {
    return ApiService.fetchData<T>({
        url: '/crypto/market',
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
