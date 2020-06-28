import React, { useRef, useCallback } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import './index.scss'
import { ReactComponent as DotSVG } from './dots.svg'
import { ReactComponent as PlusSVG } from './plus.svg'
import useWOContext from 'hooks/useWOContext'

import Workout from 'components/Workout'

const WOContainer = ({ order, title, exercises = [], index, id }) => {
  const ref = useRef(null)
  const {
    changeItemInDate,
    changeItemBetweenDate,
    addExercise,
  } = useWOContext()
  const [, drop] = useDrop({
    accept: 'workout item',
    drop(item) {
      if (!ref.current) {
        return
      }

      if (item.id === id) {
        return changeItemInDate({ from: item.index, to: index, id })
      }
      return changeItemBetweenDate({
        idFrom: item.id,
        idTo: id,
        orderFrom: item.index,
        orderTo: index,
      })
    },
  })

  const [, drag] = useDrag({
    item: { type: 'workout item', id, index, order },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const handleAddEx = useCallback(() => addExercise(id, index), [
    id,
    index,
    addExercise,
  ])

  drag(drop(ref))

  return (
    <div className="WOContainer" ref={ref}>
      <div className="WOContainer__header">
        <span className="WOContainer__header__title">{title}</span>
        <DotSVG className="WOContainer__header__dots" />
      </div>
      <div className="WOContainer__content">
        {exercises.map(({ title, information, number } = {}, index) => (
          <Workout
            title={title}
            information={information}
            number={number}
            key={index}
          />
        ))}
      </div>
      <div className="WOContainer__footer">
        <PlusSVG className="WOContainer__footer__plus" onClick={handleAddEx} />
      </div>
    </div>
  )
}

export default WOContainer
