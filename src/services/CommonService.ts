import Cookies from 'js-cookie';
import ApiService from './ApiService'
import appConfig from '@/configs/app.config';

const { apiPrefix } = appConfig
const userId = Cookies.get('userId')

const token = Cookies.get('auth')
export async function apiGetNotification() {
    const response = await fetch(`${apiPrefix}admin/get/notification`, {
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
