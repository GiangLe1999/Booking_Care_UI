export interface LoggedinUser {
  email: string;
  roleId: string;
}

export interface CoreOutput {
  ok: boolean;
  error?: string;
}

export interface LoginOutput extends CoreOutput {
  user?: { email: string; roleId: string };
}
