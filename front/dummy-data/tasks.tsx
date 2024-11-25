export interface Task {
  id: number;
  title: string;
  description: string;
  deadline: Date;
  status: string;
  priority: number;
  userFK: number | null;
  projectFK: number;
}

const tasks: Task[] = [
  {
    id: 1,
    title: "Set up project repo",
    description:
      "Initialize the project repository with README and initial files.",
    deadline: new Date("2024-11-20T10:00:00"),
    status: "In Progress",
    priority: 1, // Critical
    userFK: 1,
    projectFK: 1,
  },
  {
    id: 2,
    title: "Design database schema",
    description:
      "Create the initial ER diagram and design the database schema.",
    deadline: new Date("2024-11-21T17:00:00"),
    status: "Not Started",
    priority: 2, // Urgent
    userFK: 2,
    projectFK: 1,
  },
  {
    id: 3,
    title: "Build authentication system",
    description: "Develop user authentication with email and password.",
    deadline: new Date("2024-11-22T12:00:00"),
    status: "In Progress",
    priority: 1, // Critical
    userFK: 3,
    projectFK: 2,
  },
  {
    id: 4,
    title: "Set up CI/CD pipeline",
    description: "Configure continuous integration and deployment pipelines.",
    deadline: new Date("2024-11-23T15:30:00"),
    status: "Not Started",
    priority: 3, // High
    userFK: 4,
    projectFK: 2,
  },
  {
    id: 5,
    title: "Implement user roles",
    description: "Add role-based access control for users and admins.",
    deadline: new Date("2024-11-25T09:00:00"),
    status: "Pending Review",
    priority: 4, // Medium
    userFK: 2,
    projectFK: 3,
  },
  {
    id: 6,
    title: "Create API documentation",
    description: "Document all API endpoints and include usage examples.",
    deadline: new Date("2024-11-26T13:00:00"),
    status: "Completed",
    priority: 5, // Low
    userFK: null,
    projectFK: 3,
  },
  {
    id: 7,
    title: "Fix bug #1234",
    description:
      "Resolve the issue causing 500 errors on the user profile page.",
    deadline: new Date("2024-11-27T11:00:00"),
    status: "In Progress",
    priority: 1, // Critical
    userFK: 3,
    projectFK: 4,
  },
  {
    id: 8,
    title: "Optimize database queries",
    description:
      "Identify slow queries and optimize them for better performance.",
    deadline: new Date("2024-11-28T16:00:00"),
    status: "Not Started",
    priority: 2, // Urgent
    userFK: null,
    projectFK: 4,
  },
  {
    id: 9,
    title: "Review pull request #34",
    description: "Review code changes for the user profile feature.",
    deadline: new Date("2024-11-29T10:00:00"),
    status: "Not Started",
    priority: 5, // Low
    userFK: 1,
    projectFK: 1,
  },
  {
    id: 10,
    title: "Implement search functionality",
    description: "Add search feature with filters and sorting options.",
    deadline: new Date("2024-12-01T14:00:00"),
    status: "In Progress",
    priority: 3, // High
    userFK: 2,
    projectFK: 1,
  },
  {
    id: 11,
    title: "Design UI mockups",
    description: "Create wireframes and mockups for the new dashboard.",
    deadline: new Date("2024-12-02T11:00:00"),
    status: "Not Started",
    priority: 4, // Medium
    userFK: 4,
    projectFK: 2,
  },
  {
    id: 12,
    title: "Write unit tests",
    description: "Develop comprehensive test suite for core functionality.",
    deadline: new Date("2024-12-03T16:00:00"),
    status: "In Progress",
    priority: 2, // Urgent
    userFK: 3,
    projectFK: 2,
  },
  {
    id: 13,
    title: "Setup monitoring tools",
    description: "Integrate error tracking and performance monitoring.",
    deadline: new Date("2024-12-04T09:00:00"),
    status: "Not Started",
    priority: 3, // High
    userFK: 1,
    projectFK: 3,
  },
  {
    id: 14,
    title: "Migrate legacy data",
    description: "Transfer data from old system to new database.",
    deadline: new Date("2024-12-05T13:00:00"),
    status: "Not Started",
    priority: 1, // Critical
    userFK: null,
    projectFK: 3,
  },
  {
    id: 15,
    title: "Security audit",
    description: "Conduct security assessment and fix vulnerabilities.",
    deadline: new Date("2024-12-06T15:00:00"),
    status: "Pending Review",
    priority: 1, // Critical
    userFK: 2,
    projectFK: 4,
  },
  {
    id: 16,
    title: "Update dependencies",
    description: "Upgrade all packages to their latest stable versions.",
    deadline: new Date("2024-12-07T10:00:00"),
    status: "Completed",
    priority: 4, // Medium
    userFK: 4,
    projectFK: 4,
  },
  {
    id: 17,
    title: "Implement file upload",
    description: "Add support for file attachments with preview.",
    deadline: new Date("2024-12-08T14:00:00"),
    status: "In Progress",
    priority: 3, // High
    userFK: 3,
    projectFK: 1,
  },
  {
    id: 18,
    title: "Create user guide",
    description: "Write comprehensive documentation for end users.",
    deadline: new Date("2024-12-09T11:00:00"),
    status: "Not Started",
    priority: 5, // Low
    userFK: null,
    projectFK: 2,
  },
  {
    id: 19,
    title: "Performance optimization",
    description: "Improve application loading times and responsiveness.",
    deadline: new Date("2024-12-10T16:00:00"),
    status: "In Progress",
    priority: 2, // Urgent
    userFK: 1,
    projectFK: 3,
  },
  {
    id: 20,
    title: "Deploy to production",
    description: "Prepare and execute production deployment plan.",
    deadline: new Date("2024-12-11T09:00:00"),
    status: "Not Started",
    priority: 1, // Critical
    userFK: 2,
    projectFK: 4,
  },
];

export default tasks;
