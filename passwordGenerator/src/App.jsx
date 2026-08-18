 import { useState, useCallback, useEffect,useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')
  //const passwirdRef = useRef(null)
  const [copied, setCopied] = useState(false)
  const passwordGenerator = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if (numAllowed) str += '0123456789'
    if (charAllowed) str += '#@$&*~√π§¥€¢£%{}[]'

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [length, numAllowed, charAllowed])


const copyPassword = () => {
  navigator.clipboard.writeText(password)

  setCopied(true)

  setTimeout(() => {
    setCopied(false)
  }, 1500)
}

useEffect(()=>{
  passwordGenerator()
},[length,numAllowed,charAllowed,passwordGenerator])

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
      <h1 className='text-white text-center text-2xl mb-4'>
        Password Generator
      </h1>

      <div className='flex shadow rounded-lg overflow-hidden'>
        <input
          type='text'
          value={password}
          className='outline-none py-2 px-3 w-full text-black bg-white'
          placeholder='Password'
          readOnly
          //ref={passwirdRef}
        />
        <button
  onClick={copyPassword}
  className={`px-6 rounded-r-xl text-white font-medium transition-all duration-300
    ${copied
      ? "bg-green-500 scale-95"
      : "bg-blue-600 hover:bg-blue-700 hover:scale-105"
    }`}
>
  {copied ? "✓ Copied!" : "Copy"}
</button>
      </div>
      <div className="flex gap-x-2 text-sm">
        <div className="flex items-center gap-x-1">
          <input
          type="range"
          min={6}
          max={100}
          className="cursor-pointer"
          onChange={(e)=>{setLength(e.target.value)}}
          />
          <lable>length : {length}</lable>
        </div>
         <div className="flex itmes-center gap-x-1">
          <input
          type="checkbox"
          defaultChecked={numAllowed}
          id="numberInput"
          onChange={()=>{
            setNumberAllowed((prev)=> !prev);
          }}
          />
          <label htmlFor="numberInput">Number</label>
        </div>
        
        <div className="flex items-center gap-x-1">
          <input
          type="checkbox"
          defaultChecked={charAllowed}
          id="charInput"
          onChange={()=>{
            setCharAllowed((prev)=> !prev);
          }}
          />
          <label htmlFor="charInput">Character</label>
          </div>
      </div>
    </div>
  )
}

export default App
