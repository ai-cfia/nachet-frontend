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
    versionDate: '2024-02-13T21:05:17.202Z',
    gitCommitHash: '993c468',
    versionLong: '0.3.0-993c468',
};
export default versions;
