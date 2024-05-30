import { lazy } from 'react'
import { APP_PREFIX_PATH } from '@/constants/route.constant'
import {  } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'

const appsRoute: Routes = [
    {
        key: 'appsCrm.dashboard',
        path: `${APP_PREFIX_PATH}/crm/dashboard`,
        component: lazy(() => import('@/views/crm/CrmDashboard')),
        authority: ["ADMIN","Senior Architect","3D Visualizer","Jr. Interior Designer","Project Architect","Executive Assistant"],
    },
    {
        key: 'appsCrm.register',
        path: `${APP_PREFIX_PATH}/crm/profile`,
        component: lazy(() => import('@/views/crm/Profile/index')),
        authority: ["ADMIN","Senior Architect","3D Visualizer","Jr. Interior Designer","Project Architect","Executive Assistant"],
    },
    {
        key: 'appsCrm.register',
        path: `${APP_PREFIX_PATH}/crm/register`,
        component: lazy(() => import('@/views/crm/Register')),
        authority: ["ADMIN"],
    },
    {
        key: 'appsCrm.addmember',
        path: `${APP_PREFIX_PATH}/crm/addmember`,
        component: lazy(() => import('@/views/crm/AddMemberToProject/index')),
        authority: ["ADMIN"],
    },
    {
        key: 'appsCrm.addmember',
        path: `${APP_PREFIX_PATH}/crm/addUserToLead`,
        component: lazy(() => import('@/views/crm/AddUserToLead/index')),
        authority: ["ADMIN"],
    },
    {
        key: 'appsCrm.addmember',
        path: `${APP_PREFIX_PATH}/crm/allusers`,
        component: lazy(() => import('@/views/crm/users/index')),
        authority: ["ADMIN"],
    },
    {
        key: 'appsCrm.fileManager',
        path: `${APP_PREFIX_PATH}/crm/fileManager`,
        component: lazy(() => import('@/views/crm/FileManager')),
        authority: ["ADMIN","Senior Architect","3D Visualizer","Jr. Interior Designer","Project Architect","Jr. Executive HR & Marketing"],
        meta: {
            header: 'File Manager',
            headerContainer: true,
        },
    },
    {
        key: 'appsCrm.fileManager',
        path: `${APP_PREFIX_PATH}/crm/fileManager/leads`,
        component: lazy(() => import('@/views/crm/FileManager/Components/Lead/index')),
        authority: ["ADMIN","Senior Architect"],
        meta: {
         
        },
    },
    {
        key: 'appsCrm.fileManager',
        path: `${APP_PREFIX_PATH}/crm/fileManager/leads/folder`,
        component: lazy(() => import('@/views/crm/FileManager/Components/Lead/Folders/index')),
        authority: ["ADMIN","Senior Architect"],
        meta: {
         
        },
    },
    {
        key: 'appsCrm.fileManager',
        path: `${APP_PREFIX_PATH}/crm/fileManager/leads/upload`,
        component: lazy(() => import('@/views/crm/FileManager/Components/Lead/Folders/index')),
        authority: ["ADMIN","Senior Architect"],
        meta: {
         
        },
    },
    {
        key: 'appsCrm.fileManager',
        path: `${APP_PREFIX_PATH}/crm/fileManager/project`,
        component: lazy(() => import('@/views/crm/FileManager/Components/Project/index')),
        authority: ["ADMIN","Senior Architect","3D Visualizer","Jr. Interior Designer","Project Architect","Jr. Executive HR & Marketing"],
        meta: {
         
        },
    },
    {
        key: 'appsCrm.fileManager',
        path: `${APP_PREFIX_PATH}/crm/fileManager/project/folder`,
        component: lazy(() => import('@/views/crm/FileManager/Components/Project/Folders/index')),
        authority: ["ADMIN","Senior Architect","3D Visualizer","Jr. Interior Designer","Project Architect","Jr. Executive HR & Marketing"],
        meta: {
         
        },
    },
    {
        key: 'appsCrm.fileManager',
        path: `${APP_PREFIX_PATH}/crm/fileManager/project/upload`,
        component: lazy(() => import('@/views/crm/FileManager/Components/Project/Folders/index')),
        authority: ["ADMIN","Senior Architect","3D Visualizer","Jr. Interior Designer","Project Architect","Jr. Executive HR & Marketing"],
        meta: {
         
        },
    },
    {
        key: 'appsCrm.fileManager',
        path: `${APP_PREFIX_PATH}/crm/fileManager/project/templates/commercial`,
        component: lazy(() => import('@/views/crm/FileManager/Components/Template/Commercial/commercial')),
        authority: ["ADMIN","Senior Architect"],
        meta: {
         
        },
    },
    {
        key: 'appsCrm.fileManager',
        path: `${APP_PREFIX_PATH}/crm/fileManager/project/templates/commercial/subfolder`,
        component: lazy(() => import('@/views/crm/FileManager/Components/Template/Commercial/subfolder/index')),
        authority: ["ADMIN","Senior Architect"],
        meta: {
         
        },
    },
    {
        key: 'appsCrm.fileManager',
        path: `${APP_PREFIX_PATH}/crm/fileManager/project/templates/commercial/subfolder/files`,
        component: lazy(() => import('@/views/crm/FileManager/Components/Template/Files')),
        authority: ["ADMIN","Senior Architect"],
        meta: {
         
        },
    },
    {
        key: 'appsCrm.fileManager',
        path: `${APP_PREFIX_PATH}/crm/fileManager/project/templates/residential`,
        component: lazy(() => import('@/views/crm/FileManager/Components/Template/Residential/residential')),
        authority: ["ADMIN","Senior Architect"],
        meta: {
         
        },
    },
    {
        key: 'appsCrm.fileManager',
        path: `${APP_PREFIX_PATH}/crm/fileManager/project/templates/residential/subfolder`,
        component: lazy(() => import('@/views/crm/FileManager/Components/Template/Residential/subfolder/index')),
        authority: ["ADMIN","Senior Architect"],
        meta: {
         
        },
    },
    {
        key: 'appsCrm.fileManager',
        path: `${APP_PREFIX_PATH}/crm/fileManager/project/templates/residential/subfolder/files`,
        component: lazy(() => import('@/views/crm/FileManager/Components/Template/Files')),
        authority: ["ADMIN","Senior Architect"],
        meta: {
         
        },
    },
    {
        key: 'appsCrm.fileManager',
        path: `${APP_PREFIX_PATH}/crm/fileManager/project/templates/residential/subfolder/files`,
        component: lazy(() => import('@/views/crm/FileManager/Components/Template/Files')),
        authority: ["ADMIN","Senior Architect"],
        meta: {
         
        },
    },
    {
        key: 'appsCrm.fileManager',
        path: `${APP_PREFIX_PATH}/crm/fileManager/project/templates/miscellaneous/subfolder`,
        component: lazy(() => import('@/views/crm/FileManager/Components/Template/Miscellaneous')),
        authority: ["ADMIN","Senior Architect","Jr. Executive HR & Marketing"],
        meta: {
         
        },
    },
    {
        key: 'appsCrm.fileManager',
        path: `${APP_PREFIX_PATH}/crm/fileManager/project/templates/miscellaneous/subfolder/files`,
        component: lazy(() => import('@/views/crm/FileManager/Components/Template/Files')),
        authority: ["ADMIN","Senior Architect","Jr. Executive HR & Marketing"],
        meta: {
         
        },
    },
    {
        key: 'appsCrm.fileManager',
        path: `${APP_PREFIX_PATH}/crm/fileManager/archive`,
        component: lazy(() => import('@/views/crm/FileManager/Components/Template/Archive/Components/Index')),
        authority: ["ADMIN","Senior Architect","Jr. Executive HR & Marketing"],
        meta: {
         
        },
    },
    {
        key: 'appsCrm.project',
        path: `${APP_PREFIX_PATH}/crm/projectslist`,
        component: lazy(() => import('@/views/crm/Customers')),
        authority: ["ADMIN","Senior Architect","3D Visualizer","Jr. Interior Designer","Project Architect","Executive Assistant"],
        meta: {
            
        },
    },
    {
        key: 'appsSales.orderDetails',
        path: `${APP_PREFIX_PATH}/crm/project-details?id=8`,
        component: lazy(() => import('@/views/crm/CustomerDetail')),
        authority: ["ADMIN","Senior Architect","3D Visualizer","Jr. Interior Designer","Project Architect","Executive Assistant"],
    },
    {
        key: 'appsCrm.customerDetails',
        path: `${APP_PREFIX_PATH}/crm/project-details`,
        component: lazy(() => import('@/views/crm/CustomerDetail')),
        authority: ["ADMIN","Senior Architect","3D Visualizer","Jr. Interior Designer","Project Architect","Executive Assistant"],
        meta: {
          
        },
    },
    {
        key: 'appsCrm.form',
        path: `${APP_PREFIX_PATH}/crm/project/momform`,
        component: lazy(() => import('@/views/crm/CustomerDetail/components/MOM/MomForm')),
        authority: ["ADMIN","Senior Architect","3D Visualizer","Jr. Interior Designer","Project Architect"],
    },
    {
        key: 'appsCrm.mom',
        path: `${APP_PREFIX_PATH}/crm/MOM`,
        component: lazy(() => import('@/views/crm/Inventory')),
        authority: ["ADMIN","Senior Architect","3D Visualizer","Jr. Interior Designer","Project Architect"],
    },
    {
        key: 'appsCrm.inventory',
        path: `${APP_PREFIX_PATH}/crm/Inventory`,
        component: lazy(() => import('@/views/crm/Projects')),
        authority: ["ADMIN","Senior Architect"],
    },
  
   
    // {
    //     key: 'appsCrm.customers',
    //     path: `${APP_PREFIX_PATH}/crm/projects`,
    //     component: lazy(() => import('@/views/crm/ProjectList')),
    //     authority: ["ADMIN","Senior Architect"],
    //     meta: {
          
    //     },
    // },
   
    {
        key: 'appsCrm.customerDetails',
        path: `${APP_PREFIX_PATH}/crm/contract`,
        component: lazy(() => import('@/views/crm/CustomerDetail/components/Contract/index')),
        authority: ["ADMIN","Senior Architect"],
       
    },
    {
        key: 'appsCrm.customerDetails',
        path: `${APP_PREFIX_PATH}/crm/pdf`,
        component: lazy(() => import('@/views/crm/CustomerDetail/components/Contract/pdf')),
        authority: ["ADMIN","Senior Architect"],
       
    },
    {
        key: 'appsCrm.customerDetails',
        path: `${APP_PREFIX_PATH}/crm/pdf2`,
        component: lazy(() => import('@/views/crm/CustomerDetail/components/Contract/pdf')),
        authority: ["ADMIN","Senior Architect"],
       
    },
    {
        key: 'appsCrm.customerDetails',
        path: `${APP_PREFIX_PATH}/crm/pdf1`,
        component: lazy(() => import('@/views/crm/CustomerDetail/components/Contract/Mycomponent')),
        authority: ["ADMIN","Senior Architect"],
       
    },
  
    {
        key: 'appsSales.allmom',
        path: `${APP_PREFIX_PATH}/crm/allmom`,
        component: lazy(() => import('@/views/crm/CustomerDetail/components/MOM/AllMom')),
        authority: ["ADMIN","Senior Architect"],
    },
    {
        key: 'appsCrm.customerDetails',
        path: `${APP_PREFIX_PATH}/crm/lead`,
        component: lazy(() => import('@/views/crm/LeadsDetails')),
        authority: ["ADMIN","Senior Architect"],
        meta: {
           
            
        },
    },
    {
        key: 'appsCrm.quotationform',
        path: `${APP_PREFIX_PATH}/crm/project/quotation-form`,
        component: lazy(() => import('@/views/crm/CustomerDetail/components/QuotationForm')),
        authority: ["ADMIN","Senior Architect"],
        meta: {
            header: 'Quotation',
            headerContainer: true,
        },
    },
    
    {
        key: 'appsSales.productNew',
        path: `${APP_PREFIX_PATH}/crm/lead-new`,
        component: lazy(() => import('@/views/crm/CrmDashboard/LeadNew')),
        authority: ["ADMIN","Senior Architect"],
        meta: {
            header: 'Add Lead',
        },
    },

    {
        key: 'appsSales.productList',
        path: `${APP_PREFIX_PATH}/leads`,
        component: lazy(() => import('@/views/crm/LeadList')),
        authority: ["ADMIN","Senior Architect"],
    },
   
    {
        key: 'appsSales.productNew',
        path: `${APP_PREFIX_PATH}/crm/lead-project`,
        component: lazy(() => import('@/views/crm/ProjectNew')),
        authority: ["ADMIN","Senior Architect"],
        meta: {
            header: 'Add Project',
        },
    },
    {
        key: 'appsSales.orderList',
        path: `${APP_PREFIX_PATH}/sales/order-list`,
        component: lazy(() => import('@/views/crm/Inventory')),
        authority: ["ADMIN","Senior Architect"],
    },
    
 
]

export default appsRoute
