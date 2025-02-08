declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      username: string;
      profile_picture?: string;
    }
  }
}

export interface User {
  id: number;
  email: string;
  username: string;
  profile_picture?: string;
}
