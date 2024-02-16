import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const incrementGood = () => setGood(good + 1)
  const incrementNeutral = () => setNeutral(neutral + 1)
  const incrementBad = () => setBad(bad + 1)

  return (
    <div>
      <Header text='give feedback'/>
      <Buttons incrementGood={incrementGood} incrementNeutral={incrementNeutral} incrementBad={incrementBad}/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  if (all == 0) {
    return (
      <>
        <Header text='statistics'/>
        <p>No feedback given</p>
      </>
    )
  }
  else
  {
    return (
      <>
        <Header text='statistics'/>
        <StatisticContent good={good} neutral={neutral} bad={bad}/>
      </>
    )
  }
}

const Header = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

const Buttons = ({incrementGood, incrementNeutral, incrementBad} ) => {
  return (
    <>
      <Button text='good' onClick={incrementGood}/>
      <Button text='neutral' onClick={incrementNeutral}/>
      <Button text='bad' onClick={incrementBad}/>
    </>
  )
}

const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticContent = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const average = (good - bad)/all
  const positive = (good/all)* 100 + ' %'
  return (
    <>
      <StatisticLine text='good' value={good}/>
      <StatisticLine text='neutral' value={neutral}/>
      <StatisticLine text='bad' value={bad}/>
      <StatisticLine text='all' value={all}/>
      <StatisticLine text='average' value={average}/>
      <StatisticLine text='positive' value={positive}/>
    </>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <p>{text} {value}</p>
  )
}

export default App