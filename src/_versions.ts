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
    versionDate: '2024-04-09T17:39:16.382Z',
    gitCommitHash: 'ec7c648',
    versionLong: '0.4.0-ec7c648',
};
export default versions;
