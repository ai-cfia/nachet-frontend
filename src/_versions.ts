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
    version: '0.8.1',
    name: 'nachet-frontend',
    versionDate: '2024-05-03T01:54:41.684Z',
    gitCommitHash: '344fefa',
    versionLong: '0.8.1-344fefa',
};
export default versions;
