import {
  createContext,
  Dispatch,
  SetStateAction,
} from 'react'

type AuthContextType = {
  isAuth: boolean | undefined;
  setIsAuth: Dispatch<SetStateAction<boolean | undefined>>;
}

const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  setIsAuth: () => {}
});

export default AuthContext;
