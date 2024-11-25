"use client";
import React, { createContext, useContext, useState } from "react";

type ProjectContextType = {
  selectedProjectId: number | null;
  setSelectedProjectId: (id: number | null) => void;
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(1);

  return (
    <ProjectContext.Provider
      value={{ selectedProjectId, setSelectedProjectId }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
}
