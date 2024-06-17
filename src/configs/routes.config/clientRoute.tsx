import { lazy } from 'react'
import type { Routes } from '@/@types/routes'
import { themeConfig } from '../theme.config'
const clientRoute: Routes = [
{
    key: 'remark',
    path: `/Quotation`,
    component: (lazy(() => import('@/views/crm/FileManager/Components/Client_approval'))),
    authority: [],
    meta: {
        layout: 'blank',
            pageContainerType: 'gutterless',
            footer: false, 
    },
},]
export default clientRoute