export interface TsAppVersion {
  version: string;
  name: string;
  description?: string;
  versionLong?: string;
  versionDate: string;
  gitCommitHash?: string;
  gitCommitDate?: string;
  gitTag?: string;
}

export const versions: TsAppVersion = {
  version: "0.1.0",
  name: "nachet-frontend",
  versionDate: "2023-08-04T06:12:27.197Z",
  gitCommitHash: "4c506f3",
  versionLong: "0.1.0-4c506f3",
};

export default versions;
