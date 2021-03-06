import { useEffect, RefObject } from 'react'

const KEYS = [
  'Tab',
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
]

export default function useKeyboardDetection(
  ref: RefObject<any>,
): void {
  useEffect(() => {
    const addClass = () => {
      if (!document.body.classList.contains('has-keyboard'))
        document.body.classList.add('has-keyboard')
    }
    const removeClass = () => {
      if (document.body.classList.contains('has-keyboard'))
        document.body.classList.remove('has-keyboard')
    }
    const listener = (ev: KeyboardEvent) =>
      KEYS.includes(ev.code) && addClass()

    document.addEventListener('keydown', listener, false)
    document.addEventListener('mousedown', removeClass, false)

    return () => {
      document.removeEventListener('keydown', listener, false)
      document.removeEventListener('mousedown', removeClass, false)
    }
  }, [ref])
}
