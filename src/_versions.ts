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
    version: '0.9.3',
    name: 'nachet-frontend',
    versionDate: '2024-08-22T18:13:53.995Z',
    gitCommitHash: '4a3056b',
    versionLong: '0.9.3-4a3056b',
};
export default versions;
