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
    version: '0.8.3',
    name: 'nachet-frontend',
    versionDate: '2024-05-28T01:42:26.974Z',
    gitCommitHash: '71f4e7d',
    versionLong: '0.8.3-71f4e7d',
};
export default versions;
