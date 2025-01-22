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
import { useUser } from "@/contexts/UserContext";

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
  const { user } = useUser();
  const [isInitialized, setIsInitialized] = useState(false);

  const fetchProjects = useCallback(async () => {
    if (!token || !user) return;

    try {
      const [projectsResponse, invitationsResponse] = await Promise.all([
        axios.get("http://localhost:8000/project", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios
          .get(`http://localhost:8000/invitation/user/${user.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .catch((error) => {
            console.warn("Error fetching invitations:", error);
            return { data: { invitations: [] } };
          }),
      ]);

      const allProjects = projectsResponse.data.projects || [];
      const invitations = invitationsResponse.data.invitations || [];

      const acceptedInvitations = invitations.filter(
        (inv) => inv.status === "Accepted"
      );

      const accessibleProjects = allProjects.filter(
        (project) =>
          project.userId === user.id ||
          acceptedInvitations.some((inv) => inv.projectId === project.id)
      );

      setProjects(accessibleProjects);

      // Only set initial project if not already set
      if (
        !isInitialized &&
        accessibleProjects.length > 0 &&
        !selectedProjectId
      ) {
        setSelectedProjectId(accessibleProjects[0].id);
        setIsInitialized(true);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    }
  }, [token, user, selectedProjectId, isInitialized]);

  // Initial fetch
  useEffect(() => {
    if (token && user) {
      fetchProjects();
    }
  }, [token, user]);

  // Refresh projects when needed (separate from initial fetch)
  const refreshProjects = useCallback(async () => {
    await fetchProjects();
  }, [fetchProjects]);

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
