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
    version: '0.8.2',
    name: 'nachet-frontend',
    versionDate: '2024-05-08T01:56:33.233Z',
    gitCommitHash: 'eecd9cd',
    versionLong: '0.8.2-eecd9cd',
};
export default versions;
