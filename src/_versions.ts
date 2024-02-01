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
    version: '0.2.0',
    name: 'nachet-frontend',
    versionDate: '2024-01-31T19:54:11.734Z',
    gitCommitHash: '3f39a27',
    versionLong: '0.2.0-3f39a27',
};
export default versions;
