import { useEffect, RefObject } from 'react'

export default function useOnClickOutside(
  ref: RefObject<any>,
  handler: Function,
): void {
  useEffect(() => {
    const listener = (ev: MouseEvent) => {
      if (!ref.current || ref.current.contains(ev.target)) {
        return
      }
      handler(ev)
    }
    document.addEventListener('click', listener)

    return () => {
      document.removeEventListener('click', listener)
    }
  }, [ref, handler])
}
