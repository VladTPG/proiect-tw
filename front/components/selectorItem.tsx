import React from "react";
import { useProject } from "@/contexts/ProjectContext";
import { cn } from "@/lib/utils";
import { Users } from "lucide-react";

interface SelectorItemProps {
  projectName: string;
  projectId: number;
  onClick?: () => void;
}

const SelectorItem = ({
  projectName,
  projectId,
  onClick,
}: SelectorItemProps) => {
  const { selectedProjectId } = useProject();
  const isSelected = selectedProjectId === projectId;

  return (
    <div
      onClick={onClick}
      className={cn(
        "w-full flex flex-col gap-1 px-3 py-2 rounded-xl transition-colors text-left",
        "hover:bg-muted/80 bg-card",
        isSelected ? "" : "text-muted-foreground"
      )}
    >
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "truncate text-sm",
            isSelected && "font-medium text-primary"
          )}
        >
          {projectName}
        </span>
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Users className="h-3 w-3" />
        <span className="truncate">Project ID: {projectId}</span>
      </div>
    </div>
  );
};

export default SelectorItem;
