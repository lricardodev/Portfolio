import React, { useState, useEffect } from 'react'

export const Eratostenes = () => {
  let array = [];

  const execute = () => {
    for (let i = 0; i <= 100; i++) {
      array.push(i)
    }
  }

  return (
    <div >
      <button
        onClick={execute}
        className="algo-btn"
      >ERATOSTENES</button>
    </div>
  )
}
