import type { User } from "~/models/auth";
import type { FileItem } from "~/models/fileItem";

// Mock user data
export const users: User[] = [
  {
    id: "user-1",
    name: "Ciccio Pasticcio",
    email: "cp@example.com",
    hashedPassword:
      "$argon2id$v=19$m=65536,t=3,p=1$yy7N55JQ0Ut5XIjn3LvOGg$gYLxhpU1tz6Pk4VgI+B58u3yG2ctchZsa5VEVOuPzzE", // cicciopasticcio
    // avatar: "/placeholder.svg?height=40&width=40",
    storageUsed: 3.5, // GB
    storageLimit: 15, // GB
  },
];

// Mock files data
export const mockFiles: FileItem[] = [
  {
    id: "1",
    name: "Documents",
    type: "folder",
    modified: "Mar 20, 2024",
    owner: { name: "You" },
    path: "/Documents",
  },
  {
    id: "2",
    name: "Images",
    type: "folder",
    modified: "Mar 18, 2024",
    owner: { name: "You" },
    path: "/Images",
  },
  {
    id: "3",
    name: "Project Files",
    type: "folder",
    modified: "Mar 15, 2024",
    shared: true,
    owner: { name: "You" },
    path: "/Project Files",
  },
  {
    id: "4",
    name: "Quarterly Report.docx",
    type: "document",
    size: "2.3 MB",
    modified: "Mar 10, 2024",
    owner: { name: "You" },
  },
  {
    id: "5",
    name: "Presentation.pptx",
    type: "document",
    size: "5.7 MB",
    modified: "Mar 8, 2024",
    shared: true,
    owner: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  },
  {
    id: "6",
    name: "Profile Photo.jpg",
    type: "image",
    size: "1.2 MB",
    modified: "Mar 5, 2024",
    owner: { name: "You" },
  },
  {
    id: "7",
    name: "Budget.xlsx",
    type: "document",
    size: "1.8 MB",
    modified: "Mar 3, 2024",
    owner: { name: "You" },
  },
  {
    id: "8",
    name: "Meeting Notes.txt",
    type: "document",
    size: "12 KB",
    modified: "Mar 1, 2024",
    owner: { name: "You" },
  },
];

// Mock shared files (subset of all files)
export const sharedFiles = mockFiles.filter((file) => file.shared);

// Mock recent files (most recently modified files)
export const recentFiles = [...mockFiles]
  .sort(
    (a, b) => new Date(b.modified).getTime() - new Date(a.modified).getTime(),
  )
  .slice(0, 5);

// Mock starred files
export const starredFiles: FileItem[] = [
  mockFiles[3], // Quarterly Report
  mockFiles[6], // Budget
];

// Mock trash files
export const trashFiles: FileItem[] = [
  {
    id: "trash-1",
    name: "Old Project.zip",
    type: "other",
    size: "15.7 MB",
    modified: "Feb 15, 2024",
    owner: { name: "You" },
  },
  {
    id: "trash-2",
    name: "Outdated Specs.pdf",
    type: "document",
    size: "1.2 MB",
    modified: "Feb 10, 2024",
    owner: { name: "You" },
  },
];

// Mock folder structure for breadcrumb navigation
export const folderStructure = {
  Documents: {
    Work: {
      Projects: {},
      Reports: {},
    },
    Personal: {},
  },
  Images: {
    Vacation: {},
    Screenshots: {},
  },
  "Project Files": {
    Frontend: {},
    Backend: {},
    Design: {},
  },
};
