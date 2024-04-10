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
    versionDate: '2024-04-10T02:20:17.406Z',
    gitCommitHash: '4b85097',
    versionLong: '0.6.0-4b85097',
};
export default versions;
