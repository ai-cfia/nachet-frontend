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
    version: '0.1.0',
    name: 'nachet-frontend',
    versionDate: '2023-12-19T22:10:06.081Z',
    gitCommitHash: 'f2a69ed',
    versionLong: '0.1.0-f2a69ed',
};
export default versions;
