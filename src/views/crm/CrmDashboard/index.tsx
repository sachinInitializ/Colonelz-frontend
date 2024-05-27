import React from 'react'
import CrmDashboard from './CrmDashboard'
import { ProjectProvider } from '../Customers/store/ProjectContext'
import { LeadProvider } from '../LeadList/store/LeadContext'

const Index = () => {
  return (
    <LeadProvider>
    <ProjectProvider>
    <CrmDashboard/>
    </ProjectProvider>
    </LeadProvider>
  )
}

export default Index

