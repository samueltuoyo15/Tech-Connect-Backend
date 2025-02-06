declare global {
  interface User {
    id: string;
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
