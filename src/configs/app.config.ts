const role = localStorage.getItem('role');
const env = await import.meta.env.VITE_APP_BASE_URL;

export type AppConfig = {
    apiPrefix: string;
    authenticatedEntryPath: string;
    unAuthenticatedEntryPath: string;
    tourPath: string;
    locale: string;
    enableMock: boolean;
};



const appConfig: AppConfig = {
    apiPrefix: `${env}v1/api/`,
    authenticatedEntryPath: (role === 'Site Supervisor' || role === 'Jr. Executive HR & Marketing') ? '/app/crm/fileManager' : '/app/crm/dashboard',
    unAuthenticatedEntryPath: '/sign-in',
    tourPath: '/app/account/kyc-form',
    locale: 'en',
    enableMock: false
};

console.log(appConfig);

export default appConfig;
