import React from 'react'
import './index.scss'

const Workout = ({ title, information, number }) => {
  return (
    <div className="workout">
      <p className="workout__title">{title}</p>
      <div className="workout__content">
        <span className="workout__content__number">{number}x</span>
        <span className="workout__content__info">{information}</span>
      </div>
    </div>
  )
}

export default Workout
