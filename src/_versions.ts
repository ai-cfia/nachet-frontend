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
    versionDate: '2024-04-09T22:31:42.159Z',
    gitCommitHash: '6b3e2ef',
    versionLong: '0.6.0-6b3e2ef',
};
export default versions;
