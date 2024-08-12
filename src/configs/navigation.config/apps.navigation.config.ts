import { APP_PREFIX_PATH } from '@/constants/route.constant'
import {
    NAV_ITEM_TYPE_ITEM,
} from '@/constants/navigation.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { NavigationTree, RoleAccessData } from '@/@types/navigation'
import { fetchRoleAccessData } from '@/views/crm/Roles/roleData';


  async function getRoleAccessData(): Promise<RoleAccessData> {
    try {
        const roleAccessData = await fetchRoleAccessData();
        return roleAccessData;
    } catch (error) {
        console.error("Error fetching role access data:", error);
        throw error;
    }
}

const data: RoleAccessData = await getRoleAccessData();




const appsNavigationConfig: NavigationTree[] = [
 
                    {
                        key: 'appsCrm.dashboard',
                        path: `${APP_PREFIX_PATH}/crm/dashboard`,
                        title: 'Dashboard',
                        translateKey: 'nav.appsCrm.dashboard',
                        icon: 'dashboard',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: ["ADMIN","Senior Architect","3D Visualizer","Jr. Interior Designer","Project Architect","Executive Assistant"],
                   subMenu: [],     
                    },
                    {
                        key: 'appsCrm.fileManager',
                        path: `${APP_PREFIX_PATH}/crm/fileManager`,
                        title: 'File Manager',
                        translateKey: 'nav.appsCrm.fileManager',
                        icon: 'files',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: data?.data?.file?.read?? [],
subMenu: [],
                    },
                    {
                        key: 'appsSales.productList',
                        path: `${APP_PREFIX_PATH}/leads`,
                        title: 'Lead Manager',
                        translateKey: 'nav.appsSales.productList',
                        icon: 'lead',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: data?.data?.lead?.read?? [],
                   subMenu: [],     
                    },
                                     
              
                
                    {
                        key: 'appsCrm.mom',
                        path: `${APP_PREFIX_PATH}/crm/MOM`,
                        title: 'MOM',
                        translateKey: '',
                        icon: 'mom',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: data?.data?.mom?.read?? [],
                   subMenu: [],     
                    },
                    {
                        key: 'appsCrm.project',
                        path: `${APP_PREFIX_PATH}/crm/projectslist`,
                        title: 'Project Manager',
                        translateKey: '',
                        icon: 'projects',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: data?.data?.project?.read?? [],
                   subMenu: [],     
                    },
                    
                    
               
]

export default appsNavigationConfig
