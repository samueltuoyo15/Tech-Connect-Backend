declare global {
  interface User {
    id: number;
    email: string;
    username: string;
    profile_picture?: string;
  }

  namespace Express {
    interface User extends globalThis.User {}
    interface Request {
      user?: User;
    }
  }
}

export {};
