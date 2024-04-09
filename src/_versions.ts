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
    version: '0.4.0',
    name: 'nachet-frontend',
    versionDate: '2024-04-09T05:25:33.301Z',
    gitCommitHash: '5152624',
    versionLong: '0.4.0-5152624',
};
export default versions;
