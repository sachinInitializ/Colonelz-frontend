
import React from 'react'
import { FaFolder } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Footer from '../../../Footer'

const Commercial = () => {
    const navigate=useNavigate()
  return (
    <>
     <div>
      <h3 className='mb-8'>Folder</h3>
    <div className='grid grid-cols-6 gap-4'>
     <div className=' cursor-pointer' onClick={()=>navigate('/app/crm/fileManager/project/templates/commercial/subfolder?type=commercial&folder=designing')}>
      <div className='flex flex-col justify-center items-center gap-1'>
      <div className={` text-xl mr-3 text-yellow-500`}>
                                  <FaFolder />
                              </div>
     <p> Design</p>
      </div></div>
  
    <div className=' cursor-pointer' onClick={()=>navigate('/app/crm/fileManager/project/templates/commercial/subfolder?type=commercial&folder=executing')}>
      <div className='flex flex-col justify-center items-center gap-1'>
      <div className={` text-xl mr-3 text-yellow-500`}>
                                  <FaFolder />
                              </div>
     <p> Design and Execution</p>
      </div></div>
    </div>
    <Footer/>
    </div>
    </>
  )
}

export default Commercial