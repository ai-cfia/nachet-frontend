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
    version: '0.3.0',
    name: 'nachet-frontend',
    versionDate: '2024-02-07T23:51:41.766Z',
    gitCommitHash: 'a8e467a',
    versionLong: '0.3.0-a8e467a',
};
export default versions;
