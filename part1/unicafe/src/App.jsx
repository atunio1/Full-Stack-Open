import { useState } from 'react'

const StatisticLine = (props) => {
  return (
    <tr>
    <td>{props.text}</td> 
    <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  const good = props.good
  const bad = props.bad
  const neutral = props.neutral
  const all = props.all

  return (
      <table>
        <tbody>
          <StatisticLine text="good" value ={good} />
          <StatisticLine text="neutral" value ={neutral} />
          <StatisticLine text="bad" value ={bad} />
          <StatisticLine text="all" value ={all} />
          <StatisticLine text="average" value ={(((good  * 1) + (neutral * 0) + (bad * -1)) / all)} />
          <StatisticLine text="positive" value ={((good) / all) * 100 + '%'} />
        </tbody>
      </table>
  )
}

const Button = (props) => {
  return (
  <button onClick={props.handleClick}>{props.text}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const increaseCount = (type, all, setType) => {
    const updatedCount = type + 1
    const updatedAll = all + 1
    setType(updatedCount)
    setAll(updatedAll)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => increaseCount(good, all, setGood)} text="good" />
      <Button handleClick={() => increaseCount(neutral, all, setNeutral)} text="neutral" />
      <Button handleClick={() => increaseCount(bad, all, setBad)} text="bad" />
      <h1>Statistics</h1>
      {all > 0 ? (
        <Statistics good={good} bad={bad} neutral={neutral} all={all}/>
      )
      : (
       <p>No feedback given</p> 
      )
      }
    </div>
  )
}

export default App