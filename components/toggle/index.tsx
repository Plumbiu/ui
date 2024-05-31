import { useEffect, useState } from 'react'

const useToggleTheme = () => {
  const clList = document.documentElement.classList
  const [isDark, setIsDark] = useState<boolean | null>(null)
  useEffect(() => {
    setIsDark(clList.contains('theme-dark'))
  }, [])

  return [
    () => {
      if (clList.contains('theme-dark')) {
        clList.remove('theme-dark')
        setIsDark(false)
      } else {
        clList.add('theme-dark')
        setIsDark(true)
      }
    },
    isDark,
  ] as const
}

export default useToggleTheme
