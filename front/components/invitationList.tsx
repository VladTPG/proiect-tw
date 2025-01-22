"use client";

import { useEffect, useState } from "react";
import { useToken } from "@/contexts/TokenContext";
import { useUser } from "@/contexts/UserContext";
import axios from "axios";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

interface Invitation {
  id: number;
  projectId: number;
  userId: number;
  status: string;
  project: {
    title: string;
    user?: {
      displayName: string;
    };
  };
}

interface InvitationListProps {
  onInvitationResponse?: () => void;
}

export function InvitationList({ onInvitationResponse }: InvitationListProps) {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [projectManagers, setProjectManagers] = useState<{
    [key: number]: string;
  }>({});
  const { token } = useToken();
  const { user } = useUser();

  const fetchInvitations = async () => {
    if (!token || !user) return;
    try {
      const response = await axios.get(
        `http://localhost:8000/invitation/user/${user.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const invitationsData = response.data.invitations || [];
      setInvitations(invitationsData);

      // Fetch project managers for each invitation
      const managerPromises = invitationsData.map(
        async (invitation: Invitation) => {
          try {
            const projectResponse = await axios.get(
              `http://localhost:8000/project/${invitation.projectId}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            return {
              projectId: invitation.projectId,
              managerName:
                projectResponse.data.project.user?.displayName ||
                "Unknown Manager",
            };
          } catch (error) {
            console.error(
              `Error fetching project ${invitation.projectId} details:`,
              error
            );
            return {
              projectId: invitation.projectId,
              managerName: "Unknown Manager",
            };
          }
        }
      );

      const managers = await Promise.all(managerPromises);
      const managersMap = managers.reduce((acc, curr) => {
        acc[curr.projectId] = curr.managerName;
        return acc;
      }, {} as { [key: number]: string });

      setProjectManagers(managersMap);
    } catch (error) {
      console.error("Error fetching invitations:", error);
    }
  };

  useEffect(() => {
    fetchInvitations();
  }, [token, user]);

  const handleResponse = async (invitationId: number, status: string) => {
    if (!token) return;
    try {
      await axios.put(
        `http://localhost:8000/invitation/${invitationId}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      await fetchInvitations();
      if (onInvitationResponse) {
        onInvitationResponse();
      }
    } catch (error) {
      console.error("Error updating invitation:", error);
    }
  };

  return (
    <ScrollArea className="h-[calc(100vh-200px)] w-full rounded-md border p-4">
      <div className="space-y-4">
        {invitations.length > 0 ? (
          invitations.map((invitation) => (
            <div
              key={invitation.id}
              className="flex flex-col space-y-2 border-b pb-4 last:border-0"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{invitation.project.title}</p>
                  <p className="text-sm text-muted-foreground">
                    From:{" "}
                    {projectManagers[invitation.projectId] || "Loading..."}
                  </p>
                </div>
                <span
                  className={`text-sm px-2 py-1 rounded-full ${
                    invitation.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : invitation.status === "Accepted"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {invitation.status}
                </span>
              </div>
              {invitation.status === "Pending" && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full"
                    onClick={() => handleResponse(invitation.id, "Accepted")}
                  >
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full"
                    onClick={() => handleResponse(invitation.id, "Rejected")}
                  >
                    Reject
                  </Button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No invitations found</p>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
