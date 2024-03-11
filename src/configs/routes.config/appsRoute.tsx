import { lazy } from 'react'
import { APP_PREFIX_PATH } from '@/constants/route.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'

const appsRoute: Routes = [
    {
        key: 'appsCrm.dashboard',
        path: `${APP_PREFIX_PATH}/crm/dashboard`,
        component: lazy(() => import('@/views/crm/CrmDashboard')),
        authority: ['ADMIN', USER],
      
    },
    {
        key: 'appsCrm.fileManager',
        path: `${APP_PREFIX_PATH}/crm/fileManager`,
        component: lazy(() => import('@/views/crm/FileManager')),
        authority: ['ADMIN', USER],
        meta: {
            header: 'File Manager',
            headerContainer: true,
        },
    },
    {
        key: 'appsCrm.fileManager',
        path: `${APP_PREFIX_PATH}/crm/fileManager/leads`,
        component: lazy(() => import('@/views/crm/FileManager/Components/Lead/index')),
        authority: ["ADMIN", USER],
        meta: {
         
        },
    },
    {
        key: 'appsCrm.fileManager',
        path: `${APP_PREFIX_PATH}/crm/fileManager/leads/folder`,
        component: lazy(() => import('@/views/crm/FileManager/Components/Lead/Folders/index')),
        authority: ["ADMIN", USER],
        meta: {
         
        },
    },
    {
        key: 'appsCrm.fileManager',
        path: `${APP_PREFIX_PATH}/crm/fileManager/leads/upload`,
        component: lazy(() => import('@/views/crm/FileManager/Components/Lead/Folders/index')),
        authority: ["ADMIN", USER],
        meta: {
         
        },
    },
    {
        key: 'appsCrm.fileManager',
        path: `${APP_PREFIX_PATH}/crm/fileManager/project`,
        component: lazy(() => import('@/views/crm/FileManager/Components/Project/index')),
        authority: ["ADMIN", USER],
        meta: {
         
        },
    },
    {
        key: 'appsCrm.fileManager',
        path: `${APP_PREFIX_PATH}/crm/fileManager/project/folder`,
        component: lazy(() => import('@/views/crm/FileManager/Components/Project/Folders/index')),
        authority: ["ADMIN", USER],
        meta: {
         
        },
    },
    {
        key: 'appsCrm.fileManager',
        path: `${APP_PREFIX_PATH}/crm/fileManager/project/upload`,
        component: lazy(() => import('@/views/crm/FileManager/Components/Project/Folders/index')),
        authority: ["ADMIN", USER],
        meta: {
         
        },
    },
    {
        key: 'appsCrm.fileManager',
        path: `${APP_PREFIX_PATH}/crm/fileManager/project/templates/commercial`,
        component: lazy(() => import('@/views/crm/FileManager/Components/Template/Commercial/commercial')),
        authority: ["ADMIN", USER],
        meta: {
         
        },
    },
    {
        key: 'appsCrm.fileManager',
        path: `${APP_PREFIX_PATH}/crm/fileManager/project/templates/commercial/subfolder`,
        component: lazy(() => import('@/views/crm/FileManager/Components/Template/Commercial/subfolder/index')),
        authority: ["ADMIN", USER],
        meta: {
         
        },
    },
    {
        key: 'appsCrm.fileManager',
        path: `${APP_PREFIX_PATH}/crm/fileManager/project/templates/commercial/subfolder/files`,
        component: lazy(() => import('@/views/crm/FileManager/Components/Template/Files')),
        authority: ["ADMIN", USER],
        meta: {
         
        },
    },
    {
        key: 'appsCrm.fileManager',
        path: `${APP_PREFIX_PATH}/crm/fileManager/project/templates/residential`,
        component: lazy(() => import('@/views/crm/FileManager/Components/Template/Residential/residential')),
        authority: ["ADMIN", USER],
        meta: {
         
        },
    },
    {
        key: 'appsCrm.fileManager',
        path: `${APP_PREFIX_PATH}/crm/fileManager/project/templates/residential/subfolder`,
        component: lazy(() => import('@/views/crm/FileManager/Components/Template/Residential/subfolder/index')),
        authority: ["ADMIN", USER],
        meta: {
         
        },
    },
    {
        key: 'appsCrm.fileManager',
        path: `${APP_PREFIX_PATH}/crm/fileManager/project/templates/residential/subfolder/files`,
        component: lazy(() => import('@/views/crm/FileManager/Components/Template/Files')),
        authority: ["ADMIN", USER],
        meta: {
         
        },
    },
    {
        key: 'appsCrm.fileManager',
        path: `${APP_PREFIX_PATH}/crm/fileManager/project/templates/residential/subfolder/files`,
        component: lazy(() => import('@/views/crm/FileManager/Components/Template/Files')),
        authority: ["ADMIN", USER],
        meta: {
         
        },
    },
    {
        key: 'appsCrm.fileManager',
        path: `${APP_PREFIX_PATH}/crm/fileManager/project/templates/miscellaneous/subfolder`,
        component: lazy(() => import('@/views/crm/FileManager/Components/Template/Miscellaneous')),
        authority: ["ADMIN", USER],
        meta: {
         
        },
    },
    {
        key: 'appsCrm.fileManager',
        path: `${APP_PREFIX_PATH}/crm/fileManager/project/templates/miscellaneous/subfolder/files`,
        component: lazy(() => import('@/views/crm/FileManager/Components/Template/Files')),
        authority: ["ADMIN", USER],
        meta: {
         
        },
    },
    {
        key: 'appsCrm.project',
        path: `${APP_PREFIX_PATH}/crm/projectslist`,
        component: lazy(() => import('@/views/crm/Customers')),
        authority: ["ADMIN", USER],
        meta: {
            
        },
    },
    {
        key: 'appsCrm.inventory',
        path: `${APP_PREFIX_PATH}/crm/Inventory`,
        component: lazy(() => import('@/views/crm/Projects')),
        authority: ["ADMIN", USER],
    },
    {
        key: 'appsCrm.form',
        path: `${APP_PREFIX_PATH}/crm/project/momform`,
        component: lazy(() => import('@/views/crm/CustomerDetail/components/MOM/MomForm')),
        authority: ["ADMIN", USER],
    },
   
    // {
    //     key: 'appsCrm.customers',
    //     path: `${APP_PREFIX_PATH}/crm/projects`,
    //     component: lazy(() => import('@/views/crm/ProjectList')),
    //     authority: ["ADMIN", USER],
    //     meta: {
          
    //     },
    // },
    {
        key: 'appsCrm.customerDetails',
        path: `${APP_PREFIX_PATH}/crm/project-details`,
        component: lazy(() => import('@/views/crm/CustomerDetail')),
        authority: ["ADMIN", USER],
        meta: {
            header: 'Project Details',
            headerContainer: true,
        },
    },
    {
        key: 'appsCrm.mom',
        path: `${APP_PREFIX_PATH}/crm/MOM`,
        component: lazy(() => import('@/views/crm/Inventory')),
        authority: ["ADMIN", USER],
    },
    {
        key: 'appsSales.allmom',
        path: `${APP_PREFIX_PATH}/crm/allmom`,
        component: lazy(() => import('@/views/crm/CustomerDetail/components/MOM/AllMom')),
        authority: ["ADMIN", USER],
    },
    {
        key: 'appsCrm.customerDetails',
        path: `${APP_PREFIX_PATH}/crm/lead`,
        component: lazy(() => import('@/views/crm/LeadsDetails')),
        authority: ["ADMIN", USER],
        meta: {
            header: 'Lead Details',
            headerContainer: true,
        },
    },
    {
        key: 'appsCrm.quotationform',
        path: `${APP_PREFIX_PATH}/crm/project/quotation-form`,
        component: lazy(() => import('@/views/crm/CustomerDetail/components/QuotationForm')),
        authority: ["ADMIN", USER],
        meta: {
            header: 'Quotation',
            headerContainer: true,
        },
    },
    {
        key: 'appsCrm.mail',
        path: `${APP_PREFIX_PATH}/crm/mail`,
        component: lazy(() => import('@/views/crm/Mail')),
        authority: ["ADMIN", USER],
        meta: {
            pageContainerType: 'gutterless',
            footer: false,
        },
    },
    {
        key: 'appsCrm.mail',
        path: `${APP_PREFIX_PATH}/crm/projectfo`,
        component: lazy(() => import('@/views/crm/CrmDashboard/ProductNew')),
        authority: ["ADMIN", USER],
        meta: {
            pageContainerType: 'gutterless',
            footer: false,
        },
    },
    {
        key: 'appsCrm.mail',
        path: `${APP_PREFIX_PATH}/crm/mail/:category`,
        component: lazy(() => import('@/views/crm/Mail')),
        authority: ["ADMIN", USER],
        meta: {
            pageContainerType: 'gutterless',
            footer: false,
        },
    },
    {
        key: 'appsSales.productNew',
        path: `${APP_PREFIX_PATH}/crm/lead-new`,
        component: lazy(() => import('@/views/crm/CrmDashboard/LeadNew')),
        authority: ["ADMIN", USER],
        meta: {
            header: 'Add Lead',
        },
    },



    {
        key: 'appsSales.dashboard',
        path: `${APP_PREFIX_PATH}/sales/dashboard`,
        component: lazy(() => import('@/views/sales/SalesDashboard')),
        authority: ["ADMIN", USER],
    },
    {
        key: 'appsSales.productList',
        path: `${APP_PREFIX_PATH}/leads`,
        component: lazy(() => import('@/views/crm/LeadList')),
        authority: ["ADMIN", USER],
    },
    {
        key: 'appsSales.orders-details',
        path: `${APP_PREFIX_PATH}//sales/orders-details/:orderId`,
        component: lazy(() => import('@/views/sales/OrderDetails')),
        authority: ["ADMIN", USER],
    },
   
    {
        key: 'appsSales.productNew',
        path: `${APP_PREFIX_PATH}/crm/projectform`,
        component: lazy(() => import('@/views/crm/ProjectsForm/ProductNew')),
        authority: ["ADMIN", USER],
        meta: {
            header: 'Add Project',
        },
    },
    {
        key: 'appsSales.productNew',
        path: `${APP_PREFIX_PATH}/crm/lead-project`,
        component: lazy(() => import('@/views/crm/ProjectNew')),
        authority: ["ADMIN", USER],
        meta: {
            header: 'Add Project',
        },
    },
    {
        key: 'appsSales.orderList',
        path: `${APP_PREFIX_PATH}/sales/order-list`,
        component: lazy(() => import('@/views/crm/Inventory')),
        authority: ["ADMIN", USER],
    },
    
    {
        key: 'appsSales.orderDetails',
        path: `${APP_PREFIX_PATH}/crm/project-details?id=8`,
        component: lazy(() => import('@/views/crm/CustomerDetail')),
        authority: ["ADMIN", USER],
    },
    {
        key: 'appsCrypto.dashboard',
        path: `${APP_PREFIX_PATH}/crypto/dashboard`,
        component: lazy(() => import('@/views/crypto/CryptoDashboard')),
        authority: [ADMIN, USER],
    },
    {
        key: 'appsCrypto.portfolio',
        path: `${APP_PREFIX_PATH}/crypto/portfolio`,
        component: lazy(() => import('@/views/crypto/Portfolio')),
        authority: [ADMIN, USER],
        meta: {
            header: 'Portfolio',
        },
    },
    {
        key: 'appsCrypto.market',
        path: `${APP_PREFIX_PATH}/crypto/market`,
        component: lazy(() => import('@/views/crypto/Market')),
        authority: [ADMIN, USER],
        meta: {
            header: 'Market',
        },
    },
    {
        key: 'appsCrypto.wallets',
        path: `${APP_PREFIX_PATH}/crypto/wallets`,
        component: lazy(() => import('@/views/crypto/Wallets')),
        authority: [ADMIN, USER],
        meta: {
            header: 'Wallets',
        },
    },
    {
        key: 'appsknowledgeBase.helpCenter',
        path: `${APP_PREFIX_PATH}/knowledge-base/help-center`,
        component: lazy(() => import('@/views/knowledge-base/HelpCenter')),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'gutterless',
        },
    },
    {
        key: 'appsknowledgeBase.article',
        path: `${APP_PREFIX_PATH}/knowledge-base/article`,
        component: lazy(() => import('@/views/knowledge-base/Article')),
        authority: [ADMIN, USER],
    },
    {
        key: 'appsknowledgeBase.manageArticles',
        path: `${APP_PREFIX_PATH}/knowledge-base/manage-articles`,
        component: lazy(() => import('@/views/knowledge-base/ManageArticles')),
        authority: [ADMIN, USER],
        meta: {
            header: 'Manage Articles',
            extraHeader: lazy(
                () =>
                    import(
                        '@/views/knowledge-base/ManageArticles/components/PanelHeader'
                    ),
            ),
            headerContainer: true,
        },
    },
    {
        key: 'appsknowledgeBase.editArticle',
        path: `${APP_PREFIX_PATH}/knowledge-base/edit-article`,
        component: lazy(() => import('@/views/knowledge-base/EditArticle')),
        authority: [ADMIN, USER],
    },
    {
        key: 'appsAccount.settings',
        path: `${APP_PREFIX_PATH}/account/settings/:tab`,
        component: lazy(() => import('@/views/account/Settings')),
        authority: [ADMIN, USER],
        meta: {
            header: 'Settings',
            headerContainer: true,
        },
    },
    {
        key: 'appsAccount.invoice',
        path: `${APP_PREFIX_PATH}/account/invoice/:id`,
        component: lazy(() => import('@/views/account/Invoice')),
        authority: [ADMIN, USER],
    },
    {
        key: 'appsAccount.activityLog',
        path: `${APP_PREFIX_PATH}/account/activity-log`,
        component: lazy(() => import('@/views/account/ActivityLog')),
        authority: [ADMIN, USER],
    },
    {
        key: 'appsAccount.kycForm',
        path: `${APP_PREFIX_PATH}/account/kyc-form`,
        component: lazy(() => import('@/views/account/KycForm')),
        authority: [ADMIN, USER],
    },
]

export default appsRoute
