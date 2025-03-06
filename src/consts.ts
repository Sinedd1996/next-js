// Specify protected and public routes
export const protectedRoutes = ["/dashboard"];
export const publicRoutes = ["/login", "/"];

export enum AppRouterPages {
  Main = '/',
  Login = '/login',
  Users = '/users',
  Profile = '/profile',
}

export const errorMessage = {
  required: 'Заполните поле',
  email: 'Введите корректный email',
  password: 'Пароль должен содержать минимум 8 символов',
} as const;

export const AUTH_TOKEN_KEY_NAME = "at_next";