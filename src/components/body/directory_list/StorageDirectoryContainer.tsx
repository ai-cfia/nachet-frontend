import { AzureStorageDirectoryItem } from "../../../common/types";
import StorageDirectoryView from "./StorageDirectoryView";

export interface params {
  azureStorageDir: AzureStorageDirectoryItem[];
  curDir: string;
  setCurDir: React.Dispatch<React.SetStateAction<string>>;
  setCreateDirectoryOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setDelDirectoryOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDirChange: (dir: string) => void;
  handleSelectPicture: (folder: string, picture: string) => void;
}

const StorageDirectoryContainer: React.FC<params> = (props): JSX.Element => {
  const handleDelete = (folder: string): void => {
    props.handleDirChange(folder);
    props.setDelDirectoryOpen(true);
  };
  const handleSelect = (folder: string): void => {
    if (folder === props.curDir) {
      props.handleDirChange("General");
    } else {
      props.handleDirChange(folder);
    }
  };
  const handleCreateDirectory = (): void => {
    props.setCreateDirectoryOpen(true);
    props.setCurDir("");
  };

  return (
    <StorageDirectoryView
      azureStorageDir={props.azureStorageDir}
      curDir={props.curDir}
      handleSelect={handleSelect}
      handleDelete={handleDelete}
      handleCreateDirectory={handleCreateDirectory}
      handleSelectPicture={props.handleSelectPicture}
    />
  );
};

export default StorageDirectoryContainer;
