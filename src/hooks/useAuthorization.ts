import { getCookie } from 'cookies-next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuthContext } from 'context/AuthContext'
import { APP_CONFIG } from 'utils/constants'

export const useAuthorization = () => {
  const router = useRouter()
  const { isAuth, isLoading, setIsAuth, setIsLoading } = useAuthContext()

  useEffect(() => {
    const token = getCookie(APP_CONFIG.token)
    setIsLoading(false)
    setIsAuth(token ? true : false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname])

  return { isAuth, isLoading, setIsAuth, setIsLoading }
}
