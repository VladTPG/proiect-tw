import React, { useCallback } from "react";
import { useProject } from "@/contexts/ProjectContext";
import { SelectorItem } from "./selectorItem";

const ProjectSelector: React.FC = () => {
  const { projects, handleProjectSelect } = useProject();

  return (
    <div className="space-y-2">
      {projects.length > 0 ? (
        projects.map((project) => (
          <SelectorItem
            key={project.id}
            projectName={project.title}
            projectId={project.id}
            onClick={() => handleProjectSelect(project.id)}
          />
        ))
      ) : (
        <SelectorItem
          projectName="No projects yet"
          projectId={0}
          isEmptyState={true}
        />
      )}
    </div>
  );
};

export default ProjectSelector;
