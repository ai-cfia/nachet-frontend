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
    versionDate: '2024-08-20T20:18:13.050Z',
    gitCommitHash: 'cbbc90b',
    versionLong: '0.9.3-cbbc90b',
};
export default versions;
