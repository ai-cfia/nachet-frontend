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
    versionDate: '2024-04-04T18:42:15.741Z',
    gitCommitHash: '2322029',
    versionLong: '0.4.0-2322029',
};
export default versions;
