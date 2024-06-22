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
    version: '0.9.0',
    name: 'nachet-frontend',
    versionDate: '2024-06-22T20:47:06.767Z',
    gitCommitHash: '',
    versionLong: '0.9.0-',
};
export default versions;
