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
import { DataProvider } from './FileManagerContext/FIleContext';

const FileManager = () => {
  const role=localStorage.getItem('role')
  return (
    <div>
    <Tabs 
    defaultValue={role === 'Jr. Executive HR & Marketing' ? 'tab3' : (role === 'ADMIN' || role === 'Senior Architect') ? 'tab1' : 'tab2'}
    >
        <TabList>
            {(role==='ADMIN' || role==='Senior Architect') && <TabNav value="tab1" icon={<MdManageAccounts />}>
           
                Leads
            </TabNav>}
            {role !== 'Jr. Executive HR & Marketing' && (
  <TabNav value="tab2" icon={<LuFileStack />}>
    Projects
  </TabNav>
)}
         {(role === 'ADMIN' || role === 'Senior Architect' || role === 'Jr. Executive HR & Marketing') && (
  <TabNav value="tab3" icon={<GoRepoTemplate />}>
    Company Data
  </TabNav>
)}
        </TabList>
        <div className="p-4">
          <DataProvider>
            <TabContent value="tab1">
               <Leads/>
            </TabContent>
            <TabContent value="tab2">
               <Projects />
            </TabContent>
            <TabContent value="tab3">
                <Template/>
            </TabContent>
            </DataProvider>
        </div>
    </Tabs>
</div>
  )
}

export default FileManager