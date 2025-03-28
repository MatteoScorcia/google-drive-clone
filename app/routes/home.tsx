import type { Route } from "./+types/home";
import { Button } from "~/components/ui/button";
import { FileExplorer } from "~/components/file-explorer";
import { authenticateRoute } from "~/lib/authentication";
import { Form } from "react-router";

export function meta() {
  return [
    { title: "Drive - Cloud Storage" },
    {
      name: "description",
      content: "Store, share, and collaborate on files and folders",
    },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const user = await authenticateRoute(request);
  return user;
}

export default function Home() {
  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      {/* <TopNavigation /> */}
      <main className="flex-1 overflow-auto">
        <div className="p-4 md:p-6">
          <div className="mb-4">{/* <BreadcrumbNavigation /> */}</div>
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">My Drive</h1>
            <div className="flex items-center gap-2">
              {/* <FileUpload /> */}
              <Button
                variant="outline"
                size="sm"
                className="border-muted hover:bg-accent/50"
              >
                New Folder
              </Button>
              <Form action="/logout" method="post">
                <Button
                  type="submit"
                  variant="outline"
                  size="sm"
                  className="border-muted hover:bg-accent/50"
                >
                  Logout
                </Button>
              </Form>
            </div>
          </div>
          <FileExplorer />
        </div>
      </main>
    </div>
  );
}
