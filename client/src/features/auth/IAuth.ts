export interface IAuth {
  isAuth: boolean;
  id: string;
  email: string;
  photoURL?: string;
  iat: number;
  exp: number;
}
