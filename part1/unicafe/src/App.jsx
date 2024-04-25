import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseCount = (type, setType) => {
    const updatedCount = type + 1
    setType(updatedCount)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => increaseCount(good, setGood)}>good</button>
      <button onClick={() => increaseCount(neutral, setNeutral)}>neutral</button>
      <button onClick={() => increaseCount(bad, setBad)}>bad</button>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}

export default App