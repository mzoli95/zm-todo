export interface LoginFormState {
  email: string;
  password: string;
}
export interface RegisterFormState {
  username: string;
  email: string;
  password: string;
}

export interface UserInterface {
  email: string;
  username: string;
  accessToken: string;
}

export interface User {
  displayName: string;
  email: string;
  expiresIn: string;
  idToken: string;
  kind: string;
  localId: string;
  refreshToken: string;
  registered: boolean;
}

export interface AuthFormState {
  auth: {
    loginForm: LoginFormState;
    registerForm: RegisterFormState;
    isLoggedIn: boolean;
    user: User;
  };
}
