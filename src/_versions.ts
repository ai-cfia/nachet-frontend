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
    versionDate: '2024-01-17T13:44:13.103Z',
    gitCommitHash: '5647460',
    versionLong: '0.2.0-5647460',
};
export default versions;
