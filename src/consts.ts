// Specify protected and public routes
export const protectedRoutes = ["/dashboard"];
export const publicRoutes = ["/login", "/"];

export enum AppRouterPages {
  Main = '/',
  Login = '/login',
  Users = '/users',
  Profile = '/profile',
}
