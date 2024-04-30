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
    version: '0.8.0',
    name: 'nachet-frontend',
    versionDate: '2024-04-30T03:59:10.466Z',
    gitCommitHash: '7a13690',
    versionLong: '0.8.0-7a13690',
};
export default versions;
