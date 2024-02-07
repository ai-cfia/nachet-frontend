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
    version: '0.3.0',
    name: 'nachet-frontend',
    versionDate: '2024-02-07T13:58:03.002Z',
    gitCommitHash: 'f548fa3',
    versionLong: '0.3.0-f548fa3',
};
export default versions;
