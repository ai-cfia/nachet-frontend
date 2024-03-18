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
    versionDate: '2024-03-18T19:24:08.068Z',
    gitCommitHash: '12fc77e',
    versionLong: '0.4.0-12fc77e',
};
export default versions;
