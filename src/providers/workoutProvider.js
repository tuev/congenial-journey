import React from 'react'
import { createContext, useReducer } from 'react'
import moment from 'moment'
import mockWOContainer from './mock_wo'
import { swapArrElement } from 'utils'

const DATE_FORMAT = 'DDMMYYYY'

export const CHANGE_WO_IN_DATE = 'CHANGE_WO_IN_DATE'
export const CHANGE_WO_BETWEEN_DATE = 'CHANGE_WO_BETWEEN_DATE'
export const ADD_WORKOUT_ITEM = 'ADD_WORKOUT_ITEM'

const fakeData = Array.from(Array(7).keys()).map((i) => ({
  date: moment().day(i),
  id: moment().day(i).format(DATE_FORMAT),
  data: mockWOContainer,
}))

const _swapItem = ({ data, from, to }) => ({
  ...data,
  data: swapArrElement({ data: data.data, from, to }),
})

const _filterItem = ({ data, index }) => ({
  ...data,
  data: data.data.filter((_, idx) => idx !== index),
})

const _addContainer = ({ data, index = 0, item }) => {
  const woContainers = data.data || []
  const sliceIdx = +index
  console.log(data, sliceIdx, index, item, 'add container')
  return {
    ...data,
    data: [
      ...woContainers.slice(0, sliceIdx),
      item,
      ...woContainers.slice(sliceIdx, woContainers.length),
    ],
  }
}

const _addWOItem = ({ data, index, dataAdd }) => {
  return {
    ...data,
    data: data.data.map((container, idx) => {
      if (index !== idx) return container
      return {
        ...container,
        exercises: [...container.exercises, dataAdd],
      }
    }),
  }
}

const woReducer = (woState, action) => {
  // eslint-disable-next-line no-console
  console.log(`%c[${action.type}]`, 'color: green', action.payload)
  switch (action.type) {
    case CHANGE_WO_IN_DATE: {
      const { id, from, to } = action.payload || {}
      return woState.map((item) =>
        item.id === id ? _swapItem({ data: item, from, to }) : item
      )
    }
    case CHANGE_WO_BETWEEN_DATE: {
      const { idFrom, idTo, orderFrom, orderTo } = action.payload || {}
      let changedItem = null
      let resultState = woState.map((item) => {
        let result = item
        if (item.id === idFrom) {
          changedItem = item.data[orderFrom]
          result = _filterItem({ data: item, index: orderFrom })
        }
        return result
      })
      return resultState.map((item, index) => {
        let result = item
        if (item.id === idTo) {
          result = _addContainer({
            data: item,
            index: orderTo,
            item: changedItem,
          })
        }
        return result
      })
    }
    case ADD_WORKOUT_ITEM:
      const { id, data, index } = action.payload || {}
      return woState.map((item) => {
        if (item.id === id) {
          return _addWOItem({ index, data: item, dataAdd: data })
        }
        return item
      })
    default:
      return woState
  }
}
export const woContext = createContext(null)

const WOProvider = ({ children }) => {
  const [woStore, dispatch] = useReducer(woReducer, fakeData)

  return (
    <woContext.Provider value={{ woStore, dispatch }}>
      {children}
    </woContext.Provider>
  )
}

export default WOProvider
