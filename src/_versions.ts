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
    versionDate: '2024-04-09T15:34:25.022Z',
    gitCommitHash: '9a9476b',
    versionLong: '0.6.0-9a9476b',
};
export default versions;
