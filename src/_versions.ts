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
    versionDate: '2024-03-18T20:40:09.774Z',
    gitCommitHash: 'b4e641e',
    versionLong: '0.4.0-b4e641e',
};
export default versions;
