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
    versionDate: '2024-03-24T20:06:15.896Z',
    gitCommitHash: '1d383a5',
    versionLong: '0.4.0-1d383a5',
};
export default versions;
