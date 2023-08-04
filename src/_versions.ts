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
  version: "1.0.0",
  name: "nachet-frontend",
  versionDate: "2023-08-04T04:03:05.357Z",
  gitCommitHash: "52c9e159b",
  versionLong: "1.0.0-52c9e159b",
};

export default versions;
