import { Link } from "react-router";
import { Folder, FileImage, FileText, MoreVertical } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import type { FileItem } from "~/lib/mock-data";

interface FileExplorerListProps {
  files: FileItem[];
}

export function FileExplorerList({ files }: FileExplorerListProps) {
  return (
    <div className="rounded-lg border border-border/60 bg-card/50 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border/60">
            <th className="px-4 py-3 text-left font-medium">Name</th>
            <th className="px-4 py-3 text-left font-medium hidden md:table-cell">
              Owner
            </th>
            <th className="px-4 py-3 text-left font-medium hidden md:table-cell">
              Last modified
            </th>
            <th className="px-4 py-3 text-left font-medium hidden md:table-cell">
              Size
            </th>
            <th className="px-4 py-3 text-left font-medium w-10"></th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr
              key={file.id}
              className="border-b border-border/40 hover:bg-accent/20"
            >
              <td className="px-4 py-3">
                {file.type === "folder" && file.path ? (
                  <Link
                    to={file.path}
                    className="flex items-center gap-2 hover:text-primary"
                  >
                    <Folder className="h-5 w-5 text-primary/80 flex-shrink-0" />
                    <span className="truncate">{file.name}</span>
                  </Link>
                ) : (
                  <div className="flex items-center gap-2">
                    {file.type === "image" ? (
                      <FileImage className="h-5 w-5 text-green-400/80 flex-shrink-0" />
                    ) : (
                      <FileText className="h-5 w-5 text-amber-400/80 flex-shrink-0" />
                    )}
                    <span className="truncate">{file.name}</span>
                  </div>
                )}
              </td>
              <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                {file.owner.name}
              </td>
              <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                {file.modified}
              </td>
              <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                {file.size || "—"}
              </td>
              <td className="px-4 py-3">
                <FileActions />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FileActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">More options</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Open</DropdownMenuItem>
        <DropdownMenuItem>Share</DropdownMenuItem>
        <DropdownMenuItem>Get link</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Rename</DropdownMenuItem>
        <DropdownMenuItem>Download</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
