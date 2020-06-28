import React, { useMemo, useRef } from 'react'
import './index.scss'
import { useDrop } from 'react-dnd'

import moment from 'moment'
import classNames from 'classnames'
import useWOContext from 'hooks/useWOContext'

import WOContainer from 'containers/WOContainer'

const DATE_FORMAT = 'DDMMYYYY'

const WODate = ({ date, data, id }) => {
  const ref = useRef(null)
  const { changeItemInDate, changeItemBetweenDate } = useWOContext()

  const dateClass = useMemo(
    () =>
      classNames('WODate__date', {
        active: moment().format(DATE_FORMAT) === date.format(DATE_FORMAT),
      }),
    [date]
  )

  const [, drop] = useDrop({
    accept: 'workout item',
    drop(item, monitor) {
      if (!ref.current) {
        return
      }
      if (monitor.getDropResult()) return
      if (item.id === id) {
        return changeItemInDate({ from: item.index, to: data.length, id })
      }
      return changeItemBetweenDate({
        idFrom: item.id,
        idTo: id,
        orderFrom: item.index,
        orderTo: data.length,
      })
    },
  })

  drop(ref)

  return (
    <div className="WODate" ref={ref}>
      <span className="WODate__title">{date.format('ddd')}</span>
      <div className="WODate__container">
        <span className={dateClass}>{date.format('DD')}</span>
        <div className="WODate__content">
          {data.map((container, index) => (
            <WOContainer key={index} index={index} id={id} {...container} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default WODate
