import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Folder } from "lucide-react";
import SelectorItem from "@/components/selectorItem";
import { useProject } from "@/contexts/ProjectContext";

export default function Select40() {
  const { selectedProjectId, setSelectedProjectId, projects } = useProject();

  return (
    <div className="p-4">
      <Select
        value={selectedProjectId ? `option${selectedProjectId}` : undefined}
        onValueChange={(value) =>
          setSelectedProjectId(Number(value.replace("option", "")))
        }
      >
        <SelectTrigger className="w-full border-0 p-2 h-auto focus:ring-0 focus-visible:ring-0">
          <SelectValue>
            {selectedProjectId ? (
              <SelectorItem
                projectName={
                  projects.find((p) => p.id === selectedProjectId)?.title || ""
                }
                projectId={selectedProjectId}
              />
            ) : (
              <div className="flex items-center gap-2 px-3 py-2 text-muted-foreground">
                <Folder className="h-4 w-4" />
                <span className="text-sm">Select a project</span>
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent
          className="min-w-[var(--radix-select-trigger-width)] p-0"
          position="popper"
          align="start"
        >
          {projects.length > 0 ? (
            projects.map((project) => (
              <SelectItem
                key={project.id}
                value={`option${project.id}`}
                className="p-0 focus:bg-transparent hover:bg-transparent focus:text-foreground data-[highlighted]:bg-transparent"
              >
                <div className="pl-2">
                  <SelectorItem
                    projectName={project.title}
                    projectId={project.id}
                  />
                </div>
              </SelectItem>
            ))
          ) : (
            <SelectItem value="empty" className="p-4 text-muted-foreground">
              <div className="text-sm">
                No projects found.
                <br />
                Please <span className="font-medium">join</span> or{" "}
                <span className="font-medium">create</span> a project
              </div>
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
