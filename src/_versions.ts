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
    version: '0.9.3',
    name: 'nachet-frontend',
    versionDate: '2024-08-22T15:34:23.392Z',
    gitCommitHash: '39e3b3e',
    versionLong: '0.9.3-39e3b3e',
};
export default versions;
