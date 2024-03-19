import React from 'react'
import Quotations, { FileItemProps } from './Quotations'
import { Button } from '@/components/ui'

const Index = (Data:FileItemProps) => {
  return (<>
    
    <div><Quotations data={Data.data}/></div>
    </>
  )
}

export default Index