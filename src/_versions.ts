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
    version: '0.6.0',
    name: 'nachet-frontend',
    versionDate: '2024-04-10T23:30:36.088Z',
    gitCommitHash: 'c055310',
    versionLong: '0.6.0-c055310',
};
export default versions;
