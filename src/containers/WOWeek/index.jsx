import React from 'react'
import './index.scss'
import WODate from 'containers/WODate'
import useWOContext from 'hooks/useWOContext'

const Week = (props) => {
  const { woStore } = useWOContext()

  return (
    <div className="WOWeek">
      {woStore.map(({ date, data, id }) => (
        <WODate date={date} key={date.format('X')} data={data} id={id} />
      ))}
    </div>
  )
}

export default Week
