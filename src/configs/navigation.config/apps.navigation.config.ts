import { APP_PREFIX_PATH } from '@/constants/route.constant'
import {
    NAV_ITEM_TYPE_ITEM,
} from '@/constants/navigation.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { NavigationTree } from '@/@types/navigation'

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
                        authority: ["ADMIN","Senior Architect","3D Visualizer","Jr. Interior Designer","Project Architect","Jr. Executive HR & Marketing","Site Supervisor","Executive Assistant"],
                        subMenu: [],
                    },
                  

                    {
                                    key: 'appsCrm.project',
                                    path: `${APP_PREFIX_PATH}/crm/projectslist`,
                                    title: 'Project',
                                    translateKey: '',
                                    icon: 'projects',
                                    type: NAV_ITEM_TYPE_ITEM,
                                    authority: ["ADMIN","Senior Architect","3D Visualizer","Jr. Interior Designer",,"Project Architect","Executive Assistant"],
                                    subMenu: [],
                                },
                  
                  
                   
              
                
                    {
                        key: 'appsCrm.mom',
                        path: `${APP_PREFIX_PATH}/crm/MOM`,
                        title: 'MOM',
                        translateKey: '',
                        icon: 'mom',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: ["ADMIN","Senior Architect","3D Visualizer","Jr. Interior Designer","Project Architect"],
                        subMenu: [],
                    },
                    {
                        key: 'appsSales.productList',
                        path: `${APP_PREFIX_PATH}/leads`,
                        title: 'Lead Management',
                        translateKey: 'nav.appsSales.productList',
                        icon: 'lead',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: ["ADMIN","Senior Architect","Project Architect"],
                        subMenu: [],
                    },
                    
               
]

export default appsNavigationConfig
