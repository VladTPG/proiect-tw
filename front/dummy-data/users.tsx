export interface User {
  id: number;
  displayName: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

const users: User[] = [
  {
    id: 1,
    displayName: "John Doe",
    email: "johndoe@example.com",
    password: "password123",
    isAdmin: false,
  },
  {
    id: 2,
    displayName: "Jane Smith",
    email: "janesmith@example.com",
    password: "password123",
    isAdmin: true,
  },
  {
    id: 3,
    displayName: "Alice Johnson",
    email: "alicejohnson@example.com",
    password: "password123",
    isAdmin: false,
  },
  {
    id: 4,
    displayName: "Bob Brown",
    email: "bobbrown@example.com",
    password: "password123",
    isAdmin: false,
  },
];

export default users;
