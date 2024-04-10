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
    versionDate: '2024-04-10T00:39:01.552Z',
    gitCommitHash: 'd288002',
    versionLong: '0.6.0-d288002',
};
export default versions;
