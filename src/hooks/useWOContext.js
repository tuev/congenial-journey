import { useContext, useCallback } from 'react'

import {
  woContext,
  CHANGE_WO_IN_DATE,
  CHANGE_WO_BETWEEN_DATE,
  ADD_WORKOUT_ITEM,
} from 'providers/workoutProvider'

const fakeEx = {
  title: 'Bench Press Med',
  information: '50 lb x 5, 60 lb x 5, 70 l',
  number: 3,
}

export const useWOContext = () => {
  const { woStore, dispatch } = useContext(woContext)

  const changeItemInDate = useCallback(
    ({ from, to, id }) =>
      dispatch({ type: CHANGE_WO_IN_DATE, payload: { from, to, id } }),
    [dispatch]
  )

  const changeItemBetweenDate = useCallback(
    ({ idFrom, idTo, orderFrom, orderTo }) =>
      dispatch({
        type: CHANGE_WO_BETWEEN_DATE,
        payload: { idFrom, idTo, orderFrom, orderTo },
      }),
    [dispatch]
  )

  const addExercise = useCallback(
    (id, index, data = fakeEx) =>
      dispatch({
        type: ADD_WORKOUT_ITEM,
        payload: { id, data, index },
      }),
    [dispatch]
  )

  return { woStore, changeItemInDate, changeItemBetweenDate, addExercise }
}

export default useWOContext
