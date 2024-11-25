import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import projects from "@/dummy-data/projects";
import users from "@/dummy-data/users";
import SelectorItem from "@/components/selectorItem";
import { useProject } from "@/contexts/ProjectContext";
import { Folder } from "lucide-react";

export default function Select40() {
  const { selectedProjectId, setSelectedProjectId } = useProject();

  return (
    <div className="space-y-2">
      <Select
        value={selectedProjectId ? `option${selectedProjectId}` : undefined}
        onValueChange={(value) =>
          setSelectedProjectId(Number(value.replace("option", "")))
        }
      >
        <SelectTrigger id="select-40" className="w-full h-auto py-2 px-4">
          <SelectValue>
            {selectedProjectId ? (
              <SelectorItem
                projectName={
                  projects.find((p) => p.id === selectedProjectId)?.title || ""
                }
                projectID={
                  users.find(
                    (user) =>
                      user.id ===
                      projects.find((p) => p.id === selectedProjectId)
                        ?.managerFK
                  )?.displayName || ""
                }
              />
            ) : (
              <span className="flex items-center gap-2 text-muted-foreground">
                <Folder className="h-5 w-5" />
                <span>Select a project</span>
              </span>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent
          className="w-[var(--radix-select-trigger-width)] min-w-[var(--radix-select-trigger-width)]"
          position="popper"
          side="right"
          align="start"
        >
          {projects.length > 0 ? (
            projects.map((project) => (
              <SelectItem
                key={project.id}
                value={`option${project.id}`}
                className="py-1"
              >
                <SelectorItem
                  projectName={project.title}
                  projectID={
                    users.find((user) => user.id === project.managerFK)
                      ?.displayName || ""
                  }
                />
              </SelectItem>
            ))
          ) : (
            <SelectItem value="option1">
              <div className="text-start py-2">
                No projects found.
                <br />
                Please <b>join</b> or <b>create</b> a project
              </div>
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
