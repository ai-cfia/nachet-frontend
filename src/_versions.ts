export interface TsAppVersion {
    version: string;
    name: string;
    description?: string;
    versionLong?: string;
    versionDate: string;
    gitCommitHash?: string;
    gitCommitDate?: string;
    gitTag?: string;
};
export const versions: TsAppVersion = {
    version: '0.8.5',
    name: 'nachet-frontend',
    versionDate: '2024-06-05T14:39:44.056Z',
    gitCommitHash: '9074593',
    versionLong: '0.8.5-9074593',
};
export default versions;
