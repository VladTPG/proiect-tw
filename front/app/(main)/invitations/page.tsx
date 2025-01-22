"use client";

import { InvitationList } from "@/components/invitationList";
import { useProject } from "@/contexts/ProjectContext";

export default function InvitationsPage() {
  const { refreshProjects } = useProject();

  return (
    <div className="container mx-auto p-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight">Invitations</h2>
        </div>
        <InvitationList onInvitationResponse={refreshProjects} />
      </div>
    </div>
  );
}
