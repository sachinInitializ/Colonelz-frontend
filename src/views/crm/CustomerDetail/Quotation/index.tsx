import React from 'react'
import Quotations, { FileItemProps } from './Quotations'
import { Button } from '@/components/ui'

const Index = (Data:any) => {
  return (<>
    
    <div><Quotations data={Data.data}/></div>
    </>
  )
}

export default Index