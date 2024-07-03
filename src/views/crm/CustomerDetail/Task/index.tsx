import React, { useEffect, useState } from 'react'
import Task from './Task'
import { useLocation } from 'react-router-dom';
import { apiGetCrmProjectsTaskData } from '@/services/CrmService';

const Index = () => {
  
  return (
    <div><Task /></div>
  )
}

export default Index