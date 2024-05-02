import { Tabs } from '@/components/ui'
import TabContent from '@/components/ui/Tabs/TabContent'
import TabList from '@/components/ui/Tabs/TabList'
import TabNav from '@/components/ui/Tabs/TabNav'
import React from 'react'
import Profile from './profile'
import Password from './passsword'
import Users from '../users'

const Index = () => {
  return (<div className='px-4'>
    <h3 className='mb-5'>My Profile</h3>
    <Tabs defaultValue="tab1">
    <TabList>
        <TabNav value="tab1">Profile</TabNav>
        <TabNav value="tab2">Password</TabNav>
        <TabNav value="tab3">Users</TabNav>
    </TabList>
    <div className="p-4">
        <TabContent value="tab1">
           
        <Profile/>
        </TabContent>
        <TabContent value="tab2">
            <Password/>
        </TabContent>
        <TabContent value="tab3">
           <Users/>
        </TabContent>
    </div>
</Tabs>
</div>
  )
}

export default Index