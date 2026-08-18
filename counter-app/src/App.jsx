import { useState } from 'react'

import './App.css'

function App() {
  let [counter,setCounter]=useState(15)

  const addvalue =()=>{
    console.log("button clicked ",counter)
    if(counter<20){
      counter=counter+1
    setCounter(counter)
    }
  }
  const remValue =()=>{
    
    if(counter>0){
      counter=counter-1
      setCounter(counter)
    }
    
  }
  return (
    <>
    <h1>Counter app</h1>
    <h4>count is : {counter}</h4>
    <button onClick ={addvalue}>add value</button>
    <br></br>
    <button onClick={remValue}>remove value</button>
    </>
  )
}

export default App
