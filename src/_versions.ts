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
    versionDate: '2024-05-08T03:07:49.650Z',
    gitCommitHash: '3cb8a30',
    versionLong: '0.8.5-3cb8a30',
};
export default versions;
