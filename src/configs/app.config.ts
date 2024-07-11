import process from "process"
const role=localStorage.getItem('role')
console.log(role);

export type AppConfig = {
    apiPrefix: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    tourPath: string
    locale: string
    enableMock: boolean
}

const appConfig: AppConfig = {
    apiPrefix: 'https://colonelz-back.test.initz.run/v1/api/',
    authenticatedEntryPath:(role==='Site Supervisor' || role==='Jr. Executive HR & Marketing')?'/app/crm/fileManager':'/app/crm/dashboard',
    unAuthenticatedEntryPath: '/sign-in',
    tourPath: '/app/account/kyc-form',
    locale: 'en',
    enableMock: true,
}

export default appConfig
