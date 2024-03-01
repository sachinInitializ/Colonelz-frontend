import { Card } from '@/components/ui'
import React from 'react'

const Template = () => {
  return (
    <div className='grid grid-cols-3 gap-4'>
      <a href="https://myawsbucket12346780987.s3.ap-south-1.amazonaws.com/response.pdf" target='_blank'>
      <Card>Commercial</Card>
      </a>

      <a href="https://myawsbucket12346780987.s3.ap-south-1.amazonaws.com/Colonelz_Residential+Int+Design+Contract_Mr+ABC%2C+Noida_13122023.pdf" target='_blank' rel='noreferrer'>
      <Card>Residential</Card>
      </a>
      </div>
  )
}

export default Template