import { AuthContextType, AuthContextProviderProps } from '@/types/auth';
import {
  createContext,
  useContext,
  useState,
} from 'react'

const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  setIsAuth: () => {}
});

const { Provider } = AuthContext

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
};

export const AuthContextProvider = ({
  children,
  isAuthProp,
}: AuthContextProviderProps) => {
  const [isAuth, setIsAuth] = useState<boolean | undefined>(isAuthProp || false)

  return (
    <Provider value={{ isAuth, setIsAuth }}>
      {children}
    </Provider>
  )
}

