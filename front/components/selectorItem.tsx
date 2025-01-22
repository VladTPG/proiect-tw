import React from "react";
import { useProject } from "@/contexts/ProjectContext";
import { cn } from "@/lib/utils";
import { Folder } from "lucide-react";

interface SelectorItemProps {
  projectName: string;
  projectId: number;
  onClick?: () => void;
  isEmptyState?: boolean;
}

const SelectorItem = ({
  projectName,
  projectId,
  onClick,
  isEmptyState,
}: SelectorItemProps) => {
  const { selectedProjectId } = useProject();
  const isSelected = selectedProjectId === projectId;

  return (
    <div
      onClick={onClick}
      className={cn(
        "w-full px-3 py-2.5 rounded-lg transition-all duration-200",
        isEmptyState ? "bg-muted/50" : "hover:bg-muted/80 bg-card",
        "border border-transparent",
        isSelected
          ? " bg-primary/5"
          : "text-muted-foreground hover:text-foreground",
        isEmptyState ? "cursor-default" : "cursor-pointer"
      )}
    >
      <div className="flex items-center gap-3 w-full">
        <div
          className={cn(
            "p-2 rounded-md transition-colors shrink-0",
            isEmptyState
              ? "bg-muted/50"
              : isSelected
              ? "bg-primary/10"
              : "bg-muted"
          )}
        >
          <Folder
            className={cn(
              "h-4 w-4 transition-colors",
              isEmptyState
                ? "text-muted-foreground/50"
                : isSelected
                ? "text-primary"
                : "text-muted-foreground"
            )}
          />
        </div>
        <div className="flex flex-col gap-0.5 min-w-0 flex-1">
          <span
            className={cn(
              "text-sm transition-colors truncate",
              isEmptyState
                ? "text-muted-foreground"
                : isSelected
                ? "font-medium text-primary"
                : "text-foreground"
            )}
          >
            {projectName}
          </span>
          {!isEmptyState && (
            <span className="text-xs text-muted-foreground truncate">
              {`Project #${projectId}`}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectorItem;
