export type User = {
  id: string;
  name: string;
  email: string;
  hashedPassword: string;
  avatar?: string;
  storageUsed: number;
  storageLimit: number;
};
