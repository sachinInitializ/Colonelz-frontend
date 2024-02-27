import {  Tabs } from '@/components/ui'
import TabContent from '@/components/ui/Tabs/TabContent'
import TabList from '@/components/ui/Tabs/TabList'
import { MdManageAccounts } from "react-icons/md";
import TabNav from '@/components/ui/Tabs/TabNav'
import { GoRepoTemplate } from "react-icons/go";
import { LuFileStack } from "react-icons/lu";
import Leads from './Components/Leads';
import Projects from './Components/Projects';
import Template from './Components/Template';

const FileManager = () => {
  return (
    <div>
    <Tabs defaultValue="tab1">
        <TabList>
            <TabNav value="tab1" icon={<MdManageAccounts />}>
                Leads
            </TabNav>
            <TabNav value="tab2" icon={<LuFileStack />}>
                Projects
            </TabNav>
            <TabNav value="tab3" icon={<GoRepoTemplate />}>
                Templates
            </TabNav>
        </TabList>
        <div className="p-4">
            <TabContent value="tab1">
               <Leads/>
            </TabContent>
            <TabContent value="tab2">
               <Projects/>
            </TabContent>
            <TabContent value="tab3">
                <Template/>
            </TabContent>
        </div>
    </Tabs>
</div>
  )
}

export default FileManager