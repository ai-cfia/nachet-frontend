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
    version: '1.0.0',
    name: 'nachet-frontend',
    versionDate: '2023-08-04T02:34:35.906Z',
    gitCommitHash: '83fc194',
    versionLong: '1.0.0-83fc194',
};
export default versions;
