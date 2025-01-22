export default interface User {
  id?: number;
  displayName: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  profilePicture?: File | null;
  createdAt?: Date;
  updatedAt?: Date;
}
