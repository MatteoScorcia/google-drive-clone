export type FileItem = {
  id: string;
  name: string;
  type: "folder" | "document" | "image" | "other";
  size?: string;
  modified: string;
  shared?: boolean;
  owner: {
    name: string;
    avatar?: string;
  };
  path?: string;
};
