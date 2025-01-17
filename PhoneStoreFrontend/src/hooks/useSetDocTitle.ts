import { useEffect } from 'react'

const useSetDocTitle = (title: string) => {
  useEffect(() => {
    document.title = title
  }, [title])
}

export default useSetDocTitle
