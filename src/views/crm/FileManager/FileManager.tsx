import { Card, Tabs } from '@/components/ui'
import TabContent from '@/components/ui/Tabs/TabContent'
import TabList from '@/components/ui/Tabs/TabList'
import TabNav from '@/components/ui/Tabs/TabNav'
import React from 'react'
import { HiOutlineHome, HiOutlinePhone, HiOutlineUser } from 'react-icons/hi'

const FileManager = () => {
  return (
    <div>
    <Tabs defaultValue="tab1">
        <TabList>
            <TabNav value="tab1" icon={<HiOutlineHome />}>
                Leads
            </TabNav>
            <TabNav value="tab2" icon={<HiOutlineUser />}>
                Projects
            </TabNav>
            <TabNav value="tab3" icon={<HiOutlinePhone />}>
                Templates
            </TabNav>
        </TabList>
        <div className="p-4">
            <TabContent value="tab1">
                <p>
                    If builders built buildings the way programmers
                    wrote programs, then the first woodpecker that came
                    along would destroy civilization. (Gerald Weinberg)
                </p>
            </TabContent>
            <TabContent value="tab2">
                <p>
                    A computer lets you make more mistakes faster than
                    any invention in human historywith the possible
                    exceptions of handguns and tequila. (Mitch
                    Radcliffe).
                </p>
            </TabContent>
            <TabContent value="tab3">
                <p>
                    In C++ its harder to shoot yourself in the foot, but
                    when you do, you blow off your whole leg. (Bjarne
                    Stroustrup)
                </p>
            </TabContent>
        </div>
    </Tabs>
</div>
  )
}

export default FileManager