import { useState } from 'react'

// JavaScript function to get a random int between two values
function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

// Javascript function to get index of max element in array
function indexOfMax(arr) { 
  let maxIndex = 0; 
  for (let i = 1; i < arr.length; i++) { 
      if (arr[i] > arr[maxIndex]) { 
          maxIndex = i; 
      } 
  } 
  return maxIndex; 
} 

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [random, setRandom] = useState(0)
  const [counts, setCount] = useState(new Array(anecdotes.length).fill(0))
  const maxIndex = indexOfMax(counts)

  const handleClick = () => {
    const updatedRandom = getRandomInt(0, anecdotes.length)
    setRandom(updatedRandom)
    setSelected(updatedRandom)
  }

  const increaseCount = () => {
    const copyCounts = [...counts]
    copyCounts[random] += 1
    setCount(copyCounts)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]} <br />
      has {counts[selected]} votes <br />
      <button onClick={increaseCount}>vote</button>
      <button onClick={handleClick}>next anecdote</button>
      <h2>Anecdote with the most votes</h2>
      {anecdotes[maxIndex]} <br />
      has {counts[maxIndex]} votes
    </div>
  )
}

export default App