

export type Statistic = {
    key: string
    label: string
    value: number
    growShrink: number
}

export type LeadRegion = {
    name: string
    value: number
}
export type Customer = {
    clientName: string
    status:string
    leadDate: Date
    phone:number
    email:string
}

export type Lead = {
    id: number
    projectName: string
    phase: string
    projectType: number
    clientName: string
    estimatedCompletion: string
}

export type Emails = {
    precent: number
    opened: number
    unopen: number
    total: number
}

export type DashboardData = {
    statisticData: Statistic[]
    leadByRegionData: LeadRegion[]
    recentLeadsData: Lead[]
    emailSentData: {
        precent: number
        opened: number
        unopen: number
        total: number
    }
}



export type CrmDashboardState = {
    loading: boolean
    dashboardData: Partial<DashboardData>
}

export const SLICE_NAME = 'crmDashboard'








