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
    versionDate: '2024-08-08T15:54:33.372Z',
    gitCommitHash: 'f1074c8',
    versionLong: '0.9.3-f1074c8',
};
export default versions;
