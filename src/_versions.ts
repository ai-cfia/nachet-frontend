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
    version: '0.8.4',
    name: 'nachet-frontend',
    versionDate: '2024-05-30T04:19:03.983Z',
    gitCommitHash: 'd019904',
    versionLong: '0.8.4-d019904',
};
export default versions;
