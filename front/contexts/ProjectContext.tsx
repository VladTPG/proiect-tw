"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";
import { useToken } from "./TokenContext";

type Project = {
  id: number;
  title: string;
  userId: number;
};

interface ProjectContextType {
  selectedProjectId: number | null;
  setSelectedProjectId: (id: number | null) => void;
  projects: Project[];
  refreshProjects?: () => Promise<void>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  );
  const [projects, setProjects] = useState<Project[]>([]);
  const { token } = useToken();

  const refreshProjects = useCallback(async () => {
    if (!token) return;

    try {
      const response = await axios.get("http://localhost:8000/project", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Projects response:", response.data);
      setProjects(response.data.projects);
      if (response.data.projects.length > 0 && !selectedProjectId) {
        setSelectedProjectId(response.data.projects[0].id);
      }
    } catch (error) {
      console.error("Error refreshing projects:", error);
    }
  }, [token, selectedProjectId]);

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:8000/project", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setProjects(response.data.projects);
          if (response.data.projects.length > 0 && !selectedProjectId) {
            setSelectedProjectId(response.data.projects[0].id);
          }
        })
        .catch((error) => {
          console.error("Error fetching projects:", error);
        });
    }
  }, [token, selectedProjectId]);

  return (
    <ProjectContext.Provider
      value={{
        selectedProjectId,
        setSelectedProjectId,
        projects,
        refreshProjects,
      }}
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
