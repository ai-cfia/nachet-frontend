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
    version: '0.5.0',
    name: 'nachet-frontend',
    versionDate: '2024-04-09T05:27:20.978Z',
    gitCommitHash: '91438b9',
    versionLong: '0.5.0-91438b9',
};
export default versions;
