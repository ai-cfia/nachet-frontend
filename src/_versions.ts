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
    version: '0.9.2',
    name: 'nachet-frontend',
    versionDate: '2024-07-08T01:42:43.171Z',
    gitCommitHash: '92aa6aa',
    versionLong: '0.9.2-92aa6aa',
};
export default versions;
