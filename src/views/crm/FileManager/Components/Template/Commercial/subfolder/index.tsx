import { Card } from '@/components/ui'
import React from 'react'
import { FaFolder } from 'react-icons/fa'

const Index = () => {
  return (
    <div className='grid grid-cols-3 gap-4'>
     <Card>
      <div className='flex gap-4'>
      <div className={` text-xl mr-3 text-yellow-500`}>
                                  <FaFolder />
                              </div>
     <p> Contract</p>
      </div></Card>
  
    <Card>
      <div className='flex gap-4'>
      <div className={` text-xl mr-3 text-yellow-500`}>
                                  <FaFolder />
                              </div>
     <p> Quotation</p>
      </div></Card>
    
    </div>
  )
}

export default Index