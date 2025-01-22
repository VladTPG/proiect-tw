import React from "react";
import { useProject } from "@/contexts/ProjectContext";
import { cn } from "@/lib/utils";
import { Folder } from "lucide-react";

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
        "w-full px-3 py-2.5 rounded-lg transition-all duration-200",
        "hover:bg-muted/80 bg-card",
        "border border-transparent",
        isSelected
          ? "border-primary/20 bg-primary/5"
          : "text-muted-foreground hover:text-foreground",
        "cursor-pointer"
      )}
    >
      <div className="flex items-center gap-3 w-full">
        <div
          className={cn(
            "p-2 rounded-md transition-colors shrink-0",
            isSelected ? "bg-primary/10" : "bg-muted"
          )}
        >
          <Folder
            className={cn(
              "h-4 w-4 transition-colors",
              isSelected ? "text-primary" : "text-muted-foreground"
            )}
          />
        </div>
        <div className="flex flex-col gap-0.5 min-w-0 flex-1">
          <span
            className={cn(
              "text-sm transition-colors truncate",
              isSelected ? "font-medium text-primary" : "text-foreground"
            )}
          >
            {projectName}
          </span>
          <span className="text-xs text-muted-foreground truncate">
            {`Project #${projectId}`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SelectorItem;
