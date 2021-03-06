import { useReducer } from 'react'

export default function useSetState(initialState: object) {
  const [state, setState] = useReducer(
    (state: object, newState: object) => ({ ...state, ...newState }),
    initialState,
  )
  return [state, setState]
}
