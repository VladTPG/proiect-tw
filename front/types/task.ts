export interface Task {
  id: number;
  title: string;
  description: string;
  deadline: string;
  status: string;
  priority: number;
  userId: number | null;
  projectId: number;
}
