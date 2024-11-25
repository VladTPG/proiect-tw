const tasks = [
    {
        id: 1,
        title: "Set up project repo",
        description: "Initialize the project repository with README and initial files.",
        deadline: new Date("2024-11-20T10:00:00"),
        status: "In Progress",
        priority: 1, // 1 being highest priority
        userFK: 1,
        projectFK: 1
    },
    {
        id: 2,
        title: "Design database schema",
        description: "Create the initial ER diagram and design the database schema.",
        deadline: new Date("2024-11-21T17:00:00"),
        status: "Not Started",
        priority: 2,
        userFK: 2,
        projectFK: 1
    },
    {
        id: 3,
        title: "Build authentication system",
        description: "Develop user authentication with email and password.",
        deadline: new Date("2024-11-22T12:00:00"),
        status: "In Progress",
        priority: 1,
        userFK: 3,
        projectFK: 2
    },
    {
        id: 4,
        title: "Set up CI/CD pipeline",
        description: "Configure continuous integration and deployment pipelines.",
        deadline: new Date("2024-11-23T15:30:00"),
        status: "Not Started",
        priority: 3,
        userFK: 4,
        projectFK: 2
    },
    {
        id: 5,
        title: "Implement user roles",
        description: "Add role-based access control for user and admins.",
        deadline: new Date("2024-11-25T09:00:00"),
        status: "Pending Review",
        priority: 1,
        userFK: 2,
        projectFK: 3
    },
    {
        id: 6,
        title: "Create API documentation",
        description: "Document all API endpoints and include usage examples.",
        deadline: new Date("2024-11-26T13:00:00"),
        status: "Completed",
        priority: 2,
        userFK: null,
        projectFK: 3
    },
    {
        id: 7,
        title: "Fix bug #1234",
        description: "Resolve the issue causing 500 errors on the user profile page.",
        deadline: new Date("2024-11-27T11:00:00"),
        status: "In Progress",
        priority: 1,
        userFK: 3,
        projectFK: 4
    },
    {
        id: 8,
        title: "Optimize database queries",
        description: "Identify slow queries and optimize them for better performance.",
        deadline: new Date("2024-11-28T16:00:00"),
        status: "Not Started",
        priority: 2,
        userFK: null,
        projectFK: 4
    }
];

export default tasks;
