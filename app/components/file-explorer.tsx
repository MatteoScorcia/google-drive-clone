import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { mockFiles, sharedFiles, recentFiles } from "~/lib/mock-data";
import { FileExplorerList } from "~/components/file-explorer-list";

export function FileExplorer() {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <Tabs defaultValue="my-drive" className="w-full">
          <div className="flex items-center justify-between">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="my-drive" className="cursor-pointer">
                My Drive
              </TabsTrigger>
              <TabsTrigger value="shared" className="cursor-pointer">
                Shared with me
              </TabsTrigger>
              <TabsTrigger value="recent" className="cursor-pointer">
                Recent
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="my-drive" className="mt-4">
            <FileExplorerList files={mockFiles} />
          </TabsContent>
          <TabsContent value="shared" className="mt-4">
            <FileExplorerList files={sharedFiles} />
          </TabsContent>
          <TabsContent value="recent" className="mt-4">
            <FileExplorerList files={recentFiles} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
