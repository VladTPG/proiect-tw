export interface User {
  id: number;
  displayName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  profilePicture: File | null;
}

const users: User[] = [
  {
    id: 1,
    displayName: "John Doe",
    email: "johndoe@example.com",
    password: "password123",
    isAdmin: false,
    profilePicture: null,
  },
  {
    id: 2,
    displayName: "Jane Smith",
    email: "janesmith@example.com",
    password: "password123",
    isAdmin: true,
    profilePicture: null,
  },
  {
    id: 3,
    displayName: "You",
    email: "alicejohnson@example.com",
    password: "password123",
    isAdmin: false,
    profilePicture: null,
  },
  {
    id: 4,
    displayName: "Bob Brown",
    email: "bobbrown@example.com",
    password: "password123",
    isAdmin: false,
    profilePicture: null,
  },
];

export default users;
